import React, { memo, useReducer, useMemo } from 'react'
import createActions from './createActions'
import basketReducer from './basketReducer'
import BasketContext, { BasketContextT } from './basketContext'

const BasketProvider = memo(props => {
	const [basket, dispatch] = useReducer(basketReducer, [])
	const actions = useMemo(() => createActions(dispatch), [])
	const value: BasketContextT = useMemo(() => [basket, actions], [basket, actions])
	return <BasketContext.Provider value={value} {...props} />
})

export default BasketProvider
