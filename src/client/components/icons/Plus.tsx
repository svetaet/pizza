import React, { memo } from 'react'

const Plus = memo<{ size?: number }>(({ size = 15 }) => (
	<svg viewBox="0 0 100 100" width={`${size}px`} height={`${size}px`} color="green">
		<circle r="40" cx="50" cy="50" fill="none" stroke="green" strokeWidth="8"></circle>
		<line
			x1="50"
			y1="30"
			x2="50"
			y2="70"
			stroke="green"
			strokeWidth="8"
			strokeLinecap="round"
		/>
		<line
			x1="30"
			y1="50"
			x2="70"
			y2="50"
			stroke="green"
			strokeWidth="8"
			strokeLinecap="round"
		/>
	</svg>
))

export default Plus
