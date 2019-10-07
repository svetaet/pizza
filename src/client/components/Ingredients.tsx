import React, { memo, FC, useState, useCallback, useMemo, useRef } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'

import menu from 'constants/menu'
import ingredients from 'constants/extraIngredients'
import themeColors from 'themeColors'
import basketContext from 'state/basket/basketContext'
import { BasketItemT } from 'components/Basket'
import Close from 'components/icons/Close'
import getDefaultIngredients from 'utils/getDefaultIngredients'
import formatPrice from 'utils/formatPrice'

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
				display: flex;
				align-items: center;
				& > span {
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
	closeDialog: (id: number) => void
}
const Ingredients = memo<IngredientsP>(
	({ item, addIngredient, removeIngredient, closeDialog }) => {
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

		// const add = useCallback((ingredient: string) => addIngredient(ingredient, id), [
		// 	addIngredient,
		// 	id,
		// ])
		// const remove = useCallback((ingredient: string) => removeIngredient(ingredient, id), [
		// 	removeIngredient,
		// 	id,
		// ])
		const close = () => closeDialog(id)
		return (
			<div
				css={css`
					top: 0;
					left: 0;
					position: fixed;
					width: 100vw;
					height: 100vh;
					display: grid;
					background: transparent;
					font-family: 'Calibri', sans-serif;
					color: #656565;
				`}
				onClick={close}
			>
				<div
					onClick={e => e.stopPropagation()}
					css={css`
						position: relative;
						border-radius: 20px;
						border: solid 1px ${themeColors.weak};
						max-width: 600px;
						padding: 10px 20px;
						margin: auto;
						background: white;
						box-shadow: 1px 1px 10px 0px ##656565ab;
						& > div {
							display: flex;
							flex-wrap: wrap;
							margin-bottom: 5px;
							& > div {
								margin: 5px 0;
								width: 200px;
							}
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

					<div
						css={css`
							position: absolute;
							top: 10px;
							right: 10px;
						`}
						onClick={close}
					>
						<Close />
					</div>
				</div>
			</div>
		)
	},
)

const OpenedItem = withContext(
	basketContext,
	([basket, { addIngredient, removeIngredient, closeDialog }], props) => ({
		...props,
		addIngredient,
		removeIngredient,
		closeDialog,
		item: basket.find(item => item.dialogOpened),
	}),
	props => (props.item ? <Ingredients {...props} item={props.item} /> : null),
)

export default OpenedItem
