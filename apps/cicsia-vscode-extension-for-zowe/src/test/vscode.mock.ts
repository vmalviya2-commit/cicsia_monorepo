export default {
  window: {
    showInformationMessage: jest.fn(),
    createOutputChannel: jest.fn(),
  },
  commands: {
    registerCommand: jest.fn(),
  },
  workspace: {
    workspaceFolders: [],
    getConfiguration: jest.fn(),
  },
  ExtensionContext: jest.fn(),
  StatusBarAlignment: {},
  Position: jest.fn(),
  Range: jest.fn(),
  Uri: {
    file: jest.fn(),
    parse: jest.fn(),
  },
};
