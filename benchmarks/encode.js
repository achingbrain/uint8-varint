/* eslint-disable no-console */

/*
$ node benchmarks/append.js
$ npx playwright-test benchmarks/append.js --runner benchmark
*/

import Benchmark from 'benchmark'
import accessor from 'byte-access'
import { LongBits } from 'longbits'
import { allocUnsafe } from 'uint8arrays/alloc'
import { unsigned } from '../dist/src/index.js'

const suite = new Benchmark.Suite()

suite
  .add('varint', () => {
    const MSB = 0x80
    const REST = 0x7F
    const MSBALL = ~REST
    const INT = Math.pow(2, 31)

    let value = 1024
    let offset = 0
    const buf = allocUnsafe(unsigned.encodingLength(value))

    const access = accessor(buf)

    while (value >= INT) {
      access.set(offset++, (value & 0xFF) | MSB)
      value /= 128
    }

    while (value & MSBALL) {
      access.set(offset++, (value & 0xFF) | MSB)
      value >>>= 7
    }
    access.set(offset, value | 0)
  })
  .add('longbits', () => {
    const value = 1024
    const offset = 0
    const buf = allocUnsafe(unsigned.encodingLength(value))

    LongBits.fromNumber(value).toBytes(buf, offset)
  })

suite
  // add listeners
  .on('error', (err) => {
    console.error(err)
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ async: true })
