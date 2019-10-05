/*eslint-disable */

// active new service worker as long as it's installed
workbox.core.skipWaiting()
workbox.core.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

const siteUrl = 'localhost:3001'

const matchRoutes = ({ url: { pathname } }) => {
	const indexOfSiteUrl = pathname.indexOf(siteUrl)
	const route = pathname.slice(indexOfSiteUrl + indexOfSiteUrl.length)
	console.log(route)
	return true
}

workbox.routing.registerRoute(
	matchRoutes,
	new workbox.strategies.NetworkFirst()
)