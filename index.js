'use strict'

const Express = require('express')
const bodyParser = require('body-parser')

const { slackCommand } = require('./commands')

function main() {
  const app = new Express()
  app.use(bodyParser.urlencoded({extended: true}))

  const {
    SLACK_TOKEN: slackToken,
    PORT
  } = process.env

  if (!slackToken) {
    console.error('missing environment variables SLACK_TOKEN')
    process.exit(1)
  }

  const port = PORT || 80

  const cmd = slackCommand(slackToken)

  app.post('/', (req, res) => {
    console.log('body %s', req.body.text)

    res.json(cmd(req.body))
  })

  app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
  })
}

main()
