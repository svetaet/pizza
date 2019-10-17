import React, { memo } from 'react'
import { css } from '@emotion/core'

import styles from 'styles'
import themeColors from 'themeColors'
import CategoriesStub from 'components/CategoriesStub'

type CategoryT = { name: string; slug: string }

const scrollToCategory = (slug: string) => {
	const anchor = document.getElementById(slug)
	if (anchor) anchor.scrollIntoView({ behavior: 'smooth' })
}

type ItemP = {
	category: CategoryT
	current: boolean
}
const Item = memo<ItemP>(({ category, current }) => (
	<p
		css={css`
			color: ${themeColors.weak};
			text-decoration: none;
			margin: 7px 0;
		`}
	>
		<span
			onClick={() => scrollToCategory(category.slug)}
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
			{category.name}
		</span>
	</p>
))

type CategoriesP = {
	categories: CategoryT[]
	currentCategory: string
}
const Categories = memo<CategoriesP>(({ categories, currentCategory }) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				min-width: 135px;
				@media (max-width: 760px) {
					padding-left: 10px;
				}
				${styles.sidebar}
				${styles.scrollbar}
			`}
		>
			<h2
				css={css`
					padding: 0 0 5px 0px;
					margin: 0;
					${styles.title};
				`}
			>
				Kategorier
			</h2>
			<div
				css={css`
					@media (min-width: 761px) {
						${styles.border('top', 'right')}
					}
					display: flex;
					flex-direction: column;
					padding: 0 15px 0 0;
				`}
			>
				{categories.length ? (
					categories.map(category => (
						<Item
							key={category.slug}
							category={category}
							current={currentCategory === category.slug}
						/>
					))
				) : (
					<CategoriesStub />
				)}
			</div>
		</div>
	)
})

export default Categories
