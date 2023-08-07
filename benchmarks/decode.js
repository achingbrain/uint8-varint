/* eslint-disable no-console */

/*
$ node benchmarks/append.js
$ npx playwright-test benchmarks/append.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { LongBits } from 'longbits'
import { decode, encode } from '../dist/src/index.js'

const suite = new Benchmark.Suite()

const testCases = [{ name: 'xs', value: 63 }, { name: 'sm', value: 1023 }, { name: 'md', value: 65535 }, { name: 'lg', value: 4294967295 }, { name: 'xl', value: 1125899906842623 }]

for (const { name, value } of testCases) {
  const buf = encode(value)
  suite
    .add(`longbits - ${name}`, () => {
      LongBits.fromBytes(buf).toNumber(true)
    })
    .add(`lib - ${name}`, () => {
      decode(buf)
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
