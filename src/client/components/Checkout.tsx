import React, { memo, Fragment, useCallback } from 'react'
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
import { BasketItemT } from 'components/Basket'

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
			const [data, address] = getFields(user, actions)
			const fieldSets = [data]
			if (props.userState.deliveryType === 'delivery') fieldSets.push(address)

			const disable = fieldSets.some(fields => fields.some(field => !field.value))

			const makeOrder = useCallback((user: UserStateContextT[0], basket: BasketItemT[]) => {
				const { items, totalPrice } = getOrderDetails(basket)
				const orderDetails = items.reduce(
					(acc, item) =>
						acc +
						`${item.ids.length} x ${item.category} ${item.name}(${item.size})${
							item.omitted.length ? ' - ' + item.omitted.join(' - ') : ''
						}${item.added.length ? ' + ' + item.added.join(' + ') : ''},`,
					'',
				)
				console.log(orderDetails)

				api<{}>({
					endpoint: 'order',
					onSuccess: console.log,
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
						orderDetails: orderDetails,
						orderTotal: totalPrice,
						deliveryType: user.deliveryType,
						printed: 0,
					},
				})
			}, [])

			return (
				<Dialog
					close={close}
					innerCss={`
						& > div { 
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

					<p
						css={css`
							margin: 0 0 10px 0;
							text-align: center;
							color: ${themeColors.weak};
						`}
					>
						{'Order number: '}
					</p>
					<button
						onClick={() => makeOrder(user, basket)}
						className={disable ? 'disabled' : ''}
						css={styles.button}
					>
						GENNERFØR BETALING
					</button>
				</Dialog>
			)
		},
	),
)

const OpenedCheckout = withContext(
	checkoutContext,
	([opened, { closeCheckout }]) => ({ opened, close: closeCheckout }),
	({ opened, close }) => (opened ? <Checkout close={close} /> : null),
)

export default OpenedCheckout
