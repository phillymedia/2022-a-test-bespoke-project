import React from "react";

export default function Newsletter({ title, description, id }) {
  return (
    <div className='inno-newsletter js-newsletter'>
      <div className='inno-newsletter__header'>
        <div className='inno-newsletter__header-tag'>Newsletter</div>
        <h3 className='inno-newsletter__header-title'>{title}</h3>
        <p className='inno-newsletter__header-description'>{description}</p>
      </div>

      <div className='inno-newsletter__form'>
        <form className="inno-newsletter__form-form js-newsletter-form" id="inno-newsletter__form-form" method="post">
          <input className="inno-newsletter__form-input js-newsletter-email" id="fieldEmail" name="cm-emailAddress" placeholder="your@email.com" required type="email" />

          <input id="fieldListId" name="cm-listID" required type="hidden" value={id} />
          <input className="fieldSource" name="cm-source" type="hidden" value="admin_newsletters_innovation" />
          <span className="list-name hidden" id="signup-list-name">Let&#39;s Eat Newsletter</span>

          <button className="inno-newsletter__form-button js-newsletter-button" disabled type="submit">Sign up</button>
        </form>

        <p className='inno-newsletter__success js-success'>Thank you for subscribing!</p>

        <div className="inno-newsletter__form-policy">
          By signing up you indicate that you have read and agree to the <a href="../../../about/terms_and_conditions/" target="_blank">Terms of Service</a> and <a href="../../../privacy-policy/" target="_blank">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
