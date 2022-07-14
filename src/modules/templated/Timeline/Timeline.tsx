import React from "react";

import TimelineCard from "./TimelineCard";
import Ad from "../Ad";

const handlise = string => {
  if (string) {
    return string.replace(/ /g, '-').toLowerCase();
  }
}

export default function Timeline({ data }) {
  return (
    <div className='inno-tl__body inno-uncontain js-timeline-body'>
      <div className='inno-container'>
        <div className='inno-tl__overview'>
          <div className='inno-tl__overview__header'>
            <h2 className='inno-tl__overview__title'>Overview</h2>
          </div>

          <ul className='inno-tl__overview__items'>
            {data.map( (item, i) => {
              return(
                <li className={'inno-tl__overview__item' + (data.length - 1 == i ? ' inno-tl__overview__item--last' : '')}>
                  <span className='inno-tl__overview__item-date'>{item.date}</span>
                  <a href={`#${handlise(item.date)}`} className='inno-tl__overview__item-title'>{item.title}</a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='inno-tl__timeline'>
          <ul className='inno-tl__timeline__items'>
            {data.map( item => {
              return(
                <li className='inno-tl__timeline__item js-timeline-item' id={handlise(item.date)}>
                  <TimelineCard item={item} />
                  {item.ad && <Ad slotName={item.ad} size="small" /> }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
