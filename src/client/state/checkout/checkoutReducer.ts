import { OPEN_CHECKOUT, CLOSE_CHECKOUT } from './actionTypes'
import { CheckoutStateActionT } from './createActions'

type CheckoutReducerT = (state: boolean, action: CheckoutStateActionT) => boolean
const userStateReducer: CheckoutReducerT = (state, action) => {
	switch (action.type) {
		case OPEN_CHECKOUT:
			return true
		case CLOSE_CHECKOUT:
			return false

		default:
			if (process.env.NODE_ENV === 'development') {
				const { type, payload } = action
				throw new Error(
					`Bad action type "${type}" with payload=${payload} in checkoutReducer.`,
				)
			} else return state
	}
}

export default userStateReducer
