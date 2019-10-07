import React, { memo } from 'react'

const Minus = memo<{ size?: number }>(({ size = 15 }) => (
	<svg viewBox="0 0 100 100" width={`${size}px`} height={`${size}px`} color="red">
		<circle r="40" cx="50" cy="50" fill="none" stroke="red" strokeWidth="8"></circle>

		<line x1="30" y1="50" x2="70" y2="50" stroke="red" strokeWidth="8" strokeLinecap="round" />
	</svg>
))

export default Minus
