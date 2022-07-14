/* eslint-disable max-len */

import React from 'react';

import './footer.scss';

interface MenuItem {
  name: string;
  url: string;
}

const getBaseUrl = () => {
  return 'https://www.inquirer.com';
};

export const sections: MenuItem[] = [
  { url: `${getBaseUrl()}/news/`, name: 'News' },
  { url: `${getBaseUrl()}/sports/`, name: 'Sports' },
  { url: `${getBaseUrl()}/entertainment/`, name: 'Entertainment' },
  { url: `${getBaseUrl()}/business/`, name: 'Business' },
  { url: `${getBaseUrl()}/health/`, name: 'Health' },
  { url: `${getBaseUrl()}/food/`, name: 'Food' },
  { url: `${getBaseUrl()}/life/`, name: 'Life' },
  { url: `${getBaseUrl()}/opinion/`, name: 'Opinion' },
  { url: `${getBaseUrl()}/archives/`, name: 'Archives' },
  { url: `${getBaseUrl()}/special-reports/`, name: 'Special Reports' },
];
export const marketplace: MenuItem[] = [
  { url: `${getBaseUrl()}/subscribe_footer/`, name: 'Subscribe' },
  { url: 'https://store.inquirer.com/', name: 'Inquirer Store' },
  { url: 'https://www.monster.com/jobs/search/?wt.mc_n=hjnpsearch&ch=PINQ&where=Philadelphia%2C%20PA&rad=50', name: 'Job Listings' },
  { url: 'http://marketplace.inquirer.com/', name: 'All Classifieds' },
  { url: 'https://marketplace.inquirer.com/pa/legal/search/', name: 'Legal Notices' },
  { url: 'https://store.inquirer.com/products/philadelphia-inquirer-gift-subscription', name: 'Gift Subscriptions' },
];
export const mobileApps: MenuItem[] = [
  { url: 'https://apps.apple.com/app/apple-store/id577251728?pt=549215&ct=globalfooter&mt=8', name: 'Apple iOS' },
  { url: 'https://play.google.com/store/apps/details?id=com.ap.philly&referrer=utm_source%3Demail%26utm_medium%3Demail%26utm_term%3DGoogle%26utm_content%3Dprint%26utm_campaign%3DGlobal%2520Footer', name: 'Google Android' },
];
export const aboutUs: MenuItem[] = [
  { url: `${getBaseUrl()}/about/`, name: 'About The Inquirer' },
  { url: `${getBaseUrl()}/contact-us/`, name: 'Advertise' },
  { url: `${getBaseUrl()}/contact-us/`, name: 'Contact Us' },
  { url: `${getBaseUrl()}/pars/`, name: 'Licensing & Permissions' },
  { url: 'https://store.inquirer.com/collections/custom/products/custom-photo-reprint?utm_source=philly.com&utm_campaign=mktg_photoreprintsfooter&utm_medium=referral&utm_content=&amp;utm_term=&int_promo=inquirer.com', name: 'Photo Reprints' },
  { url: 'https://nie.inquirer.com/', name: 'Newspapers in Education' },
  { url: `${getBaseUrl()}/careers/`, name: 'Jobs & Internships' },
  { url: `${getBaseUrl()}/inquirer-live/`, name: 'Inquirer Events' },
  { url: `${getBaseUrl()}/acel_moore/`, name: 'Acel Moore Workshops' },
  { url: `${getBaseUrl()}/about/newsroom-staff-beats-list/`, name: 'Newsroom Staff' },
];
export const replicaEditions: MenuItem[] = [
  { url: '#', name: 'The Inquirer' },
  { url: '#', name: 'The Daily News' },
  { url: 'https://myaccount.inquirer.com/', name: 'Subscriber Services' },
];

const addEditionClass = (elementName: string) => {
  switch (elementName) {
    case 'The Inquirer':
      return 'inquirer-digital-edition';
    case 'The Daily News':
      return 'daily-digital-edition';
    case 'Subscribe':
      return 'inquirer-subscribe';
    case 'Subscriber Services':
      return 'inquirer-subscriber-services hidden';
    default:
      return '';
  }
};

const RenderLink = elementProps => <li>
  <a href={elementProps.element.url} data-link-type='footer' className={`footer-link ${addEditionClass(elementProps.element.name)}`}>{elementProps.element.name}</a>
</li>;

const sliceArray = (elements: MenuItem[], from: number, to: number) => elements.slice(from, to);

export default class Footer extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="footer">
        <div className="footer-container grid-column inno-container">
          <div className="footer-column">
            <div className="links-headline">About Us</div>
            <div className="links-content">
              <ul className="column-mobile">
                {aboutUs.map((element: MenuItem, index: number) => <RenderLink element={element} key={index} index={index} />)}
              </ul>
            </div>
          </div>
          <div className="footer-column">
            <div className="links-headline">News &amp; Info</div>
            <div className="links-content">
              <ul className="column-mobile">
                {sliceArray(sections, 0, 5).map((element: MenuItem, index: number) => <RenderLink element={element} key={index} index={index} />)}
              </ul>
              <ul className="column-mobile">
                {sliceArray(sections, 5, 12).map((element: MenuItem, index: number) => <RenderLink element={element} key={index} index={index} />)}
              </ul>
            </div>
          </div>
          <div className="footer-column">
            <div className="links-headline">Marketplace</div>
            <div className="links-content">
              <ul className="column-mobile">
                {sliceArray(marketplace, 0, 4).map((element: MenuItem, index: number) => <RenderLink element={element} key={index} index={index} />)}
              </ul>
              <ul className="column-mobile">
                {sliceArray(marketplace, 4, 7).map((element: MenuItem, index: number) => <RenderLink element={element} key={index} index={index} />)}
              </ul>
            </div>
          </div>
          <div className="footer-column">
            <div className="group">
              <div className="links-headline">e-Editions</div>
              <div className="links-content">
                <ul className="column-mobile">
                  {replicaEditions.map((element: MenuItem, index: number) => <RenderLink element={element} key={index} index={index} />)}
                </ul>
              </div>
            </div>
            <div className="group">
              <div className="links-headline">Mobile Apps</div>
              <div className="links-content">
                <ul className="column-mobile">
                  {mobileApps.map((element: MenuItem, index: number) => <RenderLink element={element} key={index} index={index} />)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
