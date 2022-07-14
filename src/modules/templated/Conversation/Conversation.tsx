import React from "react";

import ArchieContent from "../ArchieContent";
import Image from "../Image";

const setCustomClasses = settings => {
  let classes = new Array;

  if (settings.border) {
    classes.push(`inno-conversation--border-${settings.border}`);
  }

  if (settings.alternating) {
    classes.push('inno-conversation--alternating')
  }

  if (settings.mood) {
    classes.push(`inno-conversation--mood-${settings.mood}`)
  }

  return classes.join(' ');
}

const handlise = function (str1) {
  return str1.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
};

const handliseAndPrepQuotes = quotes => {
  let speakers = new Array;
  let images = new Object;

  for (let quote of quotes) {
    quote.handle = handlise(quote.name);

    if (!speakers.includes(quote.handle)) {
      speakers.push(quote.handle);
    }

    if (quote.image && !images[quote.handle]) {
      images[quote.handle] = quote.image
    }

    quote.image = quote.image || images[quote.handle];
    quote.speakerIndex = speakers.indexOf(quote.handle);
  }

  return quotes;
}


export default function Conversation({ quotes, border = null, alternating = null, mood = null }) {
  const settings = {
    border: border || "conversation",
    alternating: alternating,
    mood: mood || "lively"
  };

  quotes = handliseAndPrepQuotes(quotes);

  return (
    <div className={`inno-conversation ${setCustomClasses(settings)}`}>
      <ul className={'inno-conversation__quotes'}>
        {quotes.map(({ name, label, body, speakerIndex, image }) => {
          return (
            <li className={`inno-conversation__quote inno-conversation__quote--${ speakerIndex }`}>

              {image &&
                <div className="inno-conversation__quote-portrait">
                  <Image srcSet={image.srcSet} />
                  <div className="conversation-quote__portrait--deco"></div>
                </div>
              }
              <div className="inno-conversation__quote-body">
                <div className="inno-conversation__quote-name">{ name }</div>
                <div className="inno-conversation__quote-label">{ label }</div>
                <ArchieContent data={body} options={{dropCap: false}} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
