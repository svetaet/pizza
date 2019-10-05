import React, { memo } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import themeColors from 'themeColors'
import styles from 'styles'
import basketContext from 'state/basket/basketContext'
import formatPrice from 'utils/formatPrice'

export type BasketItemT = {
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
		([basket, { removeIngredient, removeItem, addItem }]) => ({
			removeIngredient,
			removeItem,
			addItem,
			basket,
		}),
		({ removeIngredient, removeItem, addItem, basket }) => {
			console.time('basket')
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
			console.timeEnd('basket')
			console.table(basket)
			console.table(items)
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
						{items.map(({ ids, id, ingredients, name, price, size, category }) => (
							<div
								key={id}
								css={css`
									display: flex;
									justify-content: space-between;
									margin: 0 0 10px 0;
									& * {
										margin: 0;
										font-size: 14px;
										white-space: nowrap;
									}
								`}
							>
								<p>{`${ids.length} x${category} ${name}(${size})`}</p>
								<p
									css={css`
										margin-left: 5px;
										font-weight: bold;
									`}
								>
									{formatPrice(price)}
								</p>
							</div>
						))}
					</div>
				</div>
			)
		},
	),
)

export default Basket
