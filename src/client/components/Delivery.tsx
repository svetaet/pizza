import React, { memo, useState } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import logo from 'images/logo.png'
import styles from 'styles'
import formatPrice from 'utils/formatPrice'
import themeColors from 'themeColors'
import DeliveryBike from 'components/icons/DeliveryBike'
import Bag from 'components/icons/Bag'
import Info from 'components/Info'
import credit from 'images/credit.png'
import checkoutContext from 'state/checkout/checkoutContext'
import userStateContext from 'state/userState/userStateContext'

type DeliveryT = 'delivery' | 'pickup'

const postalCodes = [{ value: 'Postnr.', price: 0 }, { value: '4300', price: 40 }]

const deliveryOptions = [
	{ type: 'delivery' as DeliveryT, icon: DeliveryBike, name: 'Levering' },
	{ type: 'pickup' as DeliveryT, icon: Bag, name: 'Afhentning' },
]

type DeliveryP = {
	totalPrice: number
}
const Delivery = withContext(
	checkoutContext,
	([, { openCheckout }], props: DeliveryP) => ({ ...props, openCheckout }),
	withContext(
		userStateContext,
		([{ postNumber }, { setPostNumber }], props) => ({
			...props,
			postNumber,
			setPostNumber,
		}),
		memo(props => {
			const [type, setType] = useState<DeliveryT>('delivery')
			const [postalCode, setPostalCode] = useState(() =>
				props.postNumber
					? postalCodes.find(option => option.value === props.postNumber) || postalCodes[0]
					: postalCodes[0],
			)
			let totalPrice = props.totalPrice
			if (type === 'delivery') totalPrice += postalCode.price
			return (
				<>
					{type === 'delivery' && (
						<div
							css={css`
								margin-top: 15px;
								${styles.border('top')};
								& p {
									margin: 0;
								}
							`}
						>
							<p
								css={css`
									text-align: right;
									font-weight: bold;
								`}
							>
								{formatPrice(props.totalPrice)}
							</p>
							<p
								css={css`
									font-weight: bold;
								`}
							>
								Levering:
							</p>
							<div
								css={css`
									display: flex;
									justify-content: space-between;
									align-items: center;
								`}
							>
								<select
									css={css`
										width: 100px;
										padding: 6px 12px;
										border: 1px solid #cccccc;
										border-radius: 4px;
										margin: 5px 5px 0 0;
									`}
									name="postal-code"
									value={postalCode.value}
									onChange={e => {
										const option = postalCodes.find(code => code.value === e.target.value)!
										props.setPostNumber(
											option.value !== postalCodes[0].value ? '' : option.value,
										)
										setPostalCode(option)
									}}
								>
									{postalCodes.map(({ price, value }) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
								<p
									css={css`
										font-size: 18px;
									`}
								>
									{formatPrice(postalCode.price)}
								</p>
							</div>
						</div>
					)}

					<div
						css={css`
							margin-top: 12px;
							${styles.border('top')};
							display: flex;
							justify-content: space-between;
							font-weight: bold;
							& > p {
								margin: 0;
							}
						`}
					>
						<p>I alt:</p>
						<p
							css={css`
								margin-right: 5px;
								font-size: 18px;
							`}
						>
							{formatPrice(totalPrice)}
						</p>
					</div>
					{type === 'delivery' && (
						<p
							css={css`
								font-size: 12px;
								color: red;
								text-align: center;
								margin: 0;
							`}
						>
							{'Minimumsbeløb for levering: 250,-'}
						</p>
					)}
					<div
						css={css`
							display: flex;
							justify-content: space-evenly;
							margin: 15px 0;
						`}
					>
						{deliveryOptions.map(option => {
							const current = option.type === type
							const changeType = () => setType(option.type)
							return (
								<div
									css={css`
										display: flex;
										flex-direction: column;
										align-items: center;
										${current ? 'fill: #d84f4f; color: #d84f4f;' : ''}
										& > * {
											cursor: pointer;
										}
									`}
									key={option.type}
									onClick={changeType}
								>
									<option.icon />
									<div
										css={css`
											display: flex;
											align-items: center;
											margin-top: 5px;
										`}
									>
										<input onChange={changeType} checked={current} type="radio" />
										<span>{option.name}</span>
									</div>
								</div>
							)
						})}
					</div>

					<button
						css={css`
							color: white;
							background: #79df26;
							border: none;
							margin: 0 15px;
							padding: 10px;
							display: block;
							text-transform: uppercase;
							cursor: pointer;
							font-size: 16px;
						`}
						onClick={props.openCheckout}
					>
						{'gå til kassen'}
					</button>
					<img
						css={css`
							margin: 10px auto;
						`}
						src={credit}
					/>
					<Info type={type} />
				</>
			)
		}),
	),
)

export default Delivery
