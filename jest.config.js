module.exports = {
    testRunner: 'jest-circus/runner',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '.*\\.test\\.ts?$',
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: ['/node_modules/', '/.cache/'],
    watchPathIgnorePatterns: ['/.cache/'],
    collectCoverageFrom: ['**/*.{ts}', '!**/*.test.{ts}'],
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/out/'],
    coverageDirectory: '../coverage',
    coverageReporters: ['html', 'cobertura', 'text-summary'],
    cacheDirectory: '.cache/jest',
};
