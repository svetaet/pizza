import React from 'react'
import { render, hydrate } from 'react-dom'
import { hot } from 'react-hot-loader/root'
import App from 'components/App'
import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

const root = document.getElementById('root')

if (process.env.NODE_ENV === 'production') {
	hydrate(<App />, root)

	// if ('serviceWorker' in navigator) {
	// 	window.addEventListener('load', () => {
	// 		navigator.serviceWorker.register('/service-worker.js')
	// 	})
	// }
} else {
	const HotApp = hot(App)
	render(<HotApp />, root)
}
