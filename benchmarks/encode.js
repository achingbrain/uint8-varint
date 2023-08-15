/* eslint-disable no-console */

/*
$ node benchmarks/append.js
$ npx playwright-test benchmarks/append.js --runner benchmark
*/

import Benchmark from 'benchmark'
import accessor from 'byte-access'
import { LongBits } from 'longbits'
import { allocUnsafe } from 'uint8arrays/alloc'
import { encode, encodingLength } from '../dist/src/index.js'

const suite = new Benchmark.Suite()

const testCases = [{ name: 'xs', value: 63 }, { name: 'sm', value: 1023 }, { name: 'md', value: 65535 }, { name: 'lg', value: 4294967295 }, { name: 'xl', value: 1125899906842623 }]

for (const { name, value } of testCases) {
  const length = encodingLength(value)
  const buf = allocUnsafe(length)

  suite
    .add(`varint - ${name}`, () => {
      const MSB = 0x80
      const REST = 0x7F
      const MSBALL = ~REST
      const INT = Math.pow(2, 31)

      let _value = value
      let _offset = 0

      const access = accessor(buf)

      while (_value >= INT) {
        access.set(_offset++, (_value & 0xFF) | MSB)
        _value /= 128
      }

      while (_value & MSBALL) {
        access.set(_offset++, (_value & 0xFF) | MSB)
        _value >>>= 7
      }
      access.set(_offset, _value | 0)
    })
    .add(`longbits - ${name}`, () => {
      LongBits.fromNumber(value).toBytes(buf)
    })
    .add(`lib - ${name}`, () => {
      encode(value, buf)
    })
}

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
