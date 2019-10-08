import React, { memo, FC, useCallback, useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import { animated, useSpring } from '@react-spring/web'
import { throttle } from '@rqm/tools'
import { withContext } from '@rqm/react-tools'

import { AddItemPayloadT } from 'state/basket/createActions'
import basketContext from 'state/basket/basketContext'
import AddIcon from 'components/icons/Add'
import menu, { MenuItemT, MenuCategoryT } from 'constants/menu'
import styles from 'styles'
import themeColors from 'themeColors'
import history from '../history'
import formatPrice from 'utils/formatPrice'

const categoryHeight = 68
const itemHeight = 115

const formatIngredients = (ingredients: string[]) => {
	let result = ingredients[0][0].toUpperCase() + ingredients[0].slice(1) + ', '

	const intermediateLength = ingredients.length - 2

	for (let i = 1; i < intermediateLength; ++i) {
		result += ingredients[i] + ', '
	}

	result += ingredients[intermediateLength + 1] + '.'
	return result
}

type AddItemWrapT = (item: {
	name: string
	size: string
	price: number
	ingredients: string[]
}) => void

type MenuItemP = {
	hoverHandler: (n: number) => void
	n: number
	addItem: AddItemWrapT
} & Required<MenuItemT>

const MenuItem: FC<MenuItemP> = ({
	ingredients,
	name,
	variants,
	hoverHandler,
	addItem,
	n,
}) => {
	return (
		<div
			css={css`
				display: flex;
				height: ${itemHeight}px;
				justify-content: space-between;
				padding: 13px 15px 13px 45px;
				box-sizing: border-box;
			`}
			onMouseOver={() => hoverHandler(n)}
		>
			<div
				css={css`
					margin-right: 10px;
					${styles.scrollbar}
				`}
			>
				<h3
					css={css`
						margin: 0 0 5px 0;
					`}
				>
					{name}
				</h3>
				<p
					css={css`
						font-size: 14px;
						color: ${themeColors.weak};
						padding-bottom: 5px;
					`}
				>
					{formatIngredients(ingredients)}
				</p>
			</div>

			<div
				css={css`
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
				`}
			>
				{variants.map(({ price, size }) => (
					<div
						key={size}
						css={css`
							display: flex;
							justify-content: space-between;
							align-items: center;
						`}
					>
						<div
							css={css`
								width: 110px;
								display: flex;
								justify-content: space-between;
								align-items: center;
								color: ${themeColors.weak};
							`}
						>
							<p
								css={css`
									font-size: 12px;
									font-weight: bold;
								`}
							>
								{size}
							</p>
							<p
								css={css`
									white-space: nowrap;
								`}
							>{`DKK ${formatPrice(price)}`}</p>
						</div>
						<div
							onClick={() => addItem({ name, size, ingredients, price })}
							css={css`
								margin-left: 30px;
								cursor: pointer;
								display: grid;
							`}
						>
							<AddIcon />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

type MenuItemsContainerP = {
	n: number
	glide: (categoryN: number, itemN: number) => void
	addItem: (item: AddItemPayloadT) => void
} & MenuCategoryT
const MenuItemsContainer = memo<MenuItemsContainerP>(
	({ path, category, items, defaultVariants, glide, addItem, n }) => {
		const hoverHandler = useCallback(itemN => glide(n, itemN), [glide, n])

		const addItemWrap = useCallback<AddItemWrapT>(item => addItem({ ...item, category }), [
			addItem,
			category,
		])

		return (
			<>
				<h1
					id={path}
					css={css`
						font-weight: normal;
						height: ${categoryHeight}px;
						box-sizing: border-box;
						margin: 0;
						padding: 20px 0 13px 13px;
						${styles.border('bottom')}
					`}
				>
					{category}
				</h1>
				{items.map(({ ingredients, name, variants = defaultVariants }, n) => (
					<MenuItem
						key={name}
						ingredients={ingredients}
						name={name}
						variants={variants}
						hoverHandler={hoverHandler}
						addItem={addItemWrap}
						n={n}
					/>
				))}
			</>
		)
	},
)

const initialTop = categoryHeight

const getTop = (categoryN: number, itemN: number) => {
	const prevCategoriesLength = menu
		.filter((item, n) => n < categoryN)
		.reduce((len, { items }) => len + items.length, 0)
	return categoryHeight * categoryN + prevCategoriesLength * itemHeight + itemN * itemHeight
}

const categoriesOffset = menu.map(({ path }, n) => ({ offset: getTop(n, 0), path })).reverse()

const Menu = withContext(
	basketContext,
	([, { addItem }], props: { rootRef: React.RefObject<HTMLDivElement> }) => ({
		addItem,
		...props,
	}),
	memo(({ rootRef, addItem }) => {
		const [spring, setSpring] = useSpring(() => ({ top: initialTop }))
		const glide = useCallback(
			(categoryN: number, itemN: number) =>
				setSpring({ top: initialTop + getTop(categoryN, itemN) }),
			[setSpring],
		)

		const menuRef = useRef<HTMLDivElement>(null)
		const menuOffsetTop = useRef(700)

		useEffect(() => {
			const root = rootRef.current
			if (root) {
				root.addEventListener<'scroll'>(
					'scroll',
					throttle(
						(e: Event) => {
							let categoryPath = '/'
							const target = e.target as HTMLDivElement
							const menuScrollTop =
								target.scrollTop - menuOffsetTop.current + Math.round(window.innerHeight / 2)
							if (menuScrollTop > 0) {
								const categoryN = categoriesOffset.find(({ offset }) => offset < menuScrollTop)
								if (categoryN) categoryPath = categoryN.path
							}
							history.push(categoryPath)
						},
						{ ms: 400, onStart: true },
					),
				)
			}

			const setMenuOffsetTop = () => {
				const menuElement = menuRef.current
				if (menuElement) {
					menuOffsetTop.current = menuElement.offsetTop
				}
			}
			setMenuOffsetTop()
			window.addEventListener('resize', throttle(setMenuOffsetTop))
		}, [glide, rootRef, setSpring])
		return (
			<div
				css={css`
					width: 625px;
					margin-right: 15px;
				`}
			>
				<h2
					css={css`
						margin: 0;x;
						padding: 0 0 5px 85px;
						${styles.title}
						${styles.border('bottom')}
					`}
				>
					Menukort
				</h2>
				<div
					ref={menuRef}
					css={css`
						position: relative;
						padding-left: 30px;
						& > *:not(*:nth-of-type(1)) {
							${styles.border('bottom')}
						}
						& p {
							margin: 0;
						}
					`}
				>
					<animated.div
						style={{ transform: spring.top.to(y => `translateY(${y}px)`) }}
						css={css`
							will-change: transform;
							width: 4px;
							height: 82px;
							position: absolute;
							top: 9px;
							left: 20px;
							background: ${themeColors.orange};
							border-radius: 2px;
						`}
					/>
					{menu.map(({ category, items, path, defaultVariants }, n) => (
						<MenuItemsContainer
							key={path}
							path={path}
							category={category}
							items={items}
							defaultVariants={defaultVariants}
							addItem={addItem}
							glide={glide}
							n={n}
						/>
					))}
				</div>
			</div>
		)
	}),
)

export default Menu
