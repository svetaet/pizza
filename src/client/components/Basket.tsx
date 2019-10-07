import React, { memo, Fragment } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'
import { lastOf } from '@rqm/tools'

import PlusIcon from 'components/icons/Plus'
import MinusIcon from 'components/icons/Minus'

// import themeColors from 'themeColors'
import styles from 'styles'
import basketContext from 'state/basket/basketContext'
import formatPrice from 'utils/formatPrice'
import getDefaultIngredients from 'utils/getDefaultIngredients'

export type BasketItemT = {
	dialogOpened: boolean
	id: number
	price: number
	size: string
	category: string
	name: string
	ingredients: string[]
}

type StackedBasketItemT = BasketItemT & { ids: number[] }

const equalIngredients = (item1: BasketItemT, item2: BasketItemT) =>
	item1.ingredients.every(ingredient => item2.ingredients.includes(ingredient)) &&
	item2.ingredients.every(ingredient => item1.ingredients.includes(ingredient))

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
			const items = basket.reduce((items: StackedBasketItemT[], item1) => {
				const stackingItem = items.find(item2 => equalItems(item1, item2))
				return stackingItem
					? items.map(item2 =>
							item2.id === stackingItem.id
								? { ...item2, ids: [...item2.ids, item1.id] }
								: item2,
					  )
					: items.concat({ ...item1, ids: [item1.id] })
			}, [])

			// console.table(basket)
			// console.table(items)
			return (
				<div
					css={css`
						display: flex;
						flex-direction: column;
						position: sticky;
						top: 30px;
						height: 1000px;
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
							${styles.border('top', 'left')}
							padding: 15px 5px 60px 25px;
							display: flex;
							flex-direction: column;
						`}
					>
						{items.map(({ ids, id, ingredients, name, price, size, category }) => {
							const extraIngredients: string[] = []
							const removedIngredients: string[] = []
							try {
								const defaultIngredients = getDefaultIngredients({ category, name })

								ingredients.forEach(ingredient => {
									if (!defaultIngredients.includes(ingredient))
										extraIngredients.push(ingredient)
								})

								defaultIngredients.forEach(ingredient => {
									if (!ingredients.includes(ingredient)) removedIngredients.push(ingredient)
								})
							} catch (err) {
								console.error(err)
							}
							return (
								<Fragment key={id}>
									<div
										css={css`
											display: flex;
											justify-content: space-between;
											margin-bottom: 10px;
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
														ingredients,
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
											margin-bottom: 10px;
											font-size: 12px;
											& > p {
												margin: 0 3px;
											}
										`}
									>
										{removedIngredients.map(ingredient => (
											<p
												css={css`
													color: red;
												`}
												key={ingredient}
											>{`- ${ingredient}`}</p>
										))}
										{extraIngredients.map(ingredient => (
											<p
												css={css`
													color: green;
												`}
												key={ingredient}
											>{`+ ${ingredient}`}</p>
										))}
									</div>
								</Fragment>
							)
						})}
					</div>
				</div>
			)
		},
	),
)

export default Basket
