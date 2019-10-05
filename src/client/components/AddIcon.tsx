import React from 'react'

import themeColors from 'themeColors'

const AddIcon = () => (
	<svg viewBox="0 0 100 100" width="15px" height="15px">
		<line
			x1="50"
			y1="0"
			x2="50"
			y2="100"
			stroke={themeColors.weak}
			strokeWidth="10"
			strokeLinecap="round"
		/>
		<line
			x1="0"
			y1="50"
			x2="100"
			y2="50"
			stroke={themeColors.weak}
			strokeWidth="10"
			strokeLinecap="round"
		/>
	</svg>
)

export default AddIcon
