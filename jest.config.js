module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.jsx?$': ['@swc/jest', { jsc: { parser: { jsx: true } } }],
  },
  moduleNameMapper: {
    '\\.(css|svg)$': 'identity-obj-proxy',
  },
  coverageReporters: [
    'cobertura',
  ],
};
