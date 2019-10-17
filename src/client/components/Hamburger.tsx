import React, { memo } from 'react'
import { css } from '@emotion/core'
import { useSprings, animated } from '@react-spring/web'

import themeColors from 'themeColors'

const hamburgerSpringConfigs = [
	[
		{ transform: 'rotate(0deg) translate(0%, 0%)' },
		{ width: '100%', opacity: 1 },
		{ transform: 'rotate(0deg) translate(0%, 0%)' },
	],
	[
		{ transform: 'rotate(45deg) translate(20%, 155%)' },
		{ width: '0%', opacity: 0 },
		{ transform: 'rotate(-45deg) translate(20%, -155%)' },
	],
]

interface HamburgerI {
	opened: boolean
}
const Hamburger = memo<HamburgerI>(({ opened }) => {
	const springConfig = hamburgerSpringConfigs[opened ? 1 : 0]

	const springs = useSprings(
		springConfig.length,
		springConfig.map(to => ({
			to,
			config: { tension: 240, friction: 20 },
		})),
	)

	return (
		<div
			tabIndex={2}
			css={css`
				width: 100%;
				height: 80%;
				margin: 10% 0;
				position: relative;
				outline: none;
				& span {
					background-color: ${themeColors.orange};
					display: block;
					position: absolute;
					left: 0;
					height: 20%;
					width: 100%;
					border-radius: 10% 10% 10% 10% / 50% 50% 50% 50%;
					&:nth-of-type(1) {
						top: 0;
					}
					&:nth-of-type(2) {
						top: 40%;
					}
					&:nth-of-type(3) {
						top: 80%;
					}
				}
			`}
		>
			{springs.map((spring, i) => (
				<animated.span style={spring} key={i} />
			))}
		</div>
	)
})

export default Hamburger
