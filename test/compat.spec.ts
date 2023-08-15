/* eslint-env mocha */

import { expect } from 'aegir/chai'
import varint from 'varint'
import * as uint8varint from '../src/index.js'

describe('varint', () => {
  it('compat', () => {
    expect(uint8varint.encode(1))
      .to.equalBytes(varint.encode(1))

    expect(uint8varint.encode(1024))
      .to.equalBytes(varint.encode(1024))

    expect(uint8varint.encode(9812938912312))
      .to.equalBytes(varint.encode(9812938912312))
  })
})
