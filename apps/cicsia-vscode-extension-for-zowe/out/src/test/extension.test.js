"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
globals_1.jest.mock('vscode', () => ({
    window: {
        showInformationMessage: globals_1.jest.fn(),
    }
}));
(0, globals_1.describe)('Extension Test Suite', () => {
    (0, globals_1.it)('Sample test', () => {
        (0, globals_1.expect)([1, 2, 3].indexOf(5)).toBe(-1);
        (0, globals_1.expect)([1, 2, 3].indexOf(0)).toBe(-1);
    });
});
//# sourceMappingURL=extension.test.js.map