import React, { memo, useRef } from 'react'
import { Router } from 'react-router-dom'
import { css } from '@emotion/core'

import Header, { headerHeight } from 'components/Header'
import Categories from 'components/Categories'
import Menu from 'components/Menu'
import Basket from 'components/Basket'
import Ingredients from 'components/Ingredients'
import background from 'images/background.jpg'
import BasketProvider from 'state/basket/BasketProvider'
import history from '../history'

const App = memo(() => {
	const rootRef = useRef<HTMLDivElement>(null)
	return (
		<Router history={history}>
			<BasketProvider>
				<div
					ref={rootRef}
					css={css`
						will-change: transform;
						width: 100vw;
						height: 100vh;
						overflow: auto;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-family: 'Calibri', sans-serif;

						background-image: url(${background});
						background-position: top center;
						background-size: auto ${headerHeight}px;
						background-repeat: no-repeat;
						background-attachment: local;
					`}
				>
					<div
						css={css`
							text-align: left;
							box-sizing: border-box;
							width: 100%;
							padding: 0 10px;
							max-width: 1100px;
						`}
					>
						<Header />
						<div
							css={css`
								display: flex;
							`}
						>
							<Categories />
							<Menu rootRef={rootRef} />
							<Basket />
						</div>
					</div>
				</div>
				<Ingredients />
			</BasketProvider>
		</Router>
	)
})

export default App
