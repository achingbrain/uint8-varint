/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { Uint8ArrayList } from 'uint8arraylist'
import * as varint from '../src/index.js'

describe('uint8-varint', () => {
  it('should round trip unsigned values in a Uint8Array', () => {
    const value = 12345
    const encodingLength = 2

    expect(varint.encodingLength(value)).to.equal(encodingLength)

    const buf = new Uint8Array(encodingLength)
    varint.encode(value, buf)
    expect(varint.decode(buf)).to.equal(value)
  })

  it('should round trip unsigned values in a Uint8ArrayList', () => {
    const value = 12345
    const encodingLength = 2

    expect(varint.encodingLength(value)).to.equal(encodingLength)

    const buf = new Uint8ArrayList(
      new Uint8Array(encodingLength)
    )
    varint.encode(value, buf)
    expect(varint.decode(buf)).to.equal(value)
  })

  it('fuzz test', () => {
    let expected
    let encoded

    for (let i = 0, len = 100; i < len; ++i) {
      expected = randint(0x7FFFFFFF)
      encoded = varint.encode(expected)
      const data = varint.decode(encoded)
      expect(expected).to.equal(data, 'fuzz test: ' + expected.toString())
      expect(varint.encodingLength(expected)).to.equal(encoded.byteLength)
    }
  })

  it('test single byte works as expected', () => {
    const buf = new Uint8Array(2)
    buf[0] = 172
    buf[1] = 2
    const data = varint.decode(buf)
    expect(data).to.equal(300, 'should equal 300')
  })

  it('test encode works as expected', () => {
    expect(varint.encode(300)).to.equalBytes([0xAC, 0x02])
  })

  it('test decode single bytes', () => {
    const expected = randint(parseInt('1111111', 2))
    const buf = new Uint8Array(1)
    buf[0] = expected
    const data = varint.decode(buf)
    expect(data).to.equal(expected)
  })

  it('test decode multiple bytes with zero', () => {
    const expected = randint(parseInt('1111111', 2))
    const buf = new Uint8Array(2)
    buf[0] = 128
    buf[1] = expected
    const data = varint.decode(buf)
    expect(data).to.equal(expected << 7)
  })

  it('encode single byte', () => {
    const expected = randint(parseInt('1111111', 2))
    expect(varint.encode(expected)).to.equalBytes([expected])
  })

  it('encode multiple byte with zero first byte', () => {
    const expected = 0x0F00
    expect(varint.encode(expected)).to.equalBytes([0x80, 0x1E])
  })

  it('big integers', () => {
    const bigs = []
    for (let i = 32; i <= 53; i++) {
      (function (i) {
        bigs.push(Math.pow(2, i) - 1)
      })(i)
    }

    bigs.forEach(function (n) {
      const data = varint.encode(n)
      expect(varint.decode(data)).to.equal(n)
      expect(varint.decode(data)).to.not.equal(n - 1)
    })
  })

  it('fuzz test - big', () => {
    let expected
    let encoded

    const MAX_INTD = Number.MAX_SAFE_INTEGER
    const MAX_INT = Math.pow(2, 31)

    for (let i = 0, len = 100; i < len; ++i) {
      expected = randint(MAX_INTD - MAX_INT) + MAX_INT
      encoded = varint.encode(expected)
      const data = varint.decode(encoded)
      expect(expected).to.equal(data, 'fuzz test: ' + expected.toString())
    }
  })

  it('encodingLength', () => {
    for (let i = 0; i <= 53; i++) {
      const n = Math.pow(2, i) - 1
      expect(varint.encode(n).length).to.equal(varint.encodingLength(n))
    }
  })

  it('buffer too short', () => {
    const buffer = varint.encode(9812938912312)

    let l = buffer.length
    while (l-- > 0) {
      const index = l
      expect(() => {
        varint.decode(buffer.slice(0, index))
      }).to.throw(RangeError)
    }
  })

  it('buffer too long', () => {
    const buffer = Uint8Array.from(
      Array.from({ length: 150 }, function () { return 0xff })
        .concat(Array.from({ length: 1 }, function () { return 0x1 }))
    )

    expect(() => {
      const val = varint.decode(buffer)
      varint.encode(val)
    }).to.throw(RangeError)
  })

  function randint (range: number): number {
    return Math.floor(Math.random() * range)
  }
})
