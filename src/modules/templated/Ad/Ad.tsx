import React from "react";
import story from "../../../data/story.json";

let currentAd = 0;


const Ad = ({ slotName, size = "" }) => {
  const articleId = story._id;

  currentAd++;
  const id = `ad${currentAd}010`;

  return (
    <div
      id={`${id}-sticky`}
      data-ad-name="cube"
      data-article-id={ articleId }
      data-id={id}
      data-slotName={slotName}
      data-size={size}
      className={`inno-ad inno-ad--${currentAd} inno-uncontain js-inno-ad-wrapper arc-ad-wrapper container-column spaced spaced-top spaced-lg righ-rail-ad-desktop`}
    >
      <div className="container-row justify-center">
        <div
          id={id}
          className='arcad ad-responsive js-inno-ad'
        ></div>
      </div>
    </div>
  );
};

export default Ad;
