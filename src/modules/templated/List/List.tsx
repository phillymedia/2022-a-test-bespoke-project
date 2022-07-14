import React from 'react';
import Paragraph from '../Paragraph';

const List = ({ items }) => {
  return (
    <ul className='inno-list'>
      {items.map(item => (
        <li className='inno-list__item'>
          <Paragraph>{item.value}</Paragraph> 
        </li>
      ))}
    </ul>
  );
};

export default List;
