import React, { memo, FC, Fragment } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import Dialog from 'components/Dialog'
import checkoutContext from 'state/checkout/checkoutContext'
import userStateContext, { UserStateContextT } from 'state/userState/userStateContext'
import themeColors from 'themeColors'
import styles from 'styles'

const getFields = (user: UserStateContextT[0], actions: UserStateContextT[1]) => [
	[
		{ name: 'Fornavn', value: user.firstName, onChange: actions.setFirstName },
		{ name: 'Efternavn', value: user.lastName, onChange: actions.setLastName },
		{
			name: 'Telefon',
			value: user.phoneNumber,
			onChange: actions.setPhoneNumber,
			type: 'number',
		},
		{ name: 'E-mail', value: user.email, onChange: actions.setEmail, type: 'email' },
		{ name: 'Gade', value: user.street, onChange: actions.setStreet },
		{ name: 'Husnr. / Etage:', value: user.homeNumber, onChange: actions.setHomeNumber },
		{
			name: 'Postnr.:',
			value: user.postNumber,
			onChange: actions.setPostNumber,
			type: 'number',
		},
		{ name: 'By:', value: user.city, onChange: actions.setCity },
	],
	[
		{
			name: 'Adgangskode:',
			value: user.firstName,
			onChange: actions.setFirstName,
			type: 'number',
		},
		{
			name: 'Bekræft:',
			value: user.firstName,
			onChange: actions.setFirstName,
			type: 'number',
		},
	],
]

type FieldP<T> = {
	name: string
	type?: string
	value: T
	onChange: (value: T) => void
}
const Field = memo(<T,>({ name, type = 'text', value, onChange }: FieldP<T>) => (
	<div
		css={css`
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 300px;
		`}
	>
		<p>{name}</p>
		<input type={type} />
	</div>
))

const Checkout = withContext(
	userStateContext,
	([userState, actions], props: { close: () => void }) => ({ userState, actions, ...props }),
	props => {
		const { userState: user, actions, close } = props
		const [data, password] = getFields(user, actions)
		return (
			<Dialog close={close}>
				{[
					{ name: 'Mine informationer', fields: data },
					{ name: 'Adganskode', fields: password },
				].map(({ name, fields }) => (
					<Fragment key={name}>
						<h4>{name}</h4>
						<div>
							{fields.map(props => (
								<Field key={props.name} {...props} />
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
