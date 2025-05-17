import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
  expanded?: boolean;
}

@customElement('shared-tree-grid')
export class TreeGridComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--vscode-font-family, Arial, sans-serif);
    }

    .tree-grid {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--vscode-widget-border, #ccc);
    }

    .tree-grid th {
      background-color: var(--vscode-editor-background, #f5f5f5);
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid var(--vscode-widget-border, #ccc);
      font-weight: bold;
    }

    .tree-grid td {
      padding: 8px;
      border-bottom: 1px solid var(--vscode-widget-border, #ccc);
    }

    .tree-row {
      cursor: pointer;
    }

    .tree-row:hover {
      background-color: var(--vscode-list-hoverBackground, #f0f0f0);
    }

    .expander {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 4px;
      text-align: center;
      line-height: 16px;
      cursor: pointer;
    }

    .indent {
      display: inline-block;
      width: 20px;
    }
  `;

  @property({ type: Array })
  data: TreeNode[] = [];

  @property({ type: Array })
  columns: string[] = [];

  private toggleNode(node: TreeNode) {
    node.expanded = !node.expanded;
    this.requestUpdate();
  }

  private renderNode(node: TreeNode, level = 0) {
    const hasChildren = node.children && node.children.length > 0;
    const rows = [];

    // Render current row
    rows.push(html`
      <tr class="tree-row" @click=${() => hasChildren && this.toggleNode(node)}>
        <td>
          ${[...Array(level)].map(() => html`<span class="indent"></span>`)}
          ${hasChildren
        ? html`<span class="expander">${node.expanded ? '▼' : '▶'}</span>`
        : html`<span class="indent"></span>`}
          ${node[this.columns[0]]}
        </td>
        ${this.columns.slice(1).map(
          column => html`<td>${node[column]}</td>`
        )}
      </tr>
    `);

    // Render children if expanded
    if (hasChildren && node.expanded && node.children) {
      node.children.forEach(child => {
        rows.push(...this.renderNode(child, level + 1));
      });
    }

    return rows;
  }

  override render() {
    return html`
      <table class="tree-grid">
        <thead>
          <tr>
            ${this.columns.map(
      column => html`<th>${column}</th>`
    )}
          </tr>
        </thead>
        <tbody>
          ${this.data.map(node => this.renderNode(node))}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shared-tree-grid': TreeGridComponent;
  }
}
