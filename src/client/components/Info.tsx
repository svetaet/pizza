import React, { memo } from 'react'
import { css } from '@emotion/core'

import themeColors from 'themeColors'

const hours = [
	{ days: 'Mandag - Torsdag', hours: { pickup: '10.30-22.00', delivery: '10.30-22.00' } },
	{ days: 'Fredag', hours: { pickup: '10.30-23.00', delivery: '10.30-23.00' } },
	{ days: 'Lørdag', hours: { pickup: '11.00-24.00', delivery: '11.00-24.00' } },
	{ days: 'Søndag', hours: { pickup: '12.00-22.00', delivery: '12.00-22.00' } },
]

const options = [
	{ name: 'Restaurant', type: 'pickup' },
	{ name: 'Levering', type: 'delivery' },
]

const Info = memo<{ type: 'delivery' | 'pickup' }>(props => (
	<div
		css={css`
			padding-right: 5px;
			& > p {
				margin: 3px 0;
			}
			& > h4 {
				font-size: 20px;
				margin: 10px 0 7px 0;
			}
			& > h3 {
				margin: 7px 0;
				font-size: 21px;
			}
		`}
	>
		<h3>Restaurant information</h3>
		<h4>Adresse</h4>
		<p>Hovedgaden 67</p>
		<p
			css={css`
				color: ${themeColors.weak};
			`}
		>
			4520 Svinninge
		</p>

		<h4>Åbningstider</h4>
		{options.map(({ name, type }) => (
			<span
				key={type}
				css={css`
					margin: 0 5px 0 0;
					font-size: 18px;
					text-decoration: ${type === props.type ? 'underline' : 'none'};
					color: ${type === props.type ? 'black' : themeColors.weak};
				`}
			>
				{name}
			</span>
		))}
		<div>
			{hours.map(({ days, hours }) => (
				<div
					key={days}
					css={css`
						display: flex;
						justify-content: space-between;
						margin: 0 0 3px 0;
					`}
				>
					<p
						css={css`
							margin: 0;
						`}
					>
						{days}
					</p>
					<p
						css={css`
							color: ${themeColors.weak};
							margin: 0 0 0 5px;
						`}
					>
						{hours[props.type]}
					</p>
				</div>
			))}
		</div>
		<p
			css={css`
				font-size: 14px;
				padding-top: 30px;
			`}
		>
			{
				'Hvis du har allergi, så kontakt gerne restauranten. Restauranten kan sørge for at give dig den korrekte information'
			}
		</p>
	</div>
))

export default Info
