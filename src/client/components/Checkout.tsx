import React, { memo, Fragment } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import Dialog from 'components/Dialog'
import checkoutContext from 'state/checkout/checkoutContext'
import userStateContext, { UserStateContextT } from 'state/userState/userStateContext'
import themeColors from 'themeColors'

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
	[
		{
			name: 'Adgangskode',
			value: user.firstName,
			onChange: actions.setFirstName,
			type: 'password',
		},
		{
			name: 'Bekræft',
			value: user.firstName,
			onChange: actions.setFirstName,
			type: 'password',
		},
	],
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
			<p>
				{name + ': '}
				<span>*</span>
			</p>
			<input type={type} value={value} onChange={e => onChange(e.target.value)} />
		</div>
	),
)

const Checkout = withContext(
	userStateContext,
	([userState, actions], props: { close: () => void }) => ({ userState, actions, ...props }),
	props => {
		const { userState: user, actions, close } = props
		const [data, address, password] = getFields(user, actions)
		return (
			<Dialog
				close={close}
				innerCss={`& > div { background: #f9f9f9; padding: 20px 30px; width: 520px; }`}
			>
				{[
					{ name: 'Mine informationer', fieldsSets: [data, address] },
					{ name: 'Adganskode', fieldsSets: [password] },
				].map(({ name, fieldsSets }) => (
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
							{fieldsSets.map((fields, n) => (
								<div
									key={n}
									css={css`
										display: flex;
										flex-wrap: wrap;
										flex-direction: column;
										& > div {
											margin: 3px 0;
											display: flex;
											align-items: center;
											justify-content: space-between;
											width: 250px;
											& > p {
												margin: 0;
												white-space: nowrap;
											}
											& > input {
												display: block;
												margin-left: 5px;
												width: 130px;
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
			</Dialog>
		)
	},
)

const OpenedCheckout = withContext(
	checkoutContext,
	([opened, { closeCheckout }]) => ({ opened, close: closeCheckout }),
	({ opened, close }) => (opened ? <Checkout close={close} /> : null),
)

export default OpenedCheckout
// {
// 				closeCheckout,
// 				setLastName,
// 				setCity,
// 				setEmail,
// 				setPassword,
// 				setStreet,
// 				setFirstName,
// 				setHomeNumber,
// 				setOrderNumber,
// 				setPhoneNumber,
// 				setPostNumber,
// 			},
