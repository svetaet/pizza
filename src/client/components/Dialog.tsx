import React, { FC } from 'react'
import { css } from '@emotion/core'

import Close from 'components/icons/Close'
import themeColors from 'themeColors'

const Dialog: FC<{ close: () => void; innerCss?: string }> = ({
	close,
	children,
	innerCss = '',
}) => (
	<div
		css={css`
			top: 0;
			left: 0;
			position: fixed;
			width: 100vw;
			height: 100vh;
			display: grid;
			background: transparent;
			font-family: 'Calibri', sans-serif;
			overflow: auto;
			padding: 20px;
			box-sizing: border-box;
			${innerCss}
		`}
		onClick={close}
	>
		<div
			onClick={e => e.stopPropagation()}
			css={css`
				position: relative;
				border-radius: 20px;
				border: solid 1px ${themeColors.weak};
				max-width: 600px;
				@media (max-width: 640px) {
					max-width: calc(100vw - 120px);
				}
				padding: 20px;
				margin: auto;
				background: white;
				box-shadow: 1px 1px 10px 0px #656565ab;
			`}
		>
			{children}
			<div
				css={css`
					position: absolute;
					top: 14px;
					right: 14px;
					cursor: pointer;
				`}
				onClick={close}
			>
				<Close />
			</div>
		</div>
	</div>
)

export default Dialog
