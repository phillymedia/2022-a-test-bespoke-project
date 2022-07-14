import React from "react";

export default function Caption({ caption, credit }) {
  return caption || credit ? (
    <figcaption className='inno-caption inno-content'>
      {caption && <span className='inno-caption__caption-text'>{caption}</span>}
      {credit && <span className='inno-caption__credit'>{credit}</span>}
    </figcaption>
  ) : null;
}
