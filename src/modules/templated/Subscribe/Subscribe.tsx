import React from "react";

export default function Subscribe({ title, description }) {
  return (
    <div className='inno-subscribe js-subscribe'>
      <div className='inno-subscribe__header'>
        <h3 className='inno-subscribe__header-title'>{title || "Subscribe to The Philadelphia Inquirer"}</h3>
        <p className='inno-subscribe__header-description'>{description || "Our reporting is directly supported by reader subscriptions. If you want more accountability journalism like this story, please subscribe today."}</p>
      </div>

      <div className='inno-subscribe__buttons'>
        <a className="inno-subscribe__button js-subscribe-button" href="https://inquirer.com/offers/?int_promo=newsroom&int_promo_sub_channel=innovation">Subscribe</a>
      </div>
    </div>
  );
}
