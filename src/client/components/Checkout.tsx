import React, { memo, Fragment, useCallback, useMemo, useEffect } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import Dialog from 'components/Dialog'
import basketContext from 'state/basket/basketContext'
import checkoutContext from 'state/checkout/checkoutContext'
import userStateContext, { UserStateContextT } from 'state/userState/userStateContext'
import themeColors from 'themeColors'
import styles from 'styles'
import api from 'utils/api'
import getOrderDetails from 'utils/getOrderDetails'
import { deliveryOptions } from 'components/Delivery'

const getFields = (user: UserStateContextT[0], actions: UserStateContextT[1]) => [
	[
		{ name: 'Fornavn', value: user.firstName, onChange: actions.setFirstName },
		{ name: 'Efternavn', value: user.lastName, onChange: actions.setLastName },
		{
			name: 'Telefon',
			value: user.phoneNumber,
			onChange: actions.setPhoneNumber,
			type: 'tel',
		},
		{ name: 'E-mail', value: user.email, onChange: actions.setEmail, type: 'email' },
	],
	[
		{ name: 'Gade', value: user.street, onChange: actions.setStreet },
		{ name: 'Husnr. / Etage', value: user.homeNumber, onChange: actions.setHomeNumber },
		{
			name: 'Postnr.',
			value: user.postNumber,
			onChange: actions.setPostNumber,
			type: 'number',
		},
		{ name: 'By', value: user.city, onChange: actions.setCity },
	],
	// [
	// 	{
	// 		name: 'Adgangskode',
	// 		type: 'password',
	// 	},
	// 	{
	// 		name: 'Bekræft',
	// 		type: 'password',
	// 	},
	// ],
]

type FieldP<T> = {
	name: string
	type?: string
	value: T
	onChange: (value: T) => void
}
const Field = memo(
	<T extends number | string>({ name, type = 'text', value, onChange }: FieldP<T>) => (
		<div>
			<label htmlFor={name}>
				{name + ': '}
				<span>*</span>
			</label>
			<input id={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
		</div>
	),
)

const Checkout = withContext(
	basketContext,
	([basket], props: { close: () => void }) => ({ basket, ...props }),
	withContext(
		userStateContext,
		([userState, actions], props) => ({ userState, actions, ...props }),
		props => {
			const { userState: user, basket, actions, close } = props
			const fieldSets = getFields(user, actions)
			// const [data, address] = getFields(user, actions)
			// const fieldSets = [data]
			// if (props.userState.deliveryType === 'delivery') fieldSets.push(address)

			const disable = fieldSets.some(fields => fields.some(field => !field.value))

			const { items, totalPrice } = useMemo(() => getOrderDetails(basket), [basket])
			const makeOrder = useCallback(
				async (user: UserStateContextT[0]) => {
					const orderDetails = items
						.map(
							item =>
								`${item.ids.length} x ${item.category} ${item.name}(${item.size})${
									item.omitted.length ? ' - ' + item.omitted.join(' - ') : ''
								}${item.added.length ? ' + ' + item.added.join(' + ') : ''}`,
						)
						.join(', ')

					const orderInfo = basket.map(({ added, omitted, backendId }) => ({
						id: backendId,
						extra: [...omitted.map(i => `${i}`), ...added.map(i => `+${i}`)].join('\n'),
					}))

					await api<{ id: string }>({
						endpoint: 'order',
						onSuccess: ({ id }) => {
							actions.setOrderId(id)
							// eslint-disable-next-line no-undef
							const paymentwindow = new PaymentWindow({
								merchantnumber: '8031528',
								amount: totalPrice.toFixed(2).replace('.', ''),
								currency: 'DKK',
								windowstate: '4',
								paymentcollection: '1',
								iframeheight: '341',
								iframewidth: '100%',
								language: '1',
							})
							paymentwindow.append('payment-div')
							paymentwindow.open()
						},
						body: {
							firstname: user.firstName,
							lastname: user.lastName,
							phone: user.phoneNumber,
							mail: user.email,
							address: `${user.street} ${user.homeNumber}`,
							postal_code: user.postNumber,
							city: user.city,
							remarks: '',
							status: 0,
							orderDetails,
							orderInfo,
							orderTotal: totalPrice,
							deliveryType: deliveryOptions.find(({ type }) => type === user.deliveryType)!
								.name,
							printed: 0,
						},
					})
				},
				[actions, items, totalPrice, basket],
			)

			useEffect(() => {
				if (user.orderId) {
					const timer = setInterval(
						() =>
							api<{ status: number }>({
								endpoint: `order/${user.orderId}`,
								onSuccess: data => {
									console.log(data)
									if (data.status !== 0) clearInterval(timer)
								},
								onError: () => clearInterval(timer),
							}),
						3000,
					)

					return () => clearInterval(timer)
				}
			}, [user.orderId])

			return (
				<Dialog
					close={close}
					innerCss={`
						& > div { 
    					width: 585px;
							background: #f9f9f9;
							padding: 20px 30px;
							@media (max-width: 760px) {
								padding: 20px;
							}
						}
					`}
				>
					{[
						{ name: 'Mine informationer', fieldSets },
						// { name: 'Adganskode', fieldSets: [password] },
					].map(({ name, fieldSets }) => (
						<Fragment key={name}>
							<h4
								css={css`
									color: ${themeColors.weak};
									margin: 0 0 10px 0;
								`}
							>
								{name}
							</h4>
							<div
								css={css`
									display: flex;
									flex-wrap: wrap;
									justify-content: space-between;
									border-bottom: solid 1px #cccccc;
									padding-bottom: 10px;
									margin-bottom: 10px;
								`}
							>
								{fieldSets.map((fields, n) => (
									<div
										key={n}
										css={css`
											display: flex;
											flex-wrap: wrap;
											flex-direction: column;
											width: 100%;
											max-width: 250px;
											& > div {
												margin: 3px 0;
												display: flex;
												align-items: center;
												justify-content: space-between;
												width: 100%;
												& > label {
													margin: 0;
													white-space: nowrap;
												}
												& > input {
													display: block;
													margin-left: 5px;
													width: 120px;
												}
											}
											& span {
												color: red;
											}
										`}
									>
										{fields.map(props => (
											<Field key={props.name} {...props} />
										))}
									</div>
								))}
							</div>
						</Fragment>
					))}

					{user.orderNumber ? (
						<p
							css={css`
								margin: 10px 0 0 0;
								text-align: center;
								color: ${themeColors.weak};
							`}
						>
							{`Order number: ${user.orderNumber}`}
						</p>
					) : (
						<button
							onClick={() => makeOrder(user)}
							css={styles.button}
							className={disable ? 'disabled' : ''}
						>
							GENNERFØR BETALING
						</button>
					)}

					<div
						css={css`
							margin: 10px 0 0 0;
							overflow: auto;
							& iframe {
								min-width: 316px;
							}
						`}
						id="payment-div"
					></div>
				</Dialog>
			)
		},
	),
)

const OpenedCheckout = memo(
	withContext(
		checkoutContext,
		([opened, { closeCheckout }]) => ({ opened, close: closeCheckout }),
		({ opened, close }) => (opened ? <Checkout close={close} /> : null),
	),
)

export default OpenedCheckout
