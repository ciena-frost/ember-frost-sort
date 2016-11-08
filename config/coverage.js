module.exports = {
  coverageEnvVar: 'COVERAGE',
  excludes: [
    /dummy\/(.*)/
  ],
  useBabelInstrumenter: true,
  reporters: [
    'html',
    'lcov',
    'text-summary'
  ]
}
