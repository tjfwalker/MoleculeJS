import { MoleculeLit, html } from '../dist/molecule-lit';

import { propTests } from '../../../test/common/props';
import { eventTests } from '../../../test/common/events';
import { attrTests } from '../../../test/common/attributes';
import { asyncPropTests } from '../../../test/common/async-props';

describe('MoleculeLit', () => {
  const testElement = document.getElementById('test-el-lit');
  (window as any).observerVals = new Map<string, any>();

  before(() => {
    (window as any).observerVals = new Map<string, any>();

    class TestElementLit extends MoleculeLit {
      static get properties() {
        return {
          shortBool: Boolean,
          longBool: {
            type: Boolean,
            value: true,
            reflectToAttribute: true,
            observer: 'boolObserver',
            notify: true,
          },
          shortNumber: Number,
          longNumber: {
            type: Number,
            value: 123,
            reflectToAttribute: true,
            observer: 'numberObserver',
            notify: true,
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
</div>`;
      }

      boolObserver(bool: boolean) {
        (window as any).observerVals.set('bool', bool);
      }

      numberObserver(num: number) {
        (window as any).observerVals.set('number', num);
      }
    }

    customElements.define('test-element-lit', TestElementLit);
  });

  propTests(testElement);

  attrTests(testElement);

  eventTests(testElement);

  asyncPropTests(testElement);
});
