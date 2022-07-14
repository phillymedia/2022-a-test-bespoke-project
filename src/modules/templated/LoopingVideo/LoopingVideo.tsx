import React from "react";

import Caption from "../Caption";

const getAlignmentClass = (align) => {
  if (align === "wide") return "inno-uncontent";
  else if (align === "full") return "inno-uncontain";
  else return "";
};

const LoopingVideo = ({ url, caption, credit, align = null, poster = null }) => {
  return (
    <figure className={`inno-looping-video ${getAlignmentClass(align)}`}>
      <video className="inno-looping-video__video" loop playsInline muted={true} autoPlay poster={poster?.srcSet[2].src}>
        <source src={ url } type='video/mp4' />
      </video>
      <Caption caption={caption} credit={credit} />
    </figure>
  );
};

export default LoopingVideo;
