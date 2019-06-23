import express from 'express'

const app = express()

app.get('/', (req, res) => {
  let ip = ''
  const prefix = '::ffff:'
  const resolved =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress

  ip = resolved
  if (ip.includes(prefix)) {
    ip = resolved.replace(prefix, '')
  }

  if (typeof req.query.text !== 'undefined') {
    res.setHeader('Content-Type', 'text/plain')
    return res.end(ip)
  }

  return res.json({ ip })
})

export default app
