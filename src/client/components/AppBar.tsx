import React, { memo } from 'react'
import { css } from '@emotion/core'

import themeColors from 'themeColors'
import styles from 'styles'

import Hamburger from 'components/Hamburger'
import Cart from 'components/icons/Cart'

export type OpenedT = 'basket' | 'categories' | 'menu'

type AppBarT = {
	opened: OpenedT
	setOpened: (opened: OpenedT) => void
	children: React.ReactNode
}

const titles = {
	menu: 'Menukort',
	categories: 'Kategorier',
	basket: 'Indkøbskurv',
}

const AppBar = memo<AppBarT>(({ opened, setOpened, children }) => {
	const handleClick = (openedElement: OpenedT) =>
		opened === openedElement ? () => setOpened('menu') : () => setOpened(openedElement)
	return (
		<div
			css={css`
				position: sticky;
				z-index: 5;
				top: 10px;
				padding: 5px 10px;
				border-radius: 5px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				${styles.shadow};
				background: white;
			`}
			// background-color: #ffffff00;
			// backdrop-filter: blur(10px) saturate(125%);
			onClick={e => e.stopPropagation()}
		>
			<div
				css={css`
					width: 40px;
					height: 40px;
					cursor: pointer;
				`}
				onClick={handleClick('categories')}
			>
				<Hamburger opened={opened === 'categories'} />
			</div>

			<h2
				css={css`
					margin: 0;
					color: ${themeColors.orange};
				`}
			>
				{titles[opened]}
			</h2>

			<div
				css={css`
					width: 36px;
					height: 36px;
					cursor: pointer;
				`}
				onClick={handleClick('basket')}
			>
				<Cart />
			</div>

			<div
				css={css`
					position: absolute;
					width: calc(100% + 20px);
					padding: 10px 0;
					box-sizing: border-box;
					height: calc(100vh - 60px);
					top: 100%;
					left: -10px;
					overflow: hidden;
					visibility: hidden;
				`}
			>
				{children}
			</div>
		</div>
	)
})

export default AppBar
