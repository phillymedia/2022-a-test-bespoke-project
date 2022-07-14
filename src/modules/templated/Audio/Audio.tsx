import React from "react";

const Audio = ({ file, title }) => {

  const path = file.substr(0, 4) == "http" ? file : `__PATH__/${file}`;

  return (
    <div className="inno-audio js-audio" data-name={ path }>
      <audio className="js-audio-source">
        <source src={ path } type="audio/mpeg" />
      </audio>

      <div className="inno-audio__controls">
        <button className="inno-audio__playpause js-audio-playpause is-paused">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="inno-audio__icon inno-audio__playpause--play" >
            <path d="m68.945 50-37.891-21.875v43.75z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="inno-audio__icon inno-audio__playpause--pause">
            <g>
              <path d="m18.75 0c-8.6289 0-15.625 6.9961-15.625 15.625v68.75c0 8.6289 6.9961 15.625 15.625 15.625h6.25c8.6289 0 15.625-6.9961 15.625-15.625v-68.75c0-8.6289-6.9961-15.625-15.625-15.625z" />
              <path d="m75 0c-8.6289 0-15.625 6.9961-15.625 15.625v68.75c0 8.6289 6.9961 15.625 15.625 15.625h6.25c8.6289 0 15.625-6.9961 15.625-15.625v-68.75c0-8.6289-6.9961-15.625-15.625-15.625z" />
            </g>
          </svg>

        </button>
      </div>

      <div className="inno-audio__main">
        <div className="inno-audio__title">
          <span className="inno-audio__msg">
            {title} <span className="inno-audio__duration js-audio-duration" />
          </span>

          <span className="inno-audio__loading-msg">Loading...</span>
        </div>

        <div className="inno-audio__waveform js-audio-waveform"></div>

        <div className="inno-audio__player js-audio-player is-hidden">
          <div className="inno-audio__rewind"></div>

          <div className="js-audio-track">
            <div className="inno-audio__track">
              <div className="inno-audio__track-bar js-audio-track-bar" />
            </div>
          </div>

          <div className="inno-audio__time js-audio-time">00:00</div>
        </div>
      </div>
    </div>
  );
};

export default Audio;
