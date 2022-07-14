const bindings = () => {
  window.addEventListener('message', e => {
    if (e.data['datawrapper-height']) {
      const heights = e.data['datawrapper-height'];
      for (let id in heights) {
        const el = document.querySelector(`#datawrapper-chart-${id}`);
        el.setAttribute('height', heights[id]);
      }
    }
  });
}

const enhanceAi2Htmls = () => {
  document.querySelectorAll('.js-ai2html-graphic').forEach((graphicEl: HTMLElement) => {
    if (typeof window !== 'undefined') {
      const l = () => {
        new (window as any).pym.Parent(graphicEl.id, graphicEl.dataset.iframe)
      };

      if (typeof ((window as any).pym) === 'undefined') {
        const header = document.querySelector('head');
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://pym.nprapps.org/pym.v1.min.js';
        script.onload = l;
        header.appendChild(script);
      } else {
        l();
      }
    }
  })
}

export default {
  init: () => {
    bindings();
    enhanceAi2Htmls();
  }
}


