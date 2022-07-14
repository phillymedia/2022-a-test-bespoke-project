declare const window: any;

let isUnsubscribed;

const checkSubscriptionStatus = () => {
  const dl = window.PMNdataLayer?.[0] !== undefined && window.PMNdataLayer[0];
  const userState = dl?.analytics?.user?.state;

  return userState !== 'Subscribed' || window.location.host.includes('zzz-systest') || userState == 'undefined';
}

const initSubscriptions = () => {
  document.querySelectorAll('.js-subscribe').forEach((subscriptionEl, i) => {
    initSubscription(subscriptionEl, i);
  });
}

const initSubscription = (subscriptionEl, i) => {
  subscriptionEl.classList.add('is-visible');
}

export default {
  init: () => {
    isUnsubscribed = checkSubscriptionStatus();

    if (isUnsubscribed) {
      initSubscriptions();
    }
  }
}