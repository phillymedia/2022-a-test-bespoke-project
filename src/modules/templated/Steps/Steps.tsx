import React from "react";
import Paragraph from "../../templated/Paragraph";

const Steps = ({ steps }) => {
  return (
    <div className='inno-steps inno-uncontain js-steps'>
      <div className='inno-container'>
        <ul className='inno-steps__steps inno-content'>
          {steps.map(step => (
            <li className={`inno-steps__step inno-steps__step--${step.step} js-steps-step`} data-step={step.step}>
              <Paragraph>{step.text}</Paragraph>
            </li>
          ))}
        </ul>
      </div>

      <div className='inno-steps__content'>
        {/* Fixed content goes here */}
      </div>
    </div>
  );
};

export default Steps;
