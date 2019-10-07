import React, { memo } from 'react'

const Close = memo<{ size?: number }>(({ size = 15 }) => (
	<svg viewBox="0 0 100 100" width={`${size}px`} height={`${size}px`} color="#a52121">
		<line x1="5" y1="115" x2="95" y2="-15" stroke="#a52121" strokeWidth="20" />
		<line x1="5" y1="-15" x2="95" y2="115" stroke="#a52121" strokeWidth="20" />
	</svg>
))

export default Close
