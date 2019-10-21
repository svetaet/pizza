import React, { memo, useCallback, useMemo } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import basketContext from 'state/basket/basketContext'
import { IngredientTypeT } from 'state/basket/createActions'
import { BasketItemT } from 'components/Basket'
import formatPrice from 'utils/formatPrice'
import Dialog from 'components/Dialog'

type ItemP = {
	ingredient: string
	price?: number
	toggle: (current: boolean, ingredient: string, type: 'omitted' | 'added') => void
	added: boolean
	type: 'omitted' | 'added'
}
const Item = memo<ItemP>(({ ingredient, price, toggle, added, type }) => {
	return (
		<div
			css={css`
				margin: 5px 0;
				width: 200px;
				display: flex;
				align-items: center;
				& > label {
					&::first-letter {
						text-transform: uppercase;
					}
					cursor: pointer;
				}
				& > input {
					cursor: pointer;
					margin: 2px 2px 0 3px;
					height: 15px;
					width: 15px;
				}
			`}
		>
			<input
				id={ingredient}
				type="checkbox"
				checked={added}
				onChange={() => toggle(added, ingredient, type)}
			/>
			<label htmlFor={ingredient}>{`${ingredient}${
				price ? ' kr. ' + formatPrice(price) : ''
			}`}</label>
		</div>
	)
})

type IngredientsP = {
	items: BasketItemT[]
	addIngredient: (ingredient: string, id: number | number[], type: IngredientTypeT) => void
	removeIngredient: (ingredient: string, id: number | number[], type: IngredientTypeT) => void
	closeIngredients: (id: number | number[]) => void
}
const Ingredients = memo<IngredientsP>(
	({ items, addIngredient, removeIngredient, closeIngredients }) => {
		const { name, extras, defaults, omitted, added } = items[0]
		const id = useMemo(() => items.map(it => it.id), [items])

		const toggle = useCallback(
			(current: boolean, ingredient: string, type: 'omitted' | 'added') => {
				const condition = type === 'added' ? current : !current
				condition
					? removeIngredient(ingredient, id, type)
					: addIngredient(ingredient, id, type)
			},
			[addIngredient, id, removeIngredient],
		)

		const close = () => closeIngredients(id)
		return (
			<Dialog close={close} okButton>
				<div
					onClick={e => e.stopPropagation()}
					css={css`
						& > div {
							display: flex;
							flex-wrap: wrap;
							margin-bottom: 5px;
						}
						& > h4 {
							margin: 0 0 5px 5px;
						}
					`}
				>
					<h3
						css={css`
							margin: 0 0 5px 0;
							text-align: center;
						`}
					>
						{name}
					</h3>

					{defaults.length > 0 && (
						<>
							<h4>Fravælg tilbehør</h4>
							<div>
								{defaults.map(({ name }) => (
									<Item
										key={name}
										ingredient={name}
										toggle={toggle}
										type={'omitted'}
										added={!omitted.includes(name)}
									/>
								))}
							</div>
						</>
					)}

					{extras.length > 0 && (
						<>
							<h4>Tilføj tilbehør</h4>
							<div>
								{extras.map(({ name, price }) => (
									<Item
										key={name}
										ingredient={name}
										toggle={toggle}
										type={'added'}
										added={added.includes(name)}
										price={price}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</Dialog>
		)
	},
)

const OpenedItem = withContext(
	basketContext,
	([, { addIngredient, removeIngredient, closeIngredients }, openedItems]) => {
		return {
			addIngredient,
			removeIngredient,
			closeIngredients,
			items: openedItems,
		}
	},
	props =>
		props.items.length ? (
			<Ingredients key={props.items.map(item => item.id).join(',')} {...props} />
		) : null,
)

export default OpenedItem
