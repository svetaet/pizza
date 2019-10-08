import React, { FC, useReducer, useMemo } from 'react'
import createActions from './createActions'
import checkoutReducer from './checkoutReducer'
import CheckoutContext, { CheckoutContextT } from './checkoutContext'

const CheckoutProvider: FC = props => {
	const [basket, dispatch] = useReducer(checkoutReducer, false)
	const actions = useMemo(() => createActions(dispatch), [])
	const value: CheckoutContextT = useMemo(() => [basket, actions], [basket, actions])
	return <CheckoutContext.Provider value={value} {...props} />
}

export default CheckoutProvider
