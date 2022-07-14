import React from "react";

import Caption from "../Caption";

const srcSetArrayToString = (srcSet) => {
  return srcSet.reverse().map((src, i) => {
    return `${src.src} ${src.size}w${srcSet.length !== i ? "," : ""}`;
  });
};

const getAlignmentClass = (align) => {
  if (align) {
    if (align === "full") {
      return "inno-uncontain";
    } else if (align === "wide") {
      return "inno-uncontent";
    } else {
      return `inno-image--${align}`;
    }
  } else {
    return "";
  }
};

const Image = ({ srcSet, caption = null, credit = null, align = null }) => {
  return (
    <figure className={`inno-image ${getAlignmentClass(align)}`}>
      {srcSet && (
        <img
          className="inno-image__img"
          src={srcSet[0]?.src}
          srcSet={srcSetArrayToString(srcSet)}
          sizes="100vw"
        />
      )}
      <Caption caption={caption} credit={credit} />
    </figure>
  );
};

export default Image;
