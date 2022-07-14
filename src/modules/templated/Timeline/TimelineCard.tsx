import React from "react";
import ArchieContent from "../ArchieContent";

function TimelineCard({ item }) {
  return (
    <div className="inno-tl__card">
      <p className='inno-tl__card__date'>{item.date}</p>
      <h3 className='inno-tl__card__title'>{item.title}</h3>

      <div className="inno-tl__card__body">
        <ArchieContent data={ item.body } options={{ dropCap: false }}/>
      </div>
    </div>
  );
}

export default TimelineCard;
