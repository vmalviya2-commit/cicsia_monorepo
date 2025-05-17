import { describe, it, expect, jest } from '@jest/globals';
import * as vscode from 'vscode';

jest.mock('vscode', () => ({
  window: {
    showInformationMessage: jest.fn(),
  }
}));

describe('Extension Test Suite', () => {
  it('Sample test', () => {
    expect([1, 2, 3].indexOf(5)).toBe(-1);
    expect([1, 2, 3].indexOf(0)).toBe(-1);
  });
});
