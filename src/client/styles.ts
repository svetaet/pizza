import { css } from '@emotion/core'
import themeColors from 'themeColors'

type SidesT = 'top' | 'right' | 'bottom' | 'left'

export default {
	title: css`
		color: ${themeColors.orange};
		font-size: 24px;
		font-weight: bold;
	`,
	border: (...sides: SidesT[]) => {
		const getSidePx = (side: SidesT) => (sides.includes(side) ? 1 : 0)
		const sidesIncludes = (...search: SidesT[]) => search.some(side => sides.includes(side))

		let borderStyle = 'position: relative;'

		if (sidesIncludes('left', 'right'))
			borderStyle += `
			&:before {
				content: '';
				position: absolute;
				display: block;
				z-index: -1;
				left: 0;
				top: 15px;
				width: calc(100% - 2px);
				height: calc(100% - 30px);
				border-width: 0px ${getSidePx('right')}px 0px ${getSidePx('left')}px;
				border-style: solid;
				border-color: ${themeColors.border};
			}
		`

		if (sidesIncludes('top', 'bottom'))
			borderStyle += `
			&:after {
				content: '';
				position: absolute;
				display: block;
				z-index: -1;
				top: 0;
				left: 15px;
				width: calc(100% - 30px);
				height: 100%;
				border-width: ${getSidePx('top')}px 0px ${getSidePx('bottom')}px 0px;
				border-style: solid;
				border-color: ${themeColors.border};
			}
		`
		return css(borderStyle)
	},
	scrollbar: css`
		overflow: auto;
		// &::-webkit-scrollbar {
		// 	width: 8px;
		// }
		// &::-webkit-scrollbar-track {
		// 	background: transparent;
		// }

		// &::-webkit-scrollbar-thumb {
		// 	background-color: darkgrey;
		// 	border: solid 2px white;
		// 	border-radius: 2px;
		// }
	`,
}
