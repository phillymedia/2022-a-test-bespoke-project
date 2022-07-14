import React from "react";

const getAlignmentClass = align => {
  if (align) {
    if (align === 'wide') {
      return 'inno-uncontent'
    } else {
      return `inno-image--${align}`
    }
  } else {
    return '';
  }
}

const HTML = ({ code, align }) => {
  return (
    <div className={`inno-html ${getAlignmentClass(align)}`} dangerouslySetInnerHTML={{__html: code}}></div>
  )
}

export default HTML;
