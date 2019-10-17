import { useState, useEffect } from 'react'
import { throttle } from '@rqm/tools'

const useMedia = (query: string) => {
	const [matches, setMatches] = useState(() => matchMedia(query).matches)
	useEffect(() => {
		const handler = throttle(() => setMatches(matchMedia(query).matches))
		window.addEventListener('resize', handler)
		return () => window.removeEventListener('resize', handler)
	}, [query])
	return matches
}

export default useMedia
