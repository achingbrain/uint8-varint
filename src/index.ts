import type { Uint8ArrayList } from 'uint8arraylist'
import accessor from 'byte-access'

const MSB = 0x80
const REST = 0x7F
const MSBALL = ~REST
const INT = Math.pow(2, 31)
const N1 = Math.pow(2, 7)
const N2 = Math.pow(2, 14)
const N3 = Math.pow(2, 21)
const N4 = Math.pow(2, 28)
const N5 = Math.pow(2, 35)
const N6 = Math.pow(2, 42)
const N7 = Math.pow(2, 49)
const N8 = Math.pow(2, 56)
const N9 = Math.pow(2, 63)

export const unsigned = {
  encodingLength  (value: number): number {
    if (value < N1) {
      return 1
    }

    if (value < N2) {
      return 2
    }

    if (value < N3) {
      return 3
    }

    if (value < N4) {
      return 4
    }

    if (value < N5) {
      return 5
    }

    if (value < N6) {
      return 6
    }

    if (value < N7) {
      return 7
    }

    if (value < N8) {
      return 8
    }

    if (value < N9) {
      return 9
    }

    return 10
  },

  encode (value: number, buf?: Uint8ArrayList | Uint8Array, offset = 0): Uint8ArrayList | Uint8Array {
    if (Number.MAX_SAFE_INTEGER && value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError('Could not encode varint')
    }

    if (buf == null) {
      buf = new Uint8Array(unsigned.encodingLength(value))
    }

    const access = accessor(buf)

    while (value >= INT) {
      access.set(offset++, (value & 0xFF) | MSB)
      value /= 128
    }

    while ((value & MSBALL) > 0) {
      access.set(offset++, (value & 0xFF) | MSB)
      value >>>= 7
    }

    access.set(offset, value | 0)

    return buf
  },

  decode (buf: Uint8ArrayList | Uint8Array, offset: number = 0): number {
    const access = accessor(buf)
    let res    = 0
    let shift  = 0
    let counter = offset
    let b
    let l = buf.length

    do {
      if (counter >= l || shift > 49) {
        throw new RangeError('Could not decode varint')
      }
      b = access.get(counter++)
      res += shift < 28
        ? (b & REST) << shift
        : (b & REST) * Math.pow(2, shift)
      shift += 7
    } while (b >= MSB)

    return res
  }
}

export const signed = {
  encodingLength (value: number): number {
    if (value < 0) {
      return 10 // 10 bytes per spec - https://developers.google.com/protocol-buffers/docs/encoding#signed-ints
    }

    return unsigned.encodingLength(value >= 0 ? value * 2 : value * -2 - 1)
  },

  encode (value: number, buf?: Uint8ArrayList | Uint8Array, offset = 0): Uint8ArrayList | Uint8Array {
    value = value >= 0 ? value * 2 : value * -2 - 1

    return unsigned.encode(value, buf, offset)
  },

  decode (buf: Uint8ArrayList | Uint8Array, offset = 0): number {
    const value = unsigned.decode(buf, offset)

    return value & 1 ? (value + 1) / -2 : value / 2
  }
}

export const zigzag = {
  encodingLength (value: number): number {
    value = (value << 1 ^ value >> 31) >>> 0
    return unsigned.encodingLength(value)
  },

  encode (value: number, buf?: Uint8ArrayList | Uint8Array, offset = 0): Uint8ArrayList | Uint8Array {
    if (buf == null) {
      buf = new Uint8Array(signed.encodingLength(value))
    }

    value = (value << 1 ^ value >> 31) >>> 0

    return unsigned.encode(value, buf, offset)
  },

  decode (data: Uint8ArrayList | Uint8Array, offset = 0): number {
    const value = unsigned.decode(data, offset)
    return value >>> 1 ^ -(value & 1) | 0
  }
}
