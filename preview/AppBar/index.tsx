import React from 'react';

import './app-bar.scss';

export default class AppBar extends React.Component<any> {
  render() {
    return (
      <div className='app-bar'>
        <div className='app-bar__wrapper'>
          <div className='inno-container'>
            <div className='app-bar__content'>
              <div className='app-bar__icons'>
                <div className='app-bar__menu-icon'>––</div>
                <img src='/preview-assets/search-icon.svg' className='app-bar__icon' />
              </div>

              <div className='app-bar__logos'>
                <img src='/preview-assets/inquirer-logo-mobile-01.svg' className='app-bar__logo app-bar__logo--mobile' />
                <img src='/preview-assets/inquirer-logo-official-v2.svg' className='app-bar__logo app-bar__logo--desktop' />
              </div>

              <div className='app-bar__user'>
                <img src='/preview-assets/avatar_3x.png' className='app-bar__user-icon' />
                <h3 className='app-bar__user-name'>jnorvell@inquirer.com</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
