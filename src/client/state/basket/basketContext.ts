import React, { createContext } from 'react'
import createActions from './createActions'
import { BasketItemT } from 'components/Basket'

export type BasketContextT = [BasketItemT[], ReturnType<typeof createActions>]
const BasketContext: React.Context<BasketContextT> = createContext(
	([] as unknown) as BasketContextT,
)

export default BasketContext
