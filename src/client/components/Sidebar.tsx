import React, { memo } from 'react'
import { css } from '@emotion/core'
import { useSpring, animated } from '@react-spring/web'

type SidebarT = {
	opened: boolean
	side: 'left' | 'right'
	children: React.ReactElement
}

const Sidebar = memo<SidebarT>(({ opened, children, side }) => {
	const spring = useSpring({
		transform: `translateX(${opened ? 0 : side === 'right' ? 100 : -100}%)`,
		config: { tension: 240, friction: 20 },
	})
	return (
		<animated.div
			style={spring}
			css={css`
				z-index: 5;
				position: absolute;
				padding: 0 10px;
				${side}: 0;
				height: calc(100% - 20px);
				visibility: hidden;
				& > * {
					visibility: visible;
				}
			`}
		>
			{children}
		</animated.div>
	)
})

export default Sidebar
