import React, { memo, useCallback } from 'react'
import { css } from '@emotion/core'
import { withRouter } from 'react-router-dom'

import menu, { routes } from 'constants/menu'
import styles from 'styles'
import themeColors from 'themeColors'

type ItemP = {
	path: string
	category: string
	current: boolean
	scrollToCategory: (path: string) => void
}
const Item = memo<ItemP>(({ path, category, current, scrollToCategory }) => (
	<p
		css={css`
			color: ${themeColors.weak};
			text-decoration: none;
			margin: 7px 0;
		`}
	>
		<span
			key={path}
			onClick={() => scrollToCategory(path)}
			css={css`
				line-height: 29px;
				cursor: pointer;
				${current
					? `
						padding-bottom: 5px;
						border-bottom: solid 2px black;
						color: black;
				`
					: ''}
			`}
		>
			{category}
		</span>
	</p>
))

const Categories = memo(
	withRouter(({ location: { pathname } }) => {
		const scrollToCategory = useCallback((path: string) => {
			if (routes.includes(path)) {
				const anchor = document.getElementById(path)
				if (anchor) anchor.scrollIntoView({ behavior: 'smooth' })
			}
		}, [])
		return (
			<div
				css={css`
					display: flex;
					flex-direction: column;
					position: sticky;
					top: 30px;
					height: 600px;
				`}
			>
				<h2
					css={css`
						padding-left: 15px;
						margin: 0;
						padding-bottom: 5px;
						${styles.title};
					`}
				>
					Kategorier
				</h2>
				<div
					css={css`
						${styles.border('top', 'right')}
						display: flex;
						flex-direction: column;
						padding: 0 15px 70px 15px;
					`}
				>
					{menu.map(({ category, path }) => (
						<Item
							scrollToCategory={scrollToCategory}
							key={path}
							path={path}
							category={category}
							current={pathname === path}
						/>
					))}
				</div>
			</div>
		)
	}),
)

export default Categories
