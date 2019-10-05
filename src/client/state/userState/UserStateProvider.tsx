import React, { FC, useReducer, useMemo } from 'react'
import createActions from './createActions'
import userStateReducer from './userStateReducer'
import UserStateContext, { UserStateContextT } from './userStateContext'
import { UserStateT } from './defaultUserState'

interface UserStateProviderT {
	initUserState: UserStateT
}
const UserStateProvider: FC<UserStateProviderT> = props => {
	const [userState, dispatch] = useReducer(userStateReducer, props.initUserState)
	const actions = useMemo(() => createActions(dispatch), [])
	const value: UserStateContextT = useMemo(() => [userState, actions], [userState, actions])
	return <UserStateContext.Provider value={value} {...props} />
}

export default UserStateProvider
