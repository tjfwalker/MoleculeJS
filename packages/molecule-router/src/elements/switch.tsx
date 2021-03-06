import MoleculeJsx from '../../../molecule-jsx/src/molecule-jsx';
import { Router } from '../molecule-router';
import matchPath, { Match } from '../util/match-path';

export default class MolSwitch extends MoleculeJsx.Element {
  router!: Router;

  static get properties() {
    return {
      current: {
        observer: 'matchRoutes',
      },
    };
  }

  connected() {
    this.router = (window as any).$molRouter;
    this.router.addRoute(this);
  }

  matchRoutes() {
    const children = (this as any).children;
    let match: Match | null = null;
    for (const child of children) {
      const { path: pathProp, exact, strict, sensitive, from } = child as any;

      const path = pathProp || from;

      (child as any).inactive = true;

      if (!match) {
        match = matchPath(
          this.router.current.pathname,
          { path, exact, strict, sensitive },
          this.router.match,
        );

        if (match) {
          (child as any).computedMatch = match;
          (child as any).inactive = false;
        }
      }
    }
  }

  render() {
    return <slot />;
  }

  afterRender(first: boolean) {
    if (first) {
      this.matchRoutes();
    }
  }
}

customElements.define('mol-switch', MolSwitch);
