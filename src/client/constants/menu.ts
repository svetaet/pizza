import ingredients from 'constants/ingredients'

const {
	kinkku,
	ananas,
	salami,
	sipuli,
	valkosipuli,
	tonnikala,
	aurajuusto,
	katkarapu,
	pinaatti,
	kananmuna,
	mozzarella,
	tomaatti,
	parmesanijuusto,
	parsa,
	cheddarjuusto,
	herkkusieni,
	rucola,
	jalapenos,
	oliivi,
	maissi,
	paprika,
	majoneesi,
	turkinpippuri,
	salaatti,
	bbqKastike,
	piatti,
} = ingredients

type VariantT = {
	size: string
	price: number
}

export type MenuItemT = {
	name: string
	ingredients: string[]
	variants?: VariantT[]
}

export type MenuCategoryT = {
	category: string
	path: string
	defaultVariants: VariantT[]
	items: MenuItemT[]
}

const menu: MenuCategoryT[] = [
	{
		category: 'Pizza',
		path: '/pizza',
		defaultVariants: [
			{
				size: 'ALM',
				price: 84,
			},
			{
				size: 'DEEP',
				price: 104,
			},
			{
				size: 'FAM',
				price: 190,
			},
		],
		items: [
			{
				name: 'Americana',
				ingredients: [kinkku, ananas],
			},
			{
				name: 'Finlandia',
				ingredients: [kinkku, salami, sipuli, valkosipuli],
			},
			{
				name: 'Opera special',
				ingredients: [kinkku, tonnikala, salami],
			},
			{
				name: 'Italia',
				ingredients: [kinkku, aurajuusto, katkarapu, valkosipuli],
			},
			{
				name: 'Tropicana',
				ingredients: [kinkku, ananas, aurajuusto],
			},
			{
				name: 'Al tonna',
				ingredients: [tonnikala, pinaatti, kananmuna, aurajuusto],
			},
		],
	},
	{
		category: 'Vege pizzat',
		path: '/vege_pizzat',
		defaultVariants: [
			{
				size: 'ALM',
				price: 84,
			},
			{
				size: 'DEEP',
				price: 104,
			},
			{
				size: 'FAM',
				price: 190,
			},
		],
		items: [
			{
				name: 'Aso vege',
				ingredients: [pinaatti, mozzarella, tomaatti, parmesanijuusto],
			},
			{
				name: 'Tazano vege',
				ingredients: [parsa, cheddarjuusto, herkkusieni, sipuli, rucola],
			},
			{
				name: 'Delo vege',
				ingredients: [tomaatti, jalapenos, oliivi, mozzarella, maissi],
			},
			{
				name: 'Milan vege',
				ingredients: [
					paprika,
					maissi,
					mozzarella,
					ananas,
					herkkusieni,
					piatti,
					salaatti,
					majoneesi,
				],
			},
			{
				name: 'Roma vege',
				ingredients: [aurajuusto, bbqKastike, turkinpippuri, rucola, sipuli],
			},
		],
	},
	{
		path: '/kebabit',
		category: 'Kebabit',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/rullakebabit',
		category: 'Rullakebabit',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/pitakebabit',
		category: 'Pitakebabit',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/chicken_wings',
		category: 'Chicken wings',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/doner_annokset',
		category: 'Döner annokset',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/kananugetit',
		category: 'Kananugetit',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/muut_annokset',
		category: 'Muut annokset',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/falafelit',
		category: 'Falafelit',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/salaatit',
		category: 'Salaatit',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
	{
		path: '/juomat',
		category: 'Juomat',
		defaultVariants: [{ size: 'ALM', price: 84 }],
		items: [],
	},
]

export const routes = menu.map(({ path }) => path)

export default menu
