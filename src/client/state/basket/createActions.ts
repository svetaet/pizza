import { ADD_INGREDIENT, REMOVE_INGREDIENT, ADD_ITEM, REMOVE_ITEM } from './actionTypes'

import { BasketItemT } from 'components/Basket'

type HandleIngredientT = {
	ingredient: string
	id: number
}

export type BasketStateActionT =
	| {
			type: typeof ADD_ITEM
			payload: Omit<BasketItemT, 'id'>
	  }
	| {
			type: typeof REMOVE_ITEM
			payload: number
	  }
	| {
			type: typeof ADD_INGREDIENT
			payload: HandleIngredientT
	  }
	| {
			type: typeof REMOVE_INGREDIENT
			payload: HandleIngredientT
	  }

export type BasketStateActionTypeT = BasketStateActionT['type']

const actions = (dispatch: React.Dispatch<BasketStateActionT>) => ({
	addItem: (item: Omit<BasketItemT, 'id'>) => dispatch({ type: ADD_ITEM, payload: item }),

	removeItem: (id: number) => dispatch({ type: REMOVE_ITEM, payload: id }),

	addIngredient: (ingredient: string, id: number) =>
		dispatch({ type: ADD_INGREDIENT, payload: { ingredient, id } }),

	removeIngredient: (ingredient: string, id: number) =>
		dispatch({ type: REMOVE_INGREDIENT, payload: { ingredient, id } }),
})

export default actions
