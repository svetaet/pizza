import React, { createContext } from 'react'
import createActions from './createActions'
import { UserStateT } from './defaultUserState'

export type UserStateContextT = [UserStateT, ReturnType<typeof createActions>]
const UserStateContext: React.Context<UserStateContextT> = createContext(
	([] as unknown) as UserStateContextT,
)

export default UserStateContext
