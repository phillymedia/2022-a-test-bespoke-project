import React from "react";

import Caption from "../Caption";

const getAlignmentClass = (align) => {
  if (align === "wide") return "inno-uncontent";
  else if (align === "full") return "inno-uncontain";
  else return "";
};

const Video = ({ id, streams, autoplay, poster = "", caption, credit, align = null }) => {
  let streamHeight = align == 'wide' || align == 'full' ? 720 : 480;
  let stream = streams?.find( s => s.height == streamHeight && !s.url.includes('.m3u8') );

  return (
    <figure className={`inno-video ${getAlignmentClass(align)}`}>
      <div data-uuid={id}>
        <video className="inno-video__video inq-image inq-video" controlsList="nodownload" controls autoPlay={autoplay} poster={poster}>
          <source src={ stream?.url }/>
        </video>
      </div>
      <Caption caption={caption} credit={credit} />
    </figure>
  );
};

export default Video;
