import React, { memo, Fragment } from 'react'
import { css } from '@emotion/core'
import { withContext } from '@rqm/react-tools'
import { lastOf } from '@rqm/tools'

import PlusIcon from 'components/icons/Plus'
import MinusIcon from 'components/icons/Minus'

import Delivery from 'components/Delivery'
import styles from 'styles'
import basketContext from 'state/basket/basketContext'
import formatPrice from 'utils/formatPrice'
import getOrderDetails from 'utils/getOrderDetails'
import themeColors from 'themeColors'

export type ExtraT = { name: string; price: number }
export type BasketItemT = {
	dialogOpened: boolean
	id: number
	price: number
	size: string
	category: string
	name: string
	defaults: string[]
	extras: ExtraT[]
	omitted: string[]
	added: string[]
}

const Basket = memo(
	withContext(
		basketContext,
		([basket, { removeItem, addItem }]) => ({ removeItem, addItem, basket }),
		({ removeItem, addItem, basket }) => {
			const { items, totalPrice } = getOrderDetails(basket)
			return (
				<div
					css={css`
						display: flex;
						flex-direction: column;
						width: 290px;
						min-width: 232px;
						${styles.sidebar}
						${styles.scrollbar}
						@media (max-width: 760px) {
							padding-right: 10px;
						}
					`}
				>
					<h2
						css={css`
							margin: 0;
							padding: 0 15px 5px 15px;
							${styles.title};
						`}
					>
						Indkøbskurv
					</h2>

					<div
						css={css`
							padding: 0 5px 0 15px;
							@media (min-width: 761px) {
								${styles.border('left')}
							}
						`}
					>
						<div
							css={css`
								@media (min-width: 761px) {
									border-top: 1px solid ${themeColors.border};
								}
								padding: 0 0 10px 0;
								display: flex;
								flex-direction: column;
							`}
						>
							{items.map(
								({
									ids,
									id,
									defaults,
									extras,
									omitted,
									added,
									name,
									price,
									size,
									category,
								}) => {
									return (
										<Fragment key={id}>
											<div
												css={css`
													display: flex;
													justify-content: space-between;
													padding: 10px 0 10px 15px;
													& p {
														margin: 0;
														font-size: 14px;
													}
												`}
											>
												<p>{`${ids.length} x${category} ${name}(${size})`}</p>
												<div
													css={css`
														& > button {
															border: none;
															background: transparent;
															padding: 0;
															margin-left: 5px;
															cursor: pointer;
															font-size: 0;
															outline: none;
														}
														margin-left: 5px;
														font-weight: bold;
														display: flex;
														align-items: center;
													`}
												>
													<p>{formatPrice(price * ids.length)}</p>
													<button
														onClick={() =>
															addItem({
																defaults,
																extras,
																omitted,
																added,
																name,
																price,
																size,
																category,
																dialogOpened: false,
															})
														}
													>
														<PlusIcon />
													</button>
													<button onClick={() => removeItem(lastOf(ids))}>
														<MinusIcon />
													</button>
												</div>
											</div>
											<div
												css={css`
													font-size: 12px;
													padding-left: 15px;
													& > p {
														margin: 0 3px;
													}
												`}
											>
												{[
													{ ingredients: omitted, color: 'red' },
													{ ingredients: added, color: 'green' },
												].map(({ ingredients, color }) =>
													ingredients.map(ingredient => (
														<p
															css={css`
																color: ${color};
															`}
															key={ingredient}
														>{`+ ${ingredient}`}</p>
													)),
												)}
											</div>
										</Fragment>
									)
								},
							)}
							<Delivery totalPrice={totalPrice} />
						</div>
					</div>
				</div>
			)
		},
	),
)

export default Basket
