const api = async <T>({
	endpoint,
	onSuccess,
	onError,
	body,
}: {
	endpoint: string
	onSuccess: (res: T) => void
	onError?: (err: Error) => void
	body?: { [p: string]: any }
}) => {
	try {
		const result = await fetch(`https://latini.heshe.dk/public/api/${endpoint}`, {
			method: body ? 'POST' : 'GET',
			// headers: body
			// 	? {
			// 			'Content-Type': 'application/json',
			// 	  }
			// 	: undefined,
			body: body ? JSON.stringify(body) : undefined,
		})
		if (!result.ok) throw new Error('Server error')
		const parsed = (await result.json()) as T
		onSuccess(parsed)
		return parsed
	} catch (err) {
		console.error(err)
		onError && onError(err)
	}
}

export default api
