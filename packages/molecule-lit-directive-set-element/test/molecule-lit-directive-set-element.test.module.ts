import { setElement } from '../src/molecule-lit-directive-set-element';
import {
  html,
  render,
  Element as LitElement,
} from '../../molecule-lit/src/molecule-lit';

const { expect } = chai;

describe('MoleculeLitDirectiveSetElement', () => {
  let div: HTMLElement;
  before(() => {
    div = document.createElement('div');
    document.body.appendChild(div);

    class TestElementSet extends LitElement {
      [x: string]: any;
      static get properties() {
        return {
          shortBool: false,
          longBool: {
            type: Boolean,
            value: true,
            attribute: true,
            event: true,
          },
          shortNumber: 0,
          longNumber: {
            type: Number,
            value: 123,
            attribute: true,
            event: true,
          },
          stringProp: {
            type: String,
            value: 'StringProp',
          },
        };
      }

      render() {
        return html`<div id="results">
                        <span id="shortBool">${this.shortBool}</span>
                        <span id="longBool">${this.longBool}</span>
                        <span id="shortNumber">${this.shortNumber}</span>
                        <span id="longNumber">${this.longNumber}</span>
                    </div>
                    <slot></slot>`;
      }
    }

    customElements.define('test-element-set', TestElementSet);
    render(
      html`
              Successfully set element here:
              ${setElement(TestElementSet, {
                props: {
                  shortBool: false,
                  shortNumber: 33333,
                  longNumber: 45,
                  stringProp: 'Albert',
                  innerHTML: '<button>Click</button>',
                },
                attributes: {
                  class: 'set-el',
                },
              })}
              `,
      div,
    );
  });

  it('Inserted Element', () => {
    const children = div.children;
    const insertedElement = children[0];
    expect(insertedElement).to.be.an('HTMLElement');
  });

  it('Correct props', () => {
    const insertedElement = div.children[0];
    expect((insertedElement as any).shortBool).to.be.false;
    expect((insertedElement as any).shortNumber).to.equal(33333);
    expect((insertedElement as any).longNumber).to.equal(45);
    expect((insertedElement as any).stringProp).to.equal('Albert');
  });

  it('Correct attributes', () => {
    const insertedElement = div.children[0];
    expect(insertedElement.className).to.equal('set-el');
    expect(insertedElement.getAttribute('long-number')).to.equal('45');
    expect(insertedElement.hasAttribute('long-bool')).to.be.true;
  });

  it('Correct innerHTML', () => {
    const insertedElement = div.children[0];
    expect(insertedElement.innerHTML).to.equal('<button>Click</button>');
  });
});
