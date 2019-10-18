import React, { memo } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import styles from 'styles'
import formatPrice from 'utils/formatPrice'
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
		([{ postNumber, deliveryType }, { setPostNumber, setDeliveryType }], props) => {
			const postNumberOption = postNumber
				? postalCodes.find(option => option.value === postNumber) || postalCodes[0]
				: postalCodes[0]
			return {
				...props,
				deliveryType,
				postNumberOption,
				setPostNumber,
				setDeliveryType,
			}
		},
		memo(props => {
			const { postNumberOption, deliveryType: type, setDeliveryType: setType } = props

			let totalPrice = props.totalPrice
			if (type === 'delivery') totalPrice += postNumberOption.price
			return (
				<>
					{type === 'delivery' && (
						<div
							css={css`
								margin-top: 15px;
								padding: 10px 15px 0 15px;
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
									value={postNumberOption.value}
									onChange={e => {
										const value = e.target.value
										props.setPostNumber(value === postalCodes[0].value ? '' : value)
									}}
								>
									{postalCodes.map(({ value }) => (
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
									{formatPrice(postNumberOption.price)}
								</p>
							</div>
						</div>
					)}

					<div
						css={css`
							margin-top: 12px;
							${styles.border('top')};
							padding: 10px 15px 0 15px;
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
										<input
											id={option.type}
											onChange={changeType}
											checked={current}
											type="radio"
										/>
										<label htmlFor={option.type}>{option.name}</label>
									</div>
								</div>
							)
						})}
					</div>

					<button
						className={props.totalPrice ? '' : 'disabled'}
						css={css`
							${styles.button}
							margin: 0 15px;
						`}
						onClick={() => props.totalPrice && props.openCheckout()}
					>
						{'gå til kassen'}
					</button>
					<img
						css={css`
							margin: 10px auto;
						`}
						src={credit.src}
						alt="credit cards"
					/>
					<Info type={type} />
				</>
			)
		}),
	),
)

export default Delivery
