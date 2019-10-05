import express from 'express'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from 'components/App'
import path from 'path'
import fs from 'fs'
import gzip from 'express-static-gzip'

let templateStart: string, templateEnd: string

fs.readFile(path.resolve('./dist/template.html'), {}, (err, data) => {
	if (err) throw err
	else {
		const template = data.toString()
		const rootBegin = template.indexOf('root') + 6
		templateStart = template.slice(0, rootBegin)
		templateEnd = template.slice(rootBegin)
	}
})

const app = express()

app.use('/', gzip('dist/client'))
app.get('/**', (req, res, next) => {
	try {
		const context = {}
		const stream = renderToNodeStream(
			<StaticRouter context={context} location={req.url}>
				<App />
			</StaticRouter>,
		)
		res.write(templateStart)
		stream.pipe(
			res,
			{ end: false },
		)
		stream.on('end', (): void => {
			res.end(templateEnd)
			next()
		})
	} catch (err) {
		console.log(err)
		res.status(500).send('internal server error')
		next(err)
	}
})

app.listen(3001, (): void => console.log('running on 3001'))
