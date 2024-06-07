# SSR Framework Benchmark

SSR nextjs getInitialProps with/without styled-components

## Frameworks

| (index) | name                | ops/sec | average (ms) | samples | body (kb) | duplication | relative to react |
| ------- | ------------------- | ------- | ------------ | ------- | --------- | ----------- | ----------------- |
| 0       | 'next-pages'        | 157     | '6.339'      | 1578    | '187.67'  | 'x2.00'     | ''                |
| 1       | 'next-pages-styled' | 43      | '22.822'     | 439     | '363.53'  | 'x2.50'     | '3.65 x slower'   |

## Test Environment

- Only SSR. We do not even build the client bundles for most of the modules.
- Next.JS route cache is disabled using `const dynamic = 'force-dynamic'`. (Otherwise we would be benchmarking a static http server because there is no dynamic code like accessing cookies.)
- Instead of going through the http server, the benchmark code creates mock http requests and responses. This ensures that we do not pay for tcp overhead.
- Tests ran on Node.JS `v20.6.1` on my Macbook Pro M1 Pro
- Each framework renders a table of 1000 rows, each containing two uuid columns.
- The table data is emulated as async and requires Suspense on react, solid and vue. On Next it is loaded in an async RSC component. On Remix it is loaded in a route `loader` function.
- Streaming rendering used on solid, react and vue.

## Running

```sh
$ npm install
$ npm run build
$ npm start
```
