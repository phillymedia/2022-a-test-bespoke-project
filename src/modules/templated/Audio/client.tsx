import analytics from "../../helper/analytics";

const AUDIO_EVENT = {
  PLAYED: "audio_play",
  COMPLETION: "audio_completion"
}


const toHHMMSS = function (sec_num) {
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

  const h = `${hours}`.padStart(2, "0");
  const m = `${minutes}`.padStart(2, "0");
  const s = `${seconds}`.padStart(2, "0");

  if (h == "00") return m + ":" + s;
  else return h + ":" + m + ":" + s;
};

const initAudioControls = () => {
  const embeds = document.getElementsByClassName("js-audio");

  for (let i = 0; i < embeds.length; i++) {
    const embed = embeds[i] as HTMLElement;

    const audio = embed.querySelector(".js-audio-source") as HTMLAudioElement;
    const playPauseBtn = embed.querySelector(".js-audio-playpause");
    const track = embed.querySelector(".js-audio-track");
    const trackBar = embed.querySelector(".js-audio-track-bar") as HTMLElement;
    const time = embed.querySelector(".js-audio-time");
    const duration = embed.querySelector(".js-audio-duration");
    const waveform = embed.querySelector(".js-audio-waveform");
    const player = embed.querySelector(".js-audio-player");

    audio.addEventListener("canplaythrough", () => {
      duration.innerHTML = `(${toHHMMSS(audio.duration)})`;
      time.innerHTML = toHHMMSS(audio.duration);
    });

    const updatePlayPauseBtn = () => {
      playPauseBtn.classList.remove("is-playing");
      playPauseBtn.classList.remove("is-paused");
      playPauseBtn.classList.add(audio.paused ? "is-paused" : "is-playing");
    };

    audio.addEventListener("play", updatePlayPauseBtn);
    audio.addEventListener("pause", updatePlayPauseBtn);

    track.addEventListener("click", (e: MouseEvent) => {
      const percent = e.offsetX / track.clientWidth;
      const destination = Math.floor(percent * audio.duration);
      audio.currentTime = destination;
    });

    let hasLogged = false;

    playPauseBtn.addEventListener("click", () => {
      if( !hasLogged ) {
        analytics.event( AUDIO_EVENT.PLAYED, embed.dataset.name );
        hasLogged = true;
      }

      waveform.classList.add("is-hidden");
      player.classList.remove("is-hidden");
      audio.paused ? audio.play() : audio.pause();
    });

    audio.addEventListener("timeupdate", () => {
      trackBar.style.width = 100 * (audio.currentTime / audio.duration) + "%";
      time.innerHTML = toHHMMSS(audio.duration - audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      analytics.event( AUDIO_EVENT.COMPLETION, embed.dataset.name );
    });
  }
};

export default {
  init: () => {
    initAudioControls();
  }
};
