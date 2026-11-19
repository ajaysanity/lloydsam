export const BG_MUSIC_PAUSE_EVENT = "bg-music:pause";
export const BG_MUSIC_RESUME_EVENT = "bg-music:resume";

export function requestBackgroundMusicPause() {
  window.dispatchEvent(new Event(BG_MUSIC_PAUSE_EVENT));
}

export function releaseBackgroundMusic() {
  window.dispatchEvent(new Event(BG_MUSIC_RESUME_EVENT));
}
