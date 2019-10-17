import React, { memo, FC, useCallback, useEffect, useRef, useMemo } from 'react'
import { css } from '@emotion/core'
import { animated, useSpring } from '@react-spring/web'
import { throttle } from '@rqm/tools'
import { withContext } from '@rqm/react-tools'

import { AddItemPayloadT } from 'state/basket/createActions'
import basketContext from 'state/basket/basketContext'
import AddIcon from 'components/icons/Add'
import MenuStub from 'components/MenuStub'
import styles from 'styles'
import themeColors from 'themeColors'
import formatPrice from 'utils/formatPrice'
import getDefaultIngredients from 'utils/getDefaultIngredients'

export type IngredientT = {
	id: string
	name: string
	price: number
}

export type ItemT = {
	id: string
	name: string
	description: string
	price: number
	deep_price?: number
	fam_price?: number
	extras: IngredientT[]
}

export type CategoryT = {
	id: string
	name: string
	slug: string
	pizzas: ItemT[]
}

export type MenuT = CategoryT[]

export const categoryHeight = 68
export const itemHeight = 115

type AddItemWrapT = (item: Omit<AddItemPayloadT, 'category'>) => void

type MenuItemP = {
	hoverHandler: (n: number) => void
	n: number
	addItem: AddItemWrapT
} & Omit<ItemT, 'id'>

const MenuItem: FC<MenuItemP> = ({
	extras,
	name,
	price,
	deep_price,
	fam_price,
	description,
	hoverHandler,
	addItem,
	n,
}) => {
	const variants = [{ price, size: 'ALM' }]
	if (deep_price) variants.push({ price: deep_price, size: 'DEEP' })
	if (fam_price) variants.push({ price: fam_price, size: 'FAM' })
	return (
		<div
			css={css`
				display: flex;
				height: ${itemHeight}px;
				justify-content: space-between;
				padding: 13px 15px 13px 45px;
				@media (max-width: 760px) {
					padding: 13px 15px 13px 15px;
				}
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
					{description}
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
								min-width: 110px;
								display: flex;
								justify-content: space-between;
								align-items: center;
								color: ${themeColors.weak};
							`}
						>
							<span
								css={css`
									font-size: 12px;
									font-weight: bold;
									margin: 0 5px 0 0;
								`}
							>
								{size}
							</span>
							<p
								css={css`
									white-space: nowrap;
								`}
							>{`DKK ${formatPrice(price)}`}</p>
						</div>
						<div
							onClick={() => {
								const defaults = getDefaultIngredients(description)
								addItem({
									name,
									size,
									defaults,
									extras,
									price,
									dialogOpened: [defaults, extras].some(ings => ings.length !== 0),
								})
							}}
							css={css`
								margin-left: 30px;
								@media (max-width: 760px) {
									margin-left: 10px;
								}
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
} & Omit<CategoryT, 'id'>
const MenuItemsContainer = memo<MenuItemsContainerP>(
	({ slug, name: category, pizzas: items, glide, addItem, n }) => {
		const hoverHandler = useCallback(itemN => glide(n, itemN), [glide, n])

		const addItemWrap = useCallback<AddItemWrapT>(item => addItem({ ...item, category }), [
			addItem,
			category,
		])

		return (
			<>
				<h1
					id={slug}
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
				{items.map(({ name, price, deep_price, fam_price, description, extras }, n) => (
					<MenuItem
						key={name}
						name={name}
						extras={extras}
						price={price}
						deep_price={deep_price}
						fam_price={fam_price}
						description={description}
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
const Menu: FC<{ menu: MenuT; setCategory: (slug: string) => void }> = withContext(
	basketContext,
	([, { addItem }], props) => ({ addItem, ...props }),
	memo(({ addItem, menu, setCategory }) => {
		const [spring, setSpring] = useSpring(() => ({ top: initialTop }))

		const getTop = useCallback(
			(categoryN: number, itemN: number) => {
				const prevCategoriesLength = menu
					.filter((item, n) => n < categoryN)
					.reduce((len, { pizzas }) => len + pizzas.length, 0)
				return (
					categoryHeight * categoryN + prevCategoriesLength * itemHeight + itemN * itemHeight
				)
			},
			[menu],
		)

		const categoriesOffset = useMemo(
			() => menu.map(({ slug }, n) => ({ offset: getTop(n, 0), slug })).reverse(),
			[menu, getTop],
		)
		const glide = useCallback(
			(categoryN: number, itemN: number) =>
				setSpring({ top: initialTop + getTop(categoryN, itemN) }),
			[getTop, setSpring],
		)

		const menuRef = useRef<HTMLDivElement>(null)
		const menuOffsetTop = useRef(680)

		useEffect(() => {
			const pushToHistory = throttle(
				(e: Event) => {
					let categorySlug = ''
					const target = e.target as HTMLDivElement
					const menuScrollTop =
						target.scrollTop - menuOffsetTop.current + Math.round(window.innerHeight / 2)
					if (menuScrollTop > 0) {
						const categoryN = categoriesOffset.find(({ offset }) => offset < menuScrollTop)
						if (categoryN) categorySlug = categoryN.slug
					}
					setCategory(categorySlug)
				},
				{ ms: 60 },
			)

			const setMenuOffsetTop = throttle(
				() => {
					const menuElement = menuRef.current
					if (menuElement) menuOffsetTop.current = menuElement.offsetTop
				},
				{ ms: 30, onStart: true },
			)
			setMenuOffsetTop()

			window.addEventListener('resize', setMenuOffsetTop)
			window.addEventListener('scroll', pushToHistory)
			return () => {
				window.removeEventListener('resize', setMenuOffsetTop)
				window.removeEventListener('scroll', pushToHistory)
			}
		}, [categoriesOffset, setCategory])
		return (
			<div
				css={css`
					max-width: 740px;
				`}
			>
				<h2
					css={css`
						margin: 0;
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
						padding: 0 15px 0 30px;
						@media (max-width: 760px) {
							padding: 0;
						}
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
							height: ${itemHeight - 18}px;
							position: absolute;
							top: 9px;
							left: 20px;
							@media (max-width: 760px) {
								left: 0;
							}
							background: ${themeColors.orange};
							border-radius: 2px;
						`}
					/>
					{menu.length ? (
						menu.map(({ name, pizzas, slug }, n) => (
							<MenuItemsContainer
								key={slug}
								slug={slug}
								name={name}
								pizzas={pizzas}
								addItem={addItem}
								glide={glide}
								n={n}
							/>
						))
					) : (
						<MenuStub />
					)}
				</div>
			</div>
		)
	}),
)

export default Menu
