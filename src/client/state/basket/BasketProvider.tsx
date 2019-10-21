import React, { memo, useReducer, useMemo, useEffect } from 'react'
import createActions from './createActions'
import basketReducer from './basketReducer'
import BasketContext, { BasketContextT } from './basketContext'
import { debounce } from '@rqm/tools'

const getStoredState = () => {
	if (localStorage) {
		const storedState = localStorage.getItem('basket')
		if (storedState) return JSON.parse(storedState) as BasketContextT[0]
	}
	return []
}

const storeState = debounce(
	(state: BasketContextT[0]) => {
		if (localStorage) localStorage.setItem('basket', JSON.stringify(state))
	},
	{ ms: 1200 },
)

const BasketProvider = memo(props => {
	const [basket, dispatch] = useReducer(basketReducer, [], getStoredState)

	useEffect(() => {
		storeState(basket)
	}, [basket])

	const actions = useMemo(() => createActions(dispatch), [])
	const value: BasketContextT = useMemo(() => {
		const openedItems = basket.filter(item => item.dialogOpened)
		return [basket, actions, openedItems]
	}, [basket, actions])
	return <BasketContext.Provider value={value} {...props} />
})

export default BasketProvider
