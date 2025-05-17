import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('shared-button')
export class ButtonComponent extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .secondary {
      background-color: #6c757d;
    }

    .secondary:hover {
      background-color: #545b62;
    }
  `;

  @property({ type: String, attribute: 'variant' })
  declare variant: 'primary' | 'secondary';

  @property({ type: Boolean, attribute: 'disabled' })
  declare disabled: boolean;

  @property({ type: String, attribute: 'label' })
  declare label: string;

  constructor() {
    super();
    this.variant = 'primary';
    this.disabled = false;
    this.label = '';
  }

  private handleClick() {
    const event = new CustomEvent<void>('button-click', {
      bubbles: true,
      composed: true,
      detail: undefined
    });
    this.dispatchEvent(event);
  }

  override render() {
    return html`
      <button
        class=${this.variant}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${this.label}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shared-button': ButtonComponent;
  }
}
