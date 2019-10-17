import React, { Fragment, FC } from 'react'
import { css } from '@emotion/core'

import styles from 'styles'

const Stub = () => (
	<p
		css={css`
			${styles.stub}
			margin: 7px 0;
			line-height: 29px;
		`}
	>
		&nbsp;
	</p>
)

const CategoriesStub: FC = () => (
	<>
		{[...Array(16)].map((u, i) => (
			<Stub key={i} />
		))}
	</>
)

export default CategoriesStub
