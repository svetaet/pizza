import React, { memo, Fragment } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'
import { lastOf } from '@rqm/tools'

import PlusIcon from 'components/icons/Plus'
import MinusIcon from 'components/icons/Minus'

import Delivery from 'components/Delivery'
import styles from 'styles'
import basketContext from 'state/basket/basketContext'
import formatPrice from 'utils/formatPrice'
import themeColors from 'themeColors'

export type ExtraT = { name: string; price: number }
export type BasketItemT = {
	dialogOpened: boolean
	id: number
	price: number
	size: string
	category: string
	name: string
	defaults: string[]
	extras: ExtraT[]
	omitted: string[]
	added: string[]
}

type StackedBasketItemT = BasketItemT & { ids: number[] }

const equalIngredients = (item1: BasketItemT, item2: BasketItemT) =>
	item1.omitted.every(ingredient => item2.omitted.includes(ingredient)) &&
	item2.omitted.every(ingredient => item1.omitted.includes(ingredient)) &&
	item1.added.every(ingredient => item2.added.includes(ingredient)) &&
	item2.added.every(ingredient => item1.added.includes(ingredient))

export const equalItems = (item1: BasketItemT, item2: BasketItemT) =>
	item1.category === item2.category &&
	item1.name === item2.name &&
	item1.size === item2.size &&
	equalIngredients(item1, item2)

const Basket = memo(
	withContext(
		basketContext,
		([basket, { removeItem, addItem }]) => ({ removeItem, addItem, basket }),
		({ removeItem, addItem, basket }) => {
			let totalPrice = 0
			const stackedItems = basket.reduce((items: StackedBasketItemT[], item1) => {
				const stackingItem = items.find(item2 => equalItems(item1, item2))
				return stackingItem
					? items.map(item2 =>
							item2.id === stackingItem.id
								? { ...item2, ids: [...item2.ids, item1.id] }
								: item2,
					  )
					: items.concat({ ...item1, ids: [item1.id] })
			}, [])

			const items = stackedItems.map(item => {
				const extraIngredientsPrice = item.added.reduce(
					(total, ingredient) =>
						total + item.extras.find(({ name }) => ingredient === name)!.price,
					0,
				)

				const price = item.price + extraIngredientsPrice
				totalPrice += price * item.ids.length
				return { ...item, price }
			})
			return (
				<div
					css={css`
						display: flex;
						flex-direction: column;
						width: 290px;
						min-width: 232px;
						${styles.sidebar}
						${styles.scrollbar}
						@media (max-width: 760px) {
							padding-right: 10px;
						}
					`}
				>
					<h2
						css={css`
							margin: 0;
							padding: 0 15px 5px 15px;
							${styles.title};
						`}
					>
						Indkøbskurv
					</h2>

					<div
						css={css`
							padding: 0 5px 0 15px;
							@media (min-width: 761px) {
								${styles.border('left')}
							}
						`}
					>
						<div
							css={css`
								@media (min-width: 761px) {
									border-top: 1px solid ${themeColors.border};
								}
								padding: 0 0 10px 0;
								display: flex;
								flex-direction: column;
							`}
						>
							{items.map(
								({
									ids,
									id,
									defaults,
									extras,
									omitted,
									added,
									name,
									price,
									size,
									category,
								}) => {
									return (
										<Fragment key={id}>
											<div
												css={css`
													display: flex;
													justify-content: space-between;
													padding: 10px 0 10px 15px;
													& p {
														margin: 0;
														font-size: 14px;
													}
												`}
											>
												<p>{`${ids.length} x${category} ${name}(${size})`}</p>
												<div
													css={css`
														& > button {
															border: none;
															background: transparent;
															padding: 0;
															margin-left: 5px;
															cursor: pointer;
															font-size: 0;
															outline: none;
														}
														margin-left: 5px;
														font-weight: bold;
														display: flex;
														align-items: center;
													`}
												>
													<p>{formatPrice(price * ids.length)}</p>
													<button
														onClick={() =>
															addItem({
																defaults,
																extras,
																omitted,
																added,
																name,
																price,
																size,
																category,
																dialogOpened: false,
															})
														}
													>
														<PlusIcon />
													</button>
													<button onClick={() => removeItem(lastOf(ids))}>
														<MinusIcon />
													</button>
												</div>
											</div>
											<div
												css={css`
													font-size: 12px;
													& > p {
														margin: 0 3px;
													}
												`}
											>
												{[
													{ ingredients: omitted, color: 'red' },
													{ ingredients: added, color: 'green' },
												].map(({ ingredients, color }) =>
													ingredients.map(ingredient => (
														<p
															css={css`
																color: ${color};
															`}
															key={ingredient}
														>{`+ ${ingredient}`}</p>
													)),
												)}
											</div>
										</Fragment>
									)
								},
							)}
							<Delivery totalPrice={totalPrice} />
						</div>
					</div>
				</div>
			)
		},
	),
)

export default Basket
