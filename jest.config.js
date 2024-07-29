module.exports = {
    projects: [
      {
        displayName: 'jest',
        testEnvironment: 'node',
        testMatch: ['**/__test__/src/**/*.test.ts', '**/__test__/src/**/*.spec.ts'],
        transform: {
          '^.+\\.ts$': 'ts-jest',
        },
      },
    ],
  };
  