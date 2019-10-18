import React, { memo, useReducer, useMemo, useEffect } from 'react'
import createActions from './createActions'
import userStateReducer from './userStateReducer'
import UserStateContext, { UserStateContextT } from './userStateContext'
import defaultUserState, { UserStateT } from './defaultUserState'
import { debounce } from '@rqm/tools'

const getStoredState = () => {
	if (localStorage) {
		const storedState = localStorage.getItem('userState')
		if (storedState) return JSON.parse(storedState) as UserStateT
	}
	return defaultUserState
}

const storeState = debounce(
	(state: UserStateT) => {
		if (localStorage) localStorage.setItem('userState', JSON.stringify(state))
	},
	{ ms: 1200 },
)

const UserStateProvider = memo(props => {
	const [userState, dispatch] = useReducer(userStateReducer, defaultUserState, getStoredState)

	useEffect(() => {
		storeState(userState)
	}, [userState])

	const actions = useMemo(() => createActions(dispatch), [])
	const value: UserStateContextT = useMemo(() => [userState, actions], [userState, actions])
	return <UserStateContext.Provider value={value} {...props} />
})

export default UserStateProvider
