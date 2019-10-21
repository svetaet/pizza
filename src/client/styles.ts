import { css } from '@emotion/core'
import themeColors from 'themeColors'

type SidesT = 'top' | 'right' | 'bottom' | 'left'

export default {
	title: css`
		color: ${themeColors.orange};
		font-size: 24px;
		font-weight: bold;
		@media (max-width: 760px) {
			display: none;
		}
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
	`,
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
	shadow: css`
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	`,
	sidebar: css`
		box-sizing: border-box;
		position: sticky;
		top: 0;
		height: 100vh;
		@media (max-width: 760px) {
			height: auto;
			max-height: 100%;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			background: white;
		}
	`,
	stub: css`
		background: #eeeeee;
		border-radius: 5px;
	`,
	button: css`
		color: white;
		background: #79df26;
		border: none;
		margin: 0 auto;
		padding: 10px;
		display: block;
		text-transform: uppercase;
		cursor: pointer;
		font-size: 16px;
		text-align: center;
		text-decoration: none;
		&.disabled {
			cursor: unset;
			background: #c9c9c9;
		}
	`,
}
