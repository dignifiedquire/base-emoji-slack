'use strict'

const baseEmoji = require('base-emoji')

exports.jbenetSpecial = (names) => {
  return names.replace(/100/g, 'shit')
}

exports.toBaseEmoji = (input) => {
  let buf
  if (input.startsWith('0x')) {
    input = input.slice(2)
  }
  return exports.jbenetSpecial(baseEmoji.toNames(Buffer.from(input, 'hex')))
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
    console.log('return: %s', emojis)
    return {
      text: emojis,
      attachments: []
    }
  }
}
