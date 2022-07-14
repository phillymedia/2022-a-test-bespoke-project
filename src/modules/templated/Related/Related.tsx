import React from "react";

export default function Related({story}) {
  return (
    <a className={`inno-related ${story.align ? `inno-related--${story.align}` : ''}`} href={`https://inquirer.com/${story.website_url}`}>
      <h2 className='inno-related__eyebrow'>{story.eyebrow ? story.eyebrow : 'Read More'}</h2>
      <div className='inno-related__content'>

        <h1 className='inno-related__headline'>{story.headlines?.basic || 'Set a basic headline in Composer'}</h1>
        {story.description && story.description.basic &&
          <p className='inno-related__description'>{story.description.basic}</p>
        }
      </div>
    </a>
  );
}
