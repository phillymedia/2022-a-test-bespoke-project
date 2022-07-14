import React from 'react';

const handlise = string => {
  if (string) {
    return string.toLowerCase('').replace(/ /g, '-').replace(/[^A-Za-z0-9-]/g, '');
  }
}

const Heading = ({ text }) => {
  return (
    <h2 className='inno-heading' id={handlise(text)}>{text}</h2>
  );
};

export default Heading;
