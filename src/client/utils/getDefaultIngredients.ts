import menu from 'constants/menu'

export default ({ category, name }: { category: string; name: string }) => {
	try {
		const defaultIngredients = menu
			.find(item => item.category === category)!
			.items.find(item => item.name === name)!.ingredients
		return defaultIngredients
	} catch (err) {
		console.error(err)
		return []
	}
}
