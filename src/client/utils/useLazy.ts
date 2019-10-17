import { useState, useEffect } from 'react'

const useLazy = (img: { src: string; preSrc: string }) => {
	const [src, setSrc] = useState(img.preSrc)
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		const image = new Image()
		image.onload = () => {
			setLoaded(true)
			setSrc(img.src)
		}
		image.src = img.src
	}, [img.src])
	return [src, loaded] as [string, boolean]
}

export default useLazy
