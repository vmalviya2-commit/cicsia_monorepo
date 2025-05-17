import * as vscode from 'vscode';
import { TreeGridComponent } from '@cicsia-nx-monorepo-workspace/shared-ui';

export class SharedUIPanel {
  public static currentPanel: SharedUIPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    this._setWebviewMessageListener(this._panel.webview);
  }

  public static render(extensionUri: vscode.Uri) {
    if (SharedUIPanel.currentPanel) {
      SharedUIPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        'sharedUIDemo',
        'Shared UI Demo',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [extensionUri]
        }
      );

      SharedUIPanel.currentPanel = new SharedUIPanel(panel, extensionUri);
    }
  }

  private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview.js'));

    const treeData = [
      {
        Detail: 'Application',
        expanded: true,
        children: [
          { Detail: 'Application name', Value1: 'Applid C56C1C01', Value2: 'Applid C56C1C01' },
          { Detail: 'Major application version', Value1: '0', Value2: '0' },
          { Detail: 'Micro application version', Value1: '0', Value2: '0' },
          { Detail: 'Minor application version', Value1: '0', Value2: '0' },
          { Detail: 'Operation', Value1: '', Value2: '' },
          { Detail: 'Platform', Value1: '', Value2: '' }
        ]
      },
      {
        Detail: 'Basic',
        expanded: true,
        children: [
          { Detail: 'Hold Status', Value1: 'TASKLIFE', Value2: 'TASKLIFE' },
          { Detail: 'Home Sysid', Value1: '1561', Value2: '1561' },
          { Detail: 'Library Dataset Name', Value1: 'ITBLD.IAT01.MASTER.TESTLOAD', Value2: 'ITBLD.IAT01.MASTER.TESTLOAD' },
          { Detail: 'Library Name', Value1: 'DFHRPL', Value2: 'DFHRPL' },
          { Detail: 'Module Type', Value1: 'PROGRAM', Value2: 'PROGRAM' }
        ]
      }
    ];

    const columns = ['Detail', 'Value1', 'Value2'];

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src ${webview.cspSource} 'unsafe-inline'; style-src 'unsafe-inline';">
          <title>Shared UI Demo</title>
          <style>
            body {
              padding: 20px;
              color: var(--vscode-foreground);
              background-color: var(--vscode-editor-background);
              font-family: var(--vscode-font-family);
            }

            h1 {
              margin-bottom: 20px;
            }

            shared-tree-grid {
              display: block;
              min-height: 400px;
              border: 1px solid var(--vscode-widget-border);
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <h1>TreeGrid Demo in VS Code</h1>
          
          <shared-tree-grid
            id="treeGrid"
          ></shared-tree-grid>

          <script>
            // Define the custom element if not already defined
            if (!customElements.get('shared-tree-grid')) {
              customElements.define('shared-tree-grid', class extends HTMLElement {
                constructor() {
                  super();
                  this.attachShadow({ mode: 'open' });
                }
              });
            }

            // Initialize the tree grid after the DOM is fully loaded
            window.addEventListener('load', () => {
              console.log('Initializing TreeGrid...');
              const treeGrid = document.getElementById('treeGrid');
              
              if (treeGrid) {
                console.log('TreeGrid found, setting data...');
                // Set the data and columns
                treeGrid.data = ${JSON.stringify(treeData)};
                treeGrid.columns = ${JSON.stringify(columns)};
                
                // Force an update
                if (typeof treeGrid.requestUpdate === 'function') {
                  treeGrid.requestUpdate();
                }
              } else {
                console.error('TreeGrid element not found');
              }
            });

            // Listen for messages from the extension
            window.addEventListener('message', event => {
              const message = event.data;
              switch (message.command) {
                case 'updateData':
                  const treeGrid = document.getElementById('treeGrid');
                  if (treeGrid) {
                    treeGrid.data = message.data;
                    if (typeof treeGrid.requestUpdate === 'function') {
                      treeGrid.requestUpdate();
                    }
                  }
                  break;
              }
            });
          </script>
        </body>
      </html>
    `;
  }

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        switch (message.command) {
          case 'treeNodeToggle':
            console.log('Tree node toggled:', message.node);
            return;
        }
      },
      undefined,
      this._disposables
    );
  }
}
