import ingredients from 'constants/ingredients'

export default (desc: string) => {
	return ingredients.filter(ingredient => desc.includes(ingredient))
}
