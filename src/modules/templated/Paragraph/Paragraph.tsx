import React from "react";
import { renderMarkdownInline } from "../ArchieContent/ArchieContent";

export default function Paragraph({ children, dropcap = false }) {
  const isJSX = typeof children == 'object';
  const className = `inno-p ${dropcap ? 'inno-p--has-dropcap': ''}`

  if (isJSX) {
    return (
      <p className={className}>
        {children}
      </p>
    )
  } else {
    return (
      <p
        className={className}
        dangerouslySetInnerHTML={{ __html: renderMarkdownInline(children) }}
      />
    )
  }
}
