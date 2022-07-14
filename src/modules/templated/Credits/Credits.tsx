import React from "react";

export default function ProjectCredits({ credits }) {
  return (
    <div className="inno-credits">
      <h3 className="inno-credits__header">Staff Contributors</h3>
      <ul className='inno-credits__roles'>
        {credits.map(({ role, names }) => (
          <li className='inno-credits__role'>
            <strong>{role}: </strong>
            {names}
          </li>
        ))}
      </ul>
    </div>
  );
}
