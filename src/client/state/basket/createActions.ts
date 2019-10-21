import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	ADD_ITEM,
	REMOVE_ITEM,
	CLOSE_INGREDIENTS,
	OPEN_INGREDIENTS,
} from './actionTypes'

import { BasketItemT } from 'components/Basket'

export type IngredientTypeT = 'omitted' | 'added'

type HandleIngredientPayloadT = {
	type: IngredientTypeT
	ingredient: string
	id: number | number[]
}

export type AddItemPayloadT = Omit<BasketItemT, 'id' | 'dialogOpened' | 'omitted' | 'added'> &
	Partial<Pick<BasketItemT, 'omitted' | 'added'>> & {
		dialogOpened?: boolean
	}

export type BasketStateActionT =
	| {
			type: typeof ADD_ITEM
			payload: AddItemPayloadT
	  }
	| {
			type: typeof REMOVE_ITEM
			payload: number
	  }
	| {
			type: typeof ADD_INGREDIENT
			payload: HandleIngredientPayloadT
	  }
	| {
			type: typeof REMOVE_INGREDIENT
			payload: HandleIngredientPayloadT
	  }
	| {
			type: typeof CLOSE_INGREDIENTS
			payload: number | number[]
	  }
	| {
			type: typeof OPEN_INGREDIENTS
			payload: number | number[]
	  }

export type BasketStateActionTypeT = BasketStateActionT['type']

const actions = (dispatch: React.Dispatch<BasketStateActionT>) => ({
	addItem: (item: AddItemPayloadT) => dispatch({ type: ADD_ITEM, payload: item }),
	removeItem: (id: number) => dispatch({ type: REMOVE_ITEM, payload: id }),

	addIngredient: (ingredient: string, id: number | number[], type: IngredientTypeT) =>
		dispatch({ type: ADD_INGREDIENT, payload: { ingredient, id, type } }),
	removeIngredient: (ingredient: string, id: number | number[], type: IngredientTypeT) =>
		dispatch({ type: REMOVE_INGREDIENT, payload: { ingredient, id, type } }),

	closeIngredients: (id: number | number[]) =>
		dispatch({ type: CLOSE_INGREDIENTS, payload: id }),
	openIngredients: (id: number | number[]) =>
		dispatch({ type: OPEN_INGREDIENTS, payload: id }),
})

export default actions
