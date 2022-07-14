import templated from './modules/templated/client';
import custom from './modules/custom/client';
import storyMeta from './modules/templated/StoryMeta/client';

let interactive = document.querySelector('.js-inno');

const startInteractive = () => {
  templated.init();
  custom.init();
  storyMeta.init();
}

if (interactive) {
  startInteractive();
} else {
  const observer = new MutationObserver((mutations, obs) => {
    const interactive = document.querySelector('.js-inno');

    if (interactive) {
      obs.disconnect();
      startInteractive();
      return;
    }
  });

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}
