import { OPEN_CHECKOUT, CLOSE_CHECKOUT } from './actionTypes'

export type CheckoutStateActionT =
	| {
			type: typeof OPEN_CHECKOUT
	  }
	| {
			type: typeof CLOSE_CHECKOUT
	  }

export type CheckoutStateActionTypeT = CheckoutStateActionT['type']

const actions = (dispatch: React.Dispatch<CheckoutStateActionT>) => ({
	openCheckout: () => dispatch({ type: OPEN_CHECKOUT }),
	closeCheckout: () => dispatch({ type: CLOSE_CHECKOUT }),
})

export default actions
