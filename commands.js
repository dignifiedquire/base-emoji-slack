'use strict'

const baseEmoji = require('base-emoji')

const IN_CHANNEL = 'in_channel'

exports.jbenetSpecial = (names) => {
  return names.replace(/100/g, 'shit')
}

exports.toBaseEmoji = (input) => {
  let buf
  if (input.startsWith('0x')) {
    input = input.slice(2)
  }

  buf = Buffer.from(input, 'hex')
  if (buf.toString('hex') !== input) {
    buf = Buffer.from(input, 'utf8')
  }

  return exports.jbenetSpecial(baseEmoji.toNames(buf))
}

exports.createErrorAttachment = (error) => ({
  color: 'danger',
  text: `*Error*:\n${error.message}`,
  mrkdwn_in: ['text']
})

exports.slackCommand = (slackToken) => {
  return (body) => {
    if (slackToken !== body.token) {
      return {
        text: '',
        attachments: [
          exports.createErrorAttachment(new Error('Invalid token'))
        ]
      }
    }

    const emojis = exports.toBaseEmoji(body.text)

    return {
      response_type: IN_CHANNEL,
      text: emojis,
      attachments: []
    }
  }
}
