'use strict'

const expect = require('chai').expect

const { toBaseEmoji } = require('./commands')

describe('base-emoji-slack', () => {
  it('toBaseEmoji', () => {
    expect(
      toBaseEmoji('hello')
    ).to.be.eql(
      ':droplet::dolphin::facepunch::facepunch::flashlight:'
    )

    expect(
      toBaseEmoji('0x00')
    ).to.be.eql(
      ':shit:'
    )

    expect(
      toBaseEmoji('0000000000000000003f1a83353afe551972f9fab155879340738ac4e1c1db58')
    ).to.be.eql(
      ':shit::shit::shit::shit::shit::shit::shit::shit::shit::bust_in_silhouette::banana::hatching_chick::bouquet::briefcase::zap::cookie::bamboo::four_leaf_clover::watch::whale2::pear::cookie::horse::mailbox::cactus::fried_shrimp::jack_o_lantern::purse::soccer::postal_horn::smile::cow2:'
    )
  })
})
