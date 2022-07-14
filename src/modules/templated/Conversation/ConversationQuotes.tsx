import React from "react";
import ArchieContent from "../ArchieContent";

const parameterize = str1 => {
    return str1.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
};

const hashCode = value => {
    var hash = 0;
    if (value.length == 0) return hash;
    for (var i = 0; i < value.length; i++) {
        var char = value.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs( hash );
}

const nameToIndex = (name, length) => {
  return hashCode(name) % length;
}

const hydrateSpeaker = (speaker, colors) => {
  return {
    name: speaker.name,
    contrast: speaker.contrast || "light",
    color: speaker.color || colors[ nameToIndex( speaker.name, colors.length ) ],
    image: speaker.image || `__PATH__/${parameterize(speaker.name)}.jpg`
  };
}


export default function ConversationQuotes({ quotes, mood="lively", border="none", alternating=false, speakers=[] }) {
  const colors = ["--color-one", "--color-two", "--color-three", "--color-four", "--color-five"];

  return (
    <div className={`conversation-quotes__container conversation-border__${border} ${ alternating && "alternating" } mood-${ mood }`}>
      {quotes.map(({ name, label, text }) => {
        const speaker = hydrateSpeaker( speakers.find( s => s.name == name ) || { name }, colors );
        return <ConversationQuote name={ name } label={label} text={text} image={ speaker.image } color={ speaker.color } contrast= { speaker.contrast }  />
      })}
    </div>
  );
}


function ConversationQuote({ name, label, image, text, color = "", contrast = "" }) {
  const style = {};

  if (color)
    style["--quote-color"] = color.substring(0, 2) == "--" ? `var(${color})` : color;

  return (
    <div className={`conversation-quote ${ contrast }`} style={ style }>
      <div className="conversation-quote__portrait">
        <img src={image}/>
        <div className="conversation-quote__portrait--deco"></div>
      </div>

      <div className="conversation-quote__body">
        <div className="conversation-quote__name">{ name }</div>
        <div className="conversation-quote__label">{ label }</div>
        <ArchieContent data={text} options={{dropCap: false}} />
      </div>
    </div>
  );
}
