let dataLayer;

const fireEvent = (action, label) => {
  dataLayer = dataLayer || window['PMNdataLayer'];

  if (dataLayer) {
    dataLayer.push({
      'event': 'misc_event',
      'eventAction': action,
      'eventLabel': label
    });
  } else {
    console.log('Failed to push analytics event', action, label);
  }
}

export default {
  event: (action, label) => {
    fireEvent(action, label);
  }
}
