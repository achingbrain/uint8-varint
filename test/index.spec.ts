/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { Uint8ArrayList } from 'uint8arraylist'
import * as varint from '../src/index.js'

describe('varint', () => {
  describe('signed', () => {
    it('should round trip signed values in a Uint8Array', () => {
      const value = 12345
      const encodingLength = 2

      expect(varint.signed.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8Array(encodingLength)
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })

    it('should round trip negative signed values in a Uint8Array', () => {
      const value = -12345
      const encodingLength = 10

      expect(varint.signed.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8Array(encodingLength)
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })

    it('should round trip signed values in a Uint8ArrayList', () => {
      const value = 12345
      const encodingLength = 2

      expect(varint.signed.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8ArrayList(
        new Uint8Array(encodingLength)
      )
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })

    it('should round trip negative signed values in a Uint8ArrayList', () => {
      const value = -12345
      const encodingLength = 10

      expect(varint.signed.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8ArrayList(
        new Uint8Array(encodingLength)
      )
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })
  })

  describe('unsigned', () => {
    it('should round trip unsigned values in a Uint8Array', () => {
      const value = 12345
      const encodingLength = 2

      expect(varint.unsigned.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8Array(encodingLength)
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })

    it('should round trip unsigned values in a Uint8ArrayList', () => {
      const value = 12345
      const encodingLength = 2

      expect(varint.unsigned.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8ArrayList(
        new Uint8Array(encodingLength)
      )
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })
  })

  describe('zigzag', () => {
    it('should round trip zigzag values in a Uint8Array', () => {
      const value = 12345
      const encodingLength = 3

      expect(varint.zigzag.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8Array(encodingLength)
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })

    it('should round trip zigzag values in a Uint8ArrayList', () => {
      const value = 12345
      const encodingLength = 3

      expect(varint.zigzag.encodingLength(value)).to.equal(encodingLength)

      const buf = new Uint8ArrayList(
        new Uint8Array(encodingLength)
      )
      varint.signed.encode(value, buf)
      expect(varint.signed.decode(buf)).to.equal(value)
    })
  })
})
