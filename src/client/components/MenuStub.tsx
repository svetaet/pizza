import React, { Fragment, FC } from 'react'
import { css } from '@emotion/core'
import { categoryHeight, itemHeight } from 'components/Menu'

import styles from 'styles'

const Stub = () => (
	<div
		css={css`
			${styles.stub}
			height: 100%;
		`}
	/>
)

const CategoryStub: FC = ({ children }) => (
	<div
		css={css`
			box-sizing: border-box;
			padding: 20px 15px 13px 13px;
			height: ${categoryHeight}px;
		`}
	>
		{children}
	</div>
)

const ItemStub: FC = ({ children }) => (
	<div
		css={css`
			padding: 13px 15px 13px 45px;
			box-sizing: border-box;
			height: ${itemHeight}px;
		`}
	>
		{children}
	</div>
)

const MenuStub: FC = () => (
	<>
		{[0, 1].map(i => (
			<Fragment key={i}>
				<CategoryStub>
					<Stub />
				</CategoryStub>
				{[0, 1, 2, 3].map(i => (
					<ItemStub key={i}>
						<Stub />
					</ItemStub>
				))}
			</Fragment>
		))}
	</>
)

export default MenuStub
