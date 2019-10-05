import {
	LOG_IN,
	LOG_OUT,
	SET_FIRST_NAME,
	SET_LAST_NAME,
	SET_PHONE_NUMBER,
	SET_EMAIL,
	SET_STREET,
	SET_HOME_NUMBER,
	SET_POST_NUMBER,
	SET_CITY,
	SET_PASSWORD,
	SET_ORDER_NUMBER,
} from './actionTypes'
import { UserStateT } from './defaultUserState'

type UserStateReducerT = (
	state: UserStateT,
	action: { type: string; payload?: any; meta?: any },
) => UserStateT
const userStateReducer: UserStateReducerT = (state, { type, payload }) => {
	switch (type) {
		case LOG_IN:
			return { ...state, ...payload, authorized: true }
		case LOG_OUT:
			return { ...state, authorized: false }
		case SET_FIRST_NAME:
			return { ...state, firstName: payload }
		case SET_LAST_NAME:
			return { ...state, lastName: payload }
		case SET_PHONE_NUMBER:
			return { ...state, phoneNumber: payload }
		case SET_EMAIL:
			return { ...state, email: payload }
		case SET_STREET:
			return { ...state, street: payload }
		case SET_HOME_NUMBER:
			return { ...state, homeNumber: payload }
		case SET_POST_NUMBER:
			return { ...state, postNumber: payload }
		case SET_CITY:
			return { ...state, city: payload }
		case SET_PASSWORD:
			return { ...state, password: payload }
		case SET_ORDER_NUMBER:
			return { ...state, orderNumber: payload }
		default:
			if (process.env.NODE_ENV === 'development')
				throw new Error(
					`Bad action type "${type}" with payload=${payload} in userStateReducer.`,
				)
			else return state
	}
}

export default userStateReducer
