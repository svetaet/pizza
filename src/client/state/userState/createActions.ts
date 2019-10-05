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

export type UserStateActionT =
	| {
			type: typeof LOG_IN
			payload: Omit<UserStateT, 'authorized'>
	  }
	| {
			type: typeof LOG_OUT
	  }
	| {
			type: typeof SET_FIRST_NAME
			payload: string
	  }
	| {
			type: typeof SET_LAST_NAME
			payload: string
	  }
	| {
			type: typeof SET_PHONE_NUMBER
			payload: string
	  }
	| {
			type: typeof SET_EMAIL
			payload: string
	  }
	| {
			type: typeof SET_STREET
			payload: string
	  }
	| {
			type: typeof SET_HOME_NUMBER
			payload: string
	  }
	| {
			type: typeof SET_POST_NUMBER
			payload: string
	  }
	| {
			type: typeof SET_CITY
			payload: string
	  }
	| {
			type: typeof SET_PASSWORD
			payload: string
	  }
	| {
			type: typeof SET_ORDER_NUMBER
			payload: string
	  }

export type UserStateActionTypeT = UserStateActionT['type']

const actions = (dispatch: React.Dispatch<UserStateActionT>) => ({
	logIn: (newUserState: Omit<UserStateT, 'authorized'>) =>
		dispatch({ type: LOG_IN, payload: newUserState }),
	logOut: () => dispatch({ type: LOG_OUT }),
	setFirstName: (newFirstName: string) =>
		dispatch({ type: SET_FIRST_NAME, payload: newFirstName }),
	setLastName: (newLastName: string) =>
		dispatch({ type: SET_LAST_NAME, payload: newLastName }),
	setPhoneNumber: (newPhoneNumber: string) =>
		dispatch({ type: SET_PHONE_NUMBER, payload: newPhoneNumber }),
	setEmail: (newEmail: string) => dispatch({ type: SET_EMAIL, payload: newEmail }),
	setStreet: (newStreet: string) => dispatch({ type: SET_STREET, payload: newStreet }),
	setHomeNumber: (newHomeNumber: string) =>
		dispatch({ type: SET_HOME_NUMBER, payload: newHomeNumber }),
	setPostNumber: (newPostNumber: string) =>
		dispatch({ type: SET_POST_NUMBER, payload: newPostNumber }),
	setCity: (newCity: string) => dispatch({ type: SET_CITY, payload: newCity }),
	setPassword: (newPassword: string) => dispatch({ type: SET_PASSWORD, payload: newPassword }),
	setOrderNumber: (newOrderNumber: string) =>
		dispatch({ type: SET_ORDER_NUMBER, payload: newOrderNumber }),
})

export default actions
