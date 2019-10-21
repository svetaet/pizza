import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	ADD_ITEM,
	REMOVE_ITEM,
	CLOSE_INGREDIENTS,
	OPEN_INGREDIENTS,
} from './actionTypes'
import { BasketItemT } from 'components/Basket'
import { BasketStateActionT } from './createActions'

const createIngredientCheck = (id: number | number[]) =>
	typeof id === 'number'
		? (item: BasketItemT) => item.id === id
		: (item: BasketItemT) => id.includes(item.id)

type BasketReducerT = (state: BasketItemT[], action: BasketStateActionT) => BasketItemT[]
const userStateReducer: BasketReducerT = (state, action) => {
	switch (action.type) {
		case ADD_ITEM:
			return [
				...state,
				{
					dialogOpened: true,
					omitted: [],
					added: [],
					...action.payload,
					id: state.reduce((max, { id }) => Math.max(id, max), 0) + 1,
				},
			]
		case REMOVE_ITEM:
			return state.filter(item => item.id !== action.payload)

		case ADD_INGREDIENT:
			const check1 = createIngredientCheck(action.payload.id)
			return state.map(item =>
				check1(item)
					? {
							...item,
							[action.payload.type]: [...item[action.payload.type], action.payload.ingredient],
					  }
					: item,
			)
		case REMOVE_INGREDIENT:
			const check2 = createIngredientCheck(action.payload.id)
			return state.map(item =>
				check2(item)
					? {
							...item,
							[action.payload.type]: item[action.payload.type].filter(
								ingredient => ingredient !== action.payload.ingredient,
							),
					  }
					: item,
			)

		case CLOSE_INGREDIENTS:
			const check3 = createIngredientCheck(action.payload)
			return state.map(item => (check3(item) ? { ...item, dialogOpened: false } : item))

		case OPEN_INGREDIENTS:
			const check4 = createIngredientCheck(action.payload)
			return state.map(item => (check4(item) ? { ...item, dialogOpened: true } : item))

		default:
			if (process.env.NODE_ENV === 'development') {
				const { type, payload } = action
				throw new Error(`Bad action type "${type}" with payload=${payload} in basketReducer.`)
			} else return state
	}
}

export default userStateReducer
