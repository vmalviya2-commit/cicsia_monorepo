"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
exports.default = {
    displayName: 'cicsia-vscode-extension-for-zowe',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/apps/cicsia-vscode-extension-for-zowe',
    moduleNameMapper: {
        '^vscode$': '<rootDir>/src/test/vscode.mock.ts'
    }
};
//# sourceMappingURL=jest.config.js.map