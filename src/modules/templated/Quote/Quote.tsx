import React from "react";
import { Markdown } from "../ArchieContent";

const getAlignmentClass = (align) => {
  if (align) {
    if (align === "wide") {
      return "inno-uncontent";
    } else {
      return `inno-quote--${align}`;
    }
  } else {
    return "";
  }
};

export default function Quote({ text, credit, align }) {
  return (
    <figure className={`inno-quote ${getAlignmentClass(align)}`}>
      <div className="inno-quote__text">
        <Markdown data={text} />
      </div>
      <div className="inno-quote__credit">
        <Markdown data={credit} />
      </div>
    </figure>
  );
}
