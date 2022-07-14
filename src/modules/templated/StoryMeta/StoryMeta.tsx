import React, { Fragment } from "react";
import dayjs from "dayjs";

import story from "../../../data/story.json";

export default function StoryMeta({ isUpdated = false }) {
  const getAuthors = () => {
    return story.credits && story.credits.by
      ? story.credits.by.filter(
        author =>
          typeof author !== 'undefined' &&
          ((author['_id'] && author['_id'] !== 'no_author') || !author['_id']),
      )
      : [];
  };

  const renderAuthors = () => {
    const authors = getAuthors();
    const authorCount = authors.length;

    if (authorCount === 0) {
      return null;
    } else if (authorCount === 1) {
      return renderAuthor(authors[0]);
    } else if (authorCount === 2) {
      return (
        <Fragment>
          {renderAuthor(authors[0])} and {renderAuthor(authors[1])}
        </Fragment>
      )
    } else {
      return (
        authors.map((author, i) => {
          const isLast = i === authorCount - 1;
          return <Fragment>{isLast ? 'and ': ''}{renderAuthor(author)}{isLast ? '' : ', '}</Fragment>
        })
      )
    }
  };

  const renderAuthor = author => {
    if (author.url) {
      return (
        <a href={author.url} title={author.name} className="inno-story-meta__author-link">
          {author.name}
        </a>
      )
    } else {
      return (
        author.name
      )
    }
  }

  const outputDateTime = date => {
    if (date !== '') {
      let pubDate = dayjs(date);
      let month = pubDate.format('MMM');
  
      return `${month} ${pubDate.format('D, YYYY')}`;
    }
  
    return null;
  };

  return (
    <div className='inno-story-meta inno-content'>
      {story && (
        <ul className="inno-story-meta__content">
          <li className="inno-story-meta__authors">
            By {renderAuthors()}
          </li>
          <li className="inno-story-meta__timestamp js-timestamp">
            <span className="inno-story-meta__timestamp-label">Published </span>
            <span className="inno-story-meta__timestamp-date js-timestamp-date">{story?['display_date'] && outputDateTime( story['display_date']) : null }</span>
          </li>
        </ul>
      )}
    </div>
  );
}
