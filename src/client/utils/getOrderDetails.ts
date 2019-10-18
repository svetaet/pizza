import { BasketItemT } from 'components/Basket'

type StackedBasketItemT = BasketItemT & { ids: number[] }

const equalIngredients = (item1: BasketItemT, item2: BasketItemT) =>
	item1.omitted.every(ingredient => item2.omitted.includes(ingredient)) &&
	item2.omitted.every(ingredient => item1.omitted.includes(ingredient)) &&
	item1.added.every(ingredient => item2.added.includes(ingredient)) &&
	item2.added.every(ingredient => item1.added.includes(ingredient))

export const equalItems = (item1: BasketItemT, item2: BasketItemT) =>
	item1.category === item2.category &&
	item1.name === item2.name &&
	item1.size === item2.size &&
	equalIngredients(item1, item2)

const getOrderDetails = (basket: BasketItemT[]) => {
	let totalPrice = 0
	const stackedItems = basket.reduce((items: StackedBasketItemT[], item1) => {
		const stackingItem = items.find(item2 => equalItems(item1, item2))
		return stackingItem
			? items.map(item2 =>
					item2.id === stackingItem.id ? { ...item2, ids: [...item2.ids, item1.id] } : item2,
			  )
			: items.concat({ ...item1, ids: [item1.id] })
	}, [])

	const items = stackedItems.map(item => {
		const extraIngredientsPrice = item.added.reduce(
			(total, ingredient) =>
				total + item.extras.find(({ name }) => ingredient === name)!.price,
			0,
		)

		const price = item.price + extraIngredientsPrice
		totalPrice += price * item.ids.length
		return { ...item, price }
	})

	return { items, totalPrice }
}

export default getOrderDetails
