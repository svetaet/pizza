import React, { memo, FC, useState, useCallback, useMemo, useRef } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import menu from 'constants/menu'
import ingredients from 'constants/extraIngredients'
import basketContext from 'state/basket/basketContext'
import { BasketItemT } from 'components/Basket'
import getDefaultIngredients from 'utils/getDefaultIngredients'
import formatPrice from 'utils/formatPrice'
import Dialog from 'components/Dialog'

type ItemP = {
	ingredient: string
	price?: number
	toggle: (current: boolean, ingredient: string) => void
	added: boolean
}
const Item = memo<ItemP>(({ ingredient, price, toggle, added }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<div
			css={css`
				margin: 5px 0;
				width: 200px;
				display: flex;
				align-items: center;
				& > span {
					&::first-letter {
						text-transform: uppercase;
					}
					cursor: pointer;
				}
				& > input {
					cursor: pointer;
					margin-right: 3px;
				}
			`}
		>
			<input
				ref={inputRef}
				type="checkbox"
				checked={added}
				onChange={e => toggle(!e.target.checked, ingredient)}
			/>
			<span
				onClick={() => {
					const checkbox = inputRef.current
					if (checkbox) toggle(checkbox.checked, ingredient)
				}}
			>{`${ingredient}${price ? ' kr. ' + formatPrice(price) : ''}`}</span>
		</div>
	)
})

type IngredientsP = {
	item: BasketItemT
	addIngredient: (ingredient: string, id: number) => void
	removeIngredient: (ingredient: string, id: number) => void
	closeIngredients: (id: number) => void
}
const Ingredients = memo<IngredientsP>(
	({ item, addIngredient, removeIngredient, closeIngredients }) => {
		const { category, id, name } = item

		const defaultIngredients = useMemo(() => getDefaultIngredients({ category, name }), [
			category,
			name,
		])

		const extraIngredients = useMemo(
			() => ingredients.filter(({ name }) => !defaultIngredients.includes(name)),
			[defaultIngredients],
		)

		const toggle = useCallback(
			(current: boolean, ingredient: string) =>
				current ? removeIngredient(ingredient, id) : addIngredient(ingredient, id),
			[addIngredient, id, removeIngredient],
		)

		const close = () => closeIngredients(id)
		return (
			<Dialog close={close}>
				<div
					onClick={e => e.stopPropagation()}
					css={css`
						& > div {
							display: flex;
							flex-wrap: wrap;
							margin-bottom: 5px;
						}
						& > h4 {
							margin: 0 0 0 5px;
						}
					`}
				>
					<h3
						css={css`
							margin: 0;
							text-align: center;
						`}
					>
						{name}
					</h3>
					<h4>Fravælg tilbehør</h4>
					<div>
						{defaultIngredients.map(ingredient => (
							<Item
								key={ingredient}
								ingredient={ingredient}
								toggle={toggle}
								added={item.ingredients.includes(ingredient)}
							/>
						))}
					</div>

					<h4>Tilføj tilbehør</h4>
					<div>
						{extraIngredients.map(({ name, price }) => (
							<Item
								key={name}
								ingredient={name}
								toggle={toggle}
								added={item.ingredients.includes(name)}
								price={price}
							/>
						))}
					</div>
				</div>
			</Dialog>
		)
	},
)

const OpenedItem = withContext(
	basketContext,
	([basket, { addIngredient, removeIngredient, closeIngredients }]) => ({
		addIngredient,
		removeIngredient,
		closeIngredients,
		item: basket.find(item => item.dialogOpened),
	}),
	props => (props.item ? <Ingredients {...props} item={props.item} /> : null),
)

export default OpenedItem
