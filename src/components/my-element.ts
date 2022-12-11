import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  private name: string;

  @property()
  private count: number;

  constructor() {
    super();
    this.name = "Stefan";
    this.count = 0;
  }

  private _increment(e: Event) {
    this.count++;
  }

  protected render() {
    return html`
      <div>
        <p>Hello, ${this.name}!</p>
        <button @click="${this._increment}">count: ${this.count}</button>
      </div>
    `;
  }
}
