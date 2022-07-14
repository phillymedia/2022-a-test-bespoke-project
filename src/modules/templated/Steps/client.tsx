let width;

class Steps {
  el: HTMLElement;
  contentPosition: string;
  possibleSteps: Array<any>;
  currentStep: string;

  constructor(el) {
    this.el = el;
    this.contentPosition = 'default',
    this.possibleSteps = new Array,
    this.currentStep = null;

    this.setPossibleSteps();
    this.updateContent();
    this.bindings();
  }

  setPossibleSteps(): void {
    this.el.querySelectorAll('.js-steps-step').forEach((step: HTMLElement) => {
      if (step.dataset.step) {
        this.possibleSteps.push('is-' + step.dataset.step);
      }
    });
  }

  bindings(): void {
    window.addEventListener('scroll', () => {
      this.updateContent();
    });

    window.addEventListener('resize', () => {
      if (width !== window.innerWidth) {
        width = window.innerWidth
        this.updateContent();
      }
    })
  }

  updateContent(): void {
    this.updateContentPosition();
    this.updateCurrentStep();
  }

  updateContentPosition(): void {
    const introBounds = this.el.getBoundingClientRect();
    let contentPositionToSet;

    if (introBounds.top < window.innerHeight - introBounds.height) {
      contentPositionToSet = 'bottom';
    } else if (introBounds.top < 0) {
      contentPositionToSet = 'fixed';
    } else {
      contentPositionToSet = 'default';
    }

    if (contentPositionToSet !== this.contentPosition) {
      this.contentPosition = contentPositionToSet;

      this.el.classList.remove('is-bottom', 'is-fixed', 'is-default');
      this.el.classList.add(`is-${this.contentPosition}`);
    }
  }

  updateCurrentStep(): void {
    let currentStepToSet;
    let scoreToSet;
    const steps = this.el.querySelectorAll('.js-steps-step');

    steps.forEach((step: HTMLElement, i) => {
      const offset = window.innerHeight * 0.9;

      if (step.getBoundingClientRect().top < offset) {
        currentStepToSet = this.possibleSteps[i];
        scoreToSet = step.dataset.score;
      }
    });

    if (currentStepToSet !== this.currentStep) {
      this.currentStep = currentStepToSet;

      this.el.classList.remove(...this.possibleSteps);
      this.el.classList.add(...this.possibleSteps.slice(0, this.possibleSteps.indexOf(this.currentStep) + 1));
    }
  }
}

export default {
  init: () => {
    width = window.innerWidth;

    document.querySelectorAll('.js-steps').forEach(el => {
      new Steps(el);
    });
  }
}