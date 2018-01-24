module.exports = {
  coverageEnvVar: 'COVERAGE',
  excludes: [
    /dummy\/(.*)/
  ],
  useBabelInstrumenter: true,
  reporters: [
    'html',
    'json-summary',
    'lcov',
    'text-summary'
  ]
}
