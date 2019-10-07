import React from 'react'

import themeColors from 'themeColors'

const Add = ({ size = 15 }) => (
	<svg viewBox="0 0 10 10" width={`${size}px`} height={`${size}px`}>
		<line
			x1="5"
			y1="0"
			x2="5"
			y2="10"
			stroke={themeColors.weak}
			strokeWidth="1"
			strokeLinecap="round"
		/>
		<line
			x1="0"
			y1="5"
			x2="10"
			y2="5"
			stroke={themeColors.weak}
			strokeWidth="1"
			strokeLinecap="round"
		/>
	</svg>
)

export default Add
