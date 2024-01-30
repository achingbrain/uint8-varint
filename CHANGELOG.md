## [2.0.4](https://github.com/achingbrain/uint8-varint/compare/v2.0.3...v2.0.4) (2024-01-30)


### Dependencies

* **dev:** bump aegir from 41.3.5 to 42.2.2 ([#47](https://github.com/achingbrain/uint8-varint/issues/47)) ([568a0df](https://github.com/achingbrain/uint8-varint/commit/568a0dfbe3634102e7ce96ee624875ded3243f30))

## [2.0.3](https://github.com/achingbrain/uint8-varint/compare/v2.0.2...v2.0.3) (2023-12-28)


### Trivial Changes

* update project config ([#39](https://github.com/achingbrain/uint8-varint/issues/39)) ([3751833](https://github.com/achingbrain/uint8-varint/commit/37518333c46c6a18e32bdf2f9774fef9aee625fd))


### Dependencies

* bump uint8arrays from 4.0.10 to 5.0.0 ([#40](https://github.com/achingbrain/uint8-varint/issues/40)) ([6ebf2f8](https://github.com/achingbrain/uint8-varint/commit/6ebf2f85f1870a95a39d29decb0bc6bda451c767))

## [2.0.2](https://github.com/achingbrain/uint8-varint/compare/v2.0.1...v2.0.2) (2023-10-26)


### Dependencies

* **dev:** bump aegir from 40.0.13 to 41.0.11 ([#38](https://github.com/achingbrain/uint8-varint/issues/38)) ([ba625d6](https://github.com/achingbrain/uint8-varint/commit/ba625d615db6b286cad2e5f8746ec952cd3e8f92))

## [2.0.1](https://github.com/achingbrain/uint8-varint/compare/v2.0.0...v2.0.1) (2023-08-16)


### Bug Fixes

* ensure Uint8Array type is returned by default ([#31](https://github.com/achingbrain/uint8-varint/issues/31)) ([4bed840](https://github.com/achingbrain/uint8-varint/commit/4bed8406ff0a0201dddaacb006f54399460f5523))


### Trivial Changes

* remove extra file ([747c0b4](https://github.com/achingbrain/uint8-varint/commit/747c0b4126389d2e29257ab0aaceb205f016dba3))

## [2.0.0](https://github.com/achingbrain/uint8-varint/compare/v1.0.8...v2.0.0) (2023-08-15)


### ⚠ BREAKING CHANGES

* zigzag, signed and long encodings have been removed, import * for unsigned encode/decode

### Features

* remove zigzag, signed and long, now only supports unsigned varints ([#30](https://github.com/achingbrain/uint8-varint/issues/30)) ([29efeac](https://github.com/achingbrain/uint8-varint/commit/29efeaca0946e3f70dae880bb39f17456971b322)), closes [#27](https://github.com/achingbrain/uint8-varint/issues/27)

## [1.0.8](https://github.com/achingbrain/uint8-varint/compare/v1.0.7...v1.0.8) (2023-08-15)


### Bug Fixes

* update project config ([#29](https://github.com/achingbrain/uint8-varint/issues/29)) ([1bfa423](https://github.com/achingbrain/uint8-varint/commit/1bfa423a1778e289934b59ea698d34d7c3c3b0d8))

## [1.0.7](https://github.com/achingbrain/uint8-varint/compare/v1.0.6...v1.0.7) (2023-08-15)


### Dependencies

* **dev:** bump aegir from 38.1.8 to 40.0.0 ([#26](https://github.com/achingbrain/uint8-varint/issues/26)) ([ec88ec0](https://github.com/achingbrain/uint8-varint/commit/ec88ec0db75e4e40c2d67d1c0630aded0bf1b24c))

## [1.0.6](https://github.com/achingbrain/uint8-varint/compare/v1.0.5...v1.0.6) (2023-03-31)


### Bug Fixes

* correct path to types ([#15](https://github.com/achingbrain/uint8-varint/issues/15)) ([e23e8f3](https://github.com/achingbrain/uint8-varint/commit/e23e8f3f10c01b4814392498d0ea2d07fecc5c2d))

## [1.0.5](https://github.com/achingbrain/uint8-varint/compare/v1.0.4...v1.0.5) (2023-03-31)


### Dependencies

* **dev:** bump aegir from 37.12.1 to 38.1.8 ([#14](https://github.com/achingbrain/uint8-varint/issues/14)) ([98c1b7b](https://github.com/achingbrain/uint8-varint/commit/98c1b7bc1ee7509d78bde4033d4a7a48d80a4927))

## [1.0.4](https://github.com/achingbrain/uint8-varint/compare/v1.0.3...v1.0.4) (2022-10-12)


### Dependencies

* update uint8arrays from 3.x.x to 4.x.x ([#6](https://github.com/achingbrain/uint8-varint/issues/6)) ([87c2307](https://github.com/achingbrain/uint8-varint/commit/87c2307250a371f1586e50f336cf6278081cf707))

## [1.0.3](https://github.com/achingbrain/uint8-varint/compare/v1.0.2...v1.0.3) (2022-08-05)


### Bug Fixes

* improve derived return type of encode method ([#5](https://github.com/achingbrain/uint8-varint/issues/5)) ([298894c](https://github.com/achingbrain/uint8-varint/commit/298894c765a2c0a6b36654e747799af03e97dcd9))

## [1.0.2](https://github.com/achingbrain/uint8-varint/compare/v1.0.1...v1.0.2) (2022-07-30)


### Bug Fixes

* use alloc unsafe ([#4](https://github.com/achingbrain/uint8-varint/issues/4)) ([31e6368](https://github.com/achingbrain/uint8-varint/commit/31e6368d1ad0528963a4d4b48fb199dd819973b5))

## [1.0.1](https://github.com/achingbrain/uint8-varint/compare/v1.0.0...v1.0.1) (2022-07-30)


### Bug Fixes

* make buffers optional ([#3](https://github.com/achingbrain/uint8-varint/issues/3)) ([b0fa48f](https://github.com/achingbrain/uint8-varint/commit/b0fa48f7e9dc5932471a3a1a20f4e993cfb818cb))

## 1.0.0 (2022-07-28)


### Features

* add bigint support ([#2](https://github.com/achingbrain/uint8-varint/issues/2)) ([926758b](https://github.com/achingbrain/uint8-varint/commit/926758b7499d18e240f32311f62c272045bed797))


### Trivial Changes

* initial import ([9d7569e](https://github.com/achingbrain/uint8-varint/commit/9d7569ea321539d1995e26993625a98b6e078d40))
