import React, { memo, useReducer, useMemo } from 'react'
import createActions from './createActions'
import userStateReducer from './userStateReducer'
import UserStateContext, { UserStateContextT } from './userStateContext'
import defaultUserState from './defaultUserState'

const UserStateProvider = memo(props => {
	const [userState, dispatch] = useReducer(userStateReducer, defaultUserState)
	const actions = useMemo(() => createActions(dispatch), [])
	const value: UserStateContextT = useMemo(() => [userState, actions], [userState, actions])
	return <UserStateContext.Provider value={value} {...props} />
})

export default UserStateProvider
