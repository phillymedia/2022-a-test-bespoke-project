import React from "react";

const getAlignmentClass = (align) => {
  if (align === "wide") return "inno-uncontent";
  else if (align === "full") return "inno-uncontent";
  else return "";
};

const Graphic = ({ id, height = 450, align = "default" }) => {
  if (id.includes("datawrapper")) {
    id = id.replace("https://www.datawrapper.de/_/", "").replace("/", "");

    return (
      <div className={`inno-graphic ${getAlignmentClass(align)}`}>
        <iframe
          className="inno-graphic__datawrapper"
          id={`datawrapper-chart-${id}`}
          src={`//datawrapper.dwcdn.net/${id}`}
          scrolling="no"
          frameBorder="0"
          height={height}
        ></iframe>
      </div>
    );
  } else if (id.includes("ai2html")) {
    id = id
      .replace("https://media.inquirer.com/storage/inquirer/ai2html/", "")
      .replace("preview.html", "")
      .replace("/", "");

    return (
      <div className={`inno-graphic ${getAlignmentClass(align)}`}>
        <div
          className="inno-graphic__ai2html js-ai2html-graphic"
          id={`ai2html-graphic-${id}`}
          data-analytics-viewport="autotune"
          data-analytics-label={id}
          data-iframe-fallback={`https://media.inquirer.com/storage/inquirer/ai2html/${id}/fallback-mobile.jpg`}
          data-iframe={`https://media.inquirer.com/storage/inquirer/ai2html/${id}/index.html`}
          data-iframe-height={height}
          data-iframe-resizable
        ></div>
      </div>
    );
  } else {
    return (
      <div className={`inno-graphic ${getAlignmentClass(align)}`}>
        <iframe
          className='inno-graphic__iframe'
          src={id}
          height={height}
        ></iframe>
      </div>
    )
  }
};

export default Graphic;
