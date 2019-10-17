import React, { memo, useRef, useState, useEffect, useMemo } from 'react'
import { css } from '@emotion/core'

import Header from 'components/Header'
import Menu, { MenuT } from 'components/Menu'
import Categories from 'components/Categories'
import Basket from 'components/Basket'
import Ingredients from 'components/Ingredients'
import Checkout from 'components/Checkout'
import AppBar, { OpenedT } from 'components/AppBar'
import Sidebar from 'components/Sidebar'
import BasketProvider from 'state/basket/BasketProvider'
import UserStateProvider from 'state/userState/UserStateProvider'
import CheckoutProvider from 'state/checkout/CheckoutProvider'
import useLazy from 'utils/useLazy'
import useMedia from 'utils/useMedia'

const App = memo(() => {
	const rootRef = useRef<HTMLDivElement>(null)
	const mainRef = useRef<HTMLDivElement>(null)
	const mobile = useMedia('(max-width:760px)')
	const headerHeight = mobile ? 300 : 610

	const [opened, setOpened] = useState<OpenedT>('menu')

	const [category, setCategory] = useState('')

	const [menu, setMenu] = useState<MenuT>([])
	const categories = useMemo(() => menu.map(({ name, slug }) => ({ name, slug })), [menu])
	const [error, setError] = useState(false)
	console.log(menu, categories)
	useEffect(() => {
		const getMenu = async () => {
			try {
				const result = await fetch('https://latini.heshe.dk/public/api/menu')
				if (!result.ok) throw new Error('Server error')
				const menu = (await result.json()) as MenuT
				setMenu(menu)
			} catch (err) {
				console.error(err)
				setError(true)
			}
		}
		getMenu()
	}, [])

	return (
		<CheckoutProvider>
			<BasketProvider>
				<UserStateProvider>
					<div
						ref={rootRef}
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
							ref={mainRef}
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
											<Categories categories={categories} currentCategory={category} />
										</Sidebar>
										<Sidebar opened={opened === 'basket'} side={'right'}>
											<Basket />
										</Sidebar>
									</AppBar>
									<Menu setCategory={setCategory} menu={menu} />
								</>
							) : (
								<>
									<Categories categories={categories} currentCategory={category} />
									<Menu setCategory={setCategory} menu={menu} />
									<Basket />
								</>
							)}
						</div>
					</div>
					<Ingredients />
					<Checkout />
				</UserStateProvider>
			</BasketProvider>
		</CheckoutProvider>
	)
})

export default App
