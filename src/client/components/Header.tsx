import React, { memo } from 'react'
import { css } from '@emotion/core'

import logo from 'images/logo.png'
import background from 'images/background.jpg'
import useLazy from 'utils/useLazy'
import styles from 'styles'

const Header = memo<{ height: number }>(({ height }) => {
	const [bgSrc] = useLazy(background)
	const [logoSrc, loaded] = useLazy(logo)
	return (
		<div
			css={css`
				position: absolute;
				height: ${height}px;
				width: 100%;

				background-image: url(${bgSrc});
				background-size: cover;
			`}
		>
			<div
				css={css`
					position: relative;
					height: 100%;
					margin: 0 auto;
					max-width: 1100px;
					padding: 10px 10px 50px 10px;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: start;
					@media (max-width: 600px) {
						flex-direction: column;
					}
				`}
			>
				<img
					alt="logo"
					src={logoSrc}
					css={css`
						filter: ${loaded ? 'none' : 'blur(9px)'};
						width: 170px;
					`}
				/>
				<div
					css={css`
						display: flex;
						flex-wrap: wrap;
						color: white;
						& > p {
							margin: 10px 20px 0 0;
							shite-space: nowrap;
							@media (max-width: 760px) {
								margin-right: 0;
								font-size: 14px;
							}
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
						color: #d6a1a2;
						font-weight: bold;
						line-height: 1.2;
						position: absolute;
						margin: 0;
						bottom: 0;
						left: 20px;
						width: calc(100% - 40px);
						transform: translateY(50%);
						${styles.shadow};
						@media (max-width: 900px) {
							font-size: 7vw;
						}
					`}
				>
					LATINI PIZZA | SVINNINGE
				</h1>
			</div>
		</div>
	)
})

export default Header
