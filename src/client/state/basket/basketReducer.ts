import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	ADD_ITEM,
	REMOVE_ITEM,
	CLOSE_INGREDIENTS,
} from './actionTypes'
import { BasketItemT } from 'components/Basket'
import { BasketStateActionT } from './createActions'

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
			return state.map(item =>
				item.id === action.payload.id
					? {
							...item,
							[action.payload.type]: [...item[action.payload.type], action.payload.ingredient],
					  }
					: item,
			)
		case REMOVE_INGREDIENT:
			return state.map(item =>
				item.id === action.payload.id
					? {
							...item,
							[action.payload.type]: item[action.payload.type].filter(
								ingredient => ingredient !== action.payload.ingredient,
							),
					  }
					: item,
			)

		case CLOSE_INGREDIENTS:
			return state.map(item =>
				item.id === action.payload ? { ...item, dialogOpened: false } : item,
			)

		default:
			if (process.env.NODE_ENV === 'development') {
				const { type, payload } = action
				throw new Error(`Bad action type "${type}" with payload=${payload} in basketReducer.`)
			} else return state
	}
}

export default userStateReducer
