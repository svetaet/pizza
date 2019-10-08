import React, { memo } from 'react'
import { css } from '@emotion/core'
import logo from 'images/logo.png'

export const headerHeight = 610

const Header = memo(() => {
	return (
		<div
			css={css`
				position: relative;
				height: ${headerHeight}px;
				margin-bottom: 80px;
				@media (max-width: 900px) {
					margin-bottom: 8vw;
				}
			`}
		>
			<img
				src={logo}
				css={css`
					width: 170px;
					position: absolute;
					left: 0;
					top: 20px;
				`}
			/>
			<div
				css={css`
					position: absolute;
					right: 0;
					display: flex;
					flex-wrap: wrap;
					color: white;
					max-width: calc(100% - 180px);
					& > p {
						margin-right: 20px;
						font-size: 16px;
					}
				`}
			>
				<p>
					Den gennemsnitlige leveringstid er <b>20 &ndash; 30 min</b> &ensp;&rsaquo;
				</p>
				<p>
					Åben i dag: <b>10.30&ndash;22.00</b> &ensp;&rsaquo;
				</p>
			</div>
			<h1
				css={css`
					text-align: center;
					padding: 10px 0;
					background-color: white;
					border-radius: 4px;
					white-space: nowrap;
					font-size: 72px;
					// color: rgba(168, 0, 13, 0.502);
					color: #d6a1a2;
					font-weight: bold;
					line-height: 1.2;
					position: absolute;
					margin: 0;
					bottom: 0;
					width: 100%;
					transform: translateY(50%);
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
					@media (max-width: 900px) {
						font-size: 8vw;
					}
				`}
			>
				LATINI PIZZA | SVINNINGE
			</h1>
		</div>
	)
})

export default Header
