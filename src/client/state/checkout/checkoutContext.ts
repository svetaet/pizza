import React, { createContext } from 'react'
import createActions from './createActions'

export type CheckoutContextT = [boolean, ReturnType<typeof createActions>]
const CheckoutContext: React.Context<CheckoutContextT> = createContext(
	([] as unknown) as CheckoutContextT,
)

export default CheckoutContext
