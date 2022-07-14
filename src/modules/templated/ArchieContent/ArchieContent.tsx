import React, { Fragment } from "react";
import MarkdownIt from "markdown-it";

import Ad from "../Ad";
import Audio from "../Audio";
import Caption from "../Caption";
import Credits from "../Credits";
import Combo from "../Combo";
import Conversation from "../Conversation";
import Divider from "../Divider";
import EndmarkParagraph from "../Endmark";
import Graphic from "../Graphic";
import Heading from "../Heading";
import HTML from "../HTML";
import Hero from "../Hero";
import Image from "../Image";
import List from "../List";
import Newsletter from "../Newsletter";
import Note from "../Note";
import Paragraph from "../Paragraph";
import Quote from "../Quote";
import Related from "../Related";
import Timeline from "../Timeline";
import Video from "../Video";
import Subscribe from "../Subscribe";
import Steps from "../Steps";
import LoopingVideo from "../LoopingVideo";

const md = new MarkdownIt();

export const RenderContent = (data, renderers = null, options = null) => {
  const defaultOptions = {
    dropCap: true,
  };

  let opts = { ...defaultOptions, ...options };

  let dropCap = 0;

  const defaultRenderers = {
    ad: (slotName) => <Ad slotName={slotName} />,
    audio: ({ file, title }) => <Audio file={file} title={title} />,
    caption: ({ caption, credit }) => <Caption caption={caption} credit={credit} />,
    credits: (value) => <Credits credits={value} />,
    combo: (value) => <Combo data={value} renderers={rends} />,
    conversation: ({ quotes, border, mood, alternating }) => <Conversation quotes={quotes} border={border} mood={mood} alternating={alternating} />,
    divider: () => <Divider />,
    endmark: (value, i) => (
      <EndmarkParagraph>{ value }</EndmarkParagraph>
    ),
    group: (value) => <div className="inno-group"><ArchieContent data={value} renderers={rends} options={opts} /></div>,
    graphic: ({ id, height, align }) => <Graphic id={id} height={height} align={align} />,
    heading: (value) => <Heading text={value} />,
    hero: (value) => <Hero data={value} />,
    html: ({ code, align }) => <HTML code={code} align={align} />,
    image: ({ srcSet, caption, credit, align }) => (
      <Image srcSet={srcSet} caption={caption} credit={credit} align={align} />
    ),
    loopingvideo: ({ url, caption, credit, align, image }) => <LoopingVideo url={url} caption={caption} credit={credit} align={align} poster={image} />,
    list: (value) => <List items={value} />,
    newsletter: ({ title, description, id }) => <Newsletter title={title} description={description} id={id} />,
    note: (value) => <Note body={value} />,
    pre: ({ value }) => <pre dangerouslySetInnerHTML={{ __html: value.replace(/^(\s*)([[{]\.?\+?.*[\]}])/gm, `$1<span class="tag">$2</span>`).replace(/^(\s*)([a-z]*:)/gm, `$1<span class="tag">$2</span>`) }} />,
    text: (value, i) => (
      <Paragraph dropcap={opts.dropCap && dropCap-- == 0}>{value}</Paragraph>
    ),
    quote: ({ text, credit, align }) => <Quote text={text} credit={credit} align={align} />,
    related: (story) => <Related story={story} />,
    steps: (value) => <Steps steps={value} />,
    subscribe: ({ title, description }) => <Subscribe title={title} description={description} />,
    timeline: (value) => <Timeline data={value} />,
    video: ({ id, streams, autoplay, poster, caption, credit, align }, i) => (
      <Video id={id} streams={streams} autoplay={autoplay} poster={poster} caption={caption} credit={credit} align={align} />
    ),
  };

  let rends = { ...defaultRenderers, ...renderers };

  const bodyContent = data.map(({ type, value }, i) => {
    if (rends[type]) return rends[type](value, i);
    else return <Fragment />;
  });

  return bodyContent;
};

export const WrapContent = (content, defaultType, types) => {
  const wrapperType = (type) => types[type] || defaultType;

  const arrayedContent = content.reduce((arrays, content) => {
    const array = arrays[arrays.length - 1];
    const type = array.length > 0 ? array[0].type.name : content.type.name;

    if (wrapperType(content.type.name) == wrapperType(type)) {
      array.push(content);
    } else {
      const newArray = [];
      newArray.push(content);
      arrays.push(newArray);
    }

    return arrays;
  }, [[]]);

  const wrappedContent = arrayedContent.map((children) => {
    return <div className={wrapperType(children[0].type.name)}>{children}</div>;
  });

  return wrappedContent;
};

export const renderMarkdownInline = (data) => {
  return md.renderInline(data);
};

export const Markdown = ({ data }) => {
  return <span dangerouslySetInnerHTML={{ __html: md.renderInline(data) }} />;
};

export const ArchieContent = ({ data, renderers = null, options = null }) => {
  return <Fragment>{RenderContent(data, renderers, options)}</Fragment>;
};

export default ArchieContent;
