import React, { FC, useState, useCallback, useEffect } from 'react'
import { css } from '@emotion/core'
import { useTransition, animated } from '@react-spring/web'

import Close from 'components/icons/Close'
import CheckMark from 'components/icons/CheckMark'
import themeColors from 'themeColors'

const Dialog: FC<{ close: () => void; innerCss?: string; okButton?: boolean }> = ({
	close,
	children,
	innerCss = '',
	okButton = false,
}) => {
	const [opened, setOpened] = useState(true)
	const onClose = useCallback(() => setOpened(false), [])

	const transition = useTransition(opened, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		onRest: !opened ? close : undefined,
		config: { duration: 150 },
	})
	useEffect(
		() => () => {
			if (!opened) close()
		},
		[close, opened],
	)
	return (
		<>
			{transition.map(
				({ item, props: spring, key }) =>
					item && (
						<animated.div
							style={spring}
							key={key}
							css={css`
								z-index: 6;
								top: 0;
								left: 0;
								height: 100%;
								width: 100%;
								position: fixed;
								display: flex;
								justify-content: center;
								align-items: center;
								background: transparent;
								font-family: 'Calibri', sans-serif;
								overflow: auto;
								padding: 20px;
								box-sizing: border-box;
								visibility: ${opened ? 'visible' : 'hidden'};
								backdrop-filter: blur(10px) saturate(125%);
								${innerCss};
							`}
							onClick={onClose}
						>
							<div
								onClick={e => e.stopPropagation()}
								css={css`
									visibility: visible;
									position: relative;
									border-radius: 20px;
									border: solid 1px ${themeColors.weak};
									max-width: 642px;
									@media (max-width: 600px) {
										max-width: 100%;
									}
									box-sizing: border-box;
									padding: 20px;
									margin: auto;
									background: white;
									box-shadow: 1px 1px 10px 0px #656565ab;
								`}
							>
								{children}
								<button
									css={css`
										position: absolute;
										top: 10px;
										right: 10px;
										cursor: pointer;
										-webkit-appearance: none;
										background: transparent;
										border: none;
										padding: 0;
									`}
									onClick={onClose}
								>
									<Close />
								</button>
								{okButton && (
									<button
										css={css`
											cursor: pointer;
											background-color: #1bad1b;
											transition: background-color 0.1s;
											&:hover,
											&:focus {
												background-color: #0fba0f;
											}
											padding: 5px 13px 5px 10px;
											font-family: 'Calibri', sans-serif;
											border-radius: 40px;
											border: none;
											display: block;
											margin: 20px auto 0 auto;
											color: white;
											box-shadow: 0 0 7px 4px rgba(0, 0, 0, 0.2);
										`}
										onClick={onClose}
									>
										<CheckMark />
										<span
											css={css`
												margin-left: 5px;
											`}
										>
											OK
										</span>
									</button>
								)}
							</div>
						</animated.div>
					),
			)}
		</>
	)
}

export default Dialog
