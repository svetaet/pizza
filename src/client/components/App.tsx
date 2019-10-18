import React, { memo, useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react'
import { css } from '@emotion/core'

import Header from 'components/Header'
import Menu, { MenuT } from 'components/Menu'
import Categories from 'components/Categories'
import Basket from 'components/Basket'
import Ingredients from 'components/Ingredients'
import Checkout from 'components/Checkout'
import AppBar, { OpenedT } from 'components/AppBar'
import Sidebar from 'components/Sidebar'
import Bottom from 'components/Bottom'
import BasketProvider from 'state/basket/BasketProvider'
import UserStateProvider from 'state/userState/UserStateProvider'
import CheckoutProvider from 'state/checkout/CheckoutProvider'
import useMedia from 'utils/useMedia'
import api from 'utils/api'

const scrollToCategory = (slug: string) => {
	const anchor = document.getElementById(slug)
	if (anchor) anchor.scrollIntoView({ behavior: 'smooth' })
}

const App = memo(() => {
	const mobile = useMedia('(max-width:760px)')
	const headerHeight = mobile ? 300 : 610

	const [opened, setOpened] = useState<OpenedT>('menu')

	const [menu, setMenu] = useState<MenuT>([])
	useEffect(() => {
		api<MenuT>({ endpoint: 'menu', onSuccess: setMenu })
	}, [])

	const categories = useMemo(() => menu.map(({ name, slug }) => ({ name, slug })), [menu])
	const [category, setCategory] = useState('')
	const categoryN = category === '' ? 0 : categories.findIndex(item => item.slug === category)
	const [renderedCategories, setRenderedCategories] = useState(0)
	useLayoutEffect(() => {
		if (categoryN > renderedCategories) setRenderedCategories(categoryN)
	}, [categoryN, renderedCategories])

	const [scroll, setScroll] = useState('')
	useEffect(() => {
		if (scroll) {
			scrollToCategory(scroll)
			setScroll('')
		}
	}, [scroll])
	const setCategoryAndScroll = useCallback(
		(slug: string, n: number) => {
			if (n > renderedCategories) setRenderedCategories(n)
			setScroll(slug)
		},
		[renderedCategories],
	)

	return (
		<CheckoutProvider>
			<BasketProvider>
				<UserStateProvider>
					<div
						css={css`
							position: relative;
							width: 100%;
							display: flex;
							flex-direction: column;
							align-items: center;
							font-family: 'Calibri', sans-serif;
						`}
					>
						<Header height={headerHeight} />
						<div
							css={css`
								margin-top: ${mobile
									? `calc(${headerHeight + 10}px + 7vw)`
									: `${headerHeight + 70}px`};
								text-align: left;
								box-sizing: border-box;
								width: 100%;
								padding: 0 10px;
								max-width: 1100px;
								display: flex;
								flex-direction: ${mobile ? 'column' : 'row'};
							`}
							onClick={mobile ? () => setOpened('menu') : undefined}
						>
							{mobile ? (
								<>
									<AppBar opened={opened} setOpened={setOpened}>
										<Sidebar opened={opened === 'categories'} side={'left'}>
											<Categories
												setCategory={setCategoryAndScroll}
												categories={categories}
												currentCategory={category}
											/>
										</Sidebar>
										<Sidebar opened={opened === 'basket'} side={'right'}>
											<Basket />
										</Sidebar>
									</AppBar>
									<Menu setCategory={setCategory} menu={menu} categoryN={renderedCategories} />
								</>
							) : (
								<>
									<Categories
										categories={categories}
										setCategory={setCategoryAndScroll}
										currentCategory={category}
									/>
									<Menu setCategory={setCategory} menu={menu} categoryN={renderedCategories} />
									<Basket />
								</>
							)}
						</div>
						<Bottom />
					</div>
					<Ingredients />
					<Checkout />
				</UserStateProvider>
			</BasketProvider>
		</CheckoutProvider>
	)
})

export default App
