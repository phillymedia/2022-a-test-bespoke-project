let helpers, initalizeAd;

const getGlobalFunctions = () => {
  if (window.location.host.includes('localhost')) {
    addPlaceHolders();
  } else {
    helpers = window['helpers'];

    if (typeof helpers == 'undefined') {
      setTimeout(() => {
        getGlobalFunctions();
      }, 200)
    } else {
      initalizeAd = helpers['initalizeAd'];
      initalizeAllAds();
    }
  }
}

const addPlaceHolders = () => {
  document.querySelectorAll('.js-inno-ad').forEach((adElement: HTMLElement) => {
    adElement.classList.add('inno-ad--placeholder');
  })
}

const initalizeAllAds = () => {
  document.querySelectorAll('.js-inno-ad-wrapper').forEach((adElement: HTMLElement, i) => {
    const isSmall = adElement.dataset.size == 'small';

    const adData = {
      "id": adElement.dataset.id,
      "slotName": adElement.dataset.slotname,
      "adType": "cube",
      "dimensions": isSmall ? "[[300, 250]]" : "[[[970, 250],[970, 90],[728, 90]],[728, 90],[300, 250],[300, 250]]",
      "sizemap": {
        "breakpoints": isSmall ? "[[0, 0]]" : "[[1200, 0],[800, 0],[730, 0],[0, 0]]",
        "refresh": true
      },
      "display": "all",
      "bidding": {
        "amazon": {
          "enabled": true,
          "slotSuffix": `-mrec_2${i + 1}_article`
        },
        "prebid": {
          "enabled": true,
          "slotSuffix": `-mrec_2${i + 1}_article`
        }
      },
      "targeting": {
        "position": `mrec_2${i + 1}`,
        "position_type": `mrec_2${i + 1}_article`,
        "content_subtype": "subtype-innovation-2",
        "article_id": adElement.dataset.articleId
      }
    }

    initalizeAd(adData, { lazyLoad: true });
  })
}

export default {
  init: () => {
    getGlobalFunctions();
  }
}
