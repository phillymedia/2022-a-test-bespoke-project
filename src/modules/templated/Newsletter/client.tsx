declare const window: any;

let newsletters = new Array;

const initNewsletters = () => {
  document.querySelectorAll('.js-newsletter').forEach((newsletterEl, i) => {
    initNewsletter(newsletterEl, i);
  });
}

const initNewsletter = (newsletterEl, i) => {
  newsletterEl.classList.add(`inno-newsletter--${i}`);

  newsletters[i] = {
    id: i,
    el: newsletterEl,
    form: newsletterEl.querySelector('.js-newsletter-form'),
    emailField: newsletterEl.querySelector('.js-newsletter-email'),
    button: newsletterEl.querySelector('.js-newsletter-button')
  };

  prePopulateEmailField(i);
  bindings(i);
}

const prePopulateEmailField = i => {
  const loggedInEmail = window?.services?.loginService?.user?.email;

  if (loggedInEmail) {
    newsletters[i].emailField.value = loggedInEmail;
    updateButtonState(i, true);
  }
}

const bindings = i => {
  newsletters[i].form.addEventListener('keyup', e => {
    const isValid = validateEmail(newsletters[i].emailField.value);
    updateButtonState(i, isValid);
  });

  newsletters[i].form.onsubmit = e => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    const formData: any = new FormData(newsletters[i].form);
    formData.append('iframe', true);

    xhr.open('post', 'https://api.inquirer.com/v1/newsletter/subscribe');
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // show success message
        newsletters[i].form.classList.add('is-hidden');
        newsletters[i].el.querySelector('.js-success').classList.add('is-visible');
      }
    }

    xhr.send(formData);
  }
}

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const updateButtonState = (i, isEnabled) => {
  if (isEnabled) {
    newsletters[i].button.removeAttribute('disabled');
  } else {
    newsletters[i].button.setAttribute('disabled', 'disabled');
  }
}

export default {
  init: () => {
    initNewsletters();
  }
}