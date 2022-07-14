import React from 'react';

import './global-footer.scss'

const getBaseUrl = () => {
  return 'https://www.inquirer.com';
};

const currentDatetime = new Date();
const currentDate = new Date(currentDatetime.toLocaleDateString('en-US', { timeZone: 'America/New_York' }));
export const copyrightLink = {
  href: `${getBaseUrl()}/about/copyright/`, name: `© ${currentDate.getFullYear()} The Philadelphia Inquirer, LLC`,
};
export const privacyTermsCali = [
  { href: `${getBaseUrl()}/about/terms_and_conditions/`, name: 'Terms of Use' },
  { href: `${getBaseUrl()}/privacy-policy/`, name: 'Privacy Policy' },
  { href: `${getBaseUrl()}/about/terms_and_conditions/#Cancellations`, name: 'Cancellation Policy' },
  { href: `${getBaseUrl()}/privacy-policy/#V`, name: 'California Notice' },
];
export const californiaResidentsLink = {
  href: `${getBaseUrl()}/privacy-policy/#opt-out`, name: 'California residents do not sell my data request',
};
export const socialLinks = [
  {
    href: 'https://twitter.com/phillyinquirer',
    name: 'faTwitter',
  },
  {
    href: 'https://www.facebook.com/philadelphiainquirer',
    name: 'faFacebook',
  },
  {
    href: 'https://www.instagram.com/phillyinquirer',
    name: 'faInstagram',
  },
];

const GlobalFooter: React.FunctionComponent = () => {
  const RenderLink = ({ element, index }) => <>
    <a href={element.href} data-link-type='footer' className='footer-link'>
      {element.name}
    </a>
    {index < 3 ? <strong>/&nbsp;&nbsp;</strong> : null}
  </>;

  const RenderSocialLink = elementProps => <a href={elementProps.element.href} data-link-type='footer' className="footer-link">
    <img className="inline w-4 h-16 object-center" src={`https://media.inquirer.com/assets/${elementProps.element.name}.svg`} />
  </a>;

  return (
    <footer className="footer footer-copyright">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-copyright-container">
            <RenderLink element={copyrightLink} index={200} />
            <br></br>
            {privacyTermsCali.map((element, index) => <RenderLink element={element} key={index} index={index} />)}
            {
              <>
                <strong className='hidden-mobile'>/&nbsp;&nbsp;</strong>
                <a href={californiaResidentsLink.href} data-link-type='footer' className='footer-link hidden-mobile'>
                  {californiaResidentsLink.name}
                </a>
              </>
            }
            <br></br>
            <a href={californiaResidentsLink.href} data-link-type='footer' className='footer-link hidden-desktop'>
              {californiaResidentsLink.name}
            </a>
          </div>
          <div className="footer-share-bar-container">
            {socialLinks.map((element, index) => <RenderSocialLink element={element} key={index} index={index} />)}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
