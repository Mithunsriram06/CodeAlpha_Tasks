const songs = [
  { title: "I Wanna Watch Boys To (Mashup)", artist: "Arctic Monkeys, Lana Del Rey", file: "songs/Arctic Monkeys, Lana Del Rey - I Wanna Watch Boys To (Mashup).m4a" },
  { title: "The Greatest View (feat. Isabella Manfredi)", artist: "Flume", file: "songs/Flume - The Greatest View (feat. Isabella Manfredi).m4a" },
  { title: "Bad At Love", artist: "Halsey", file: "songs/Halsey - Bad At Love.m4a" },
  { title: "What Do You Mean [Instrumental]", artist: "Justin Bieber", file: "songs/Justin Bieber - What Do You Mean [Instrumental].m4a" },
  { title: "Diet Mountain Dew", artist: "Lana Del Rey", file: "songs/Lana Del Rey _ Diet Mountain Dew (Demo).m4a" },
  { title: "West Coast (Instrumental)", artist: "Lana Del Rey", file: "songs/Lana Del Rey - West Coast (Instrumental).m4a" },
  { title: "White Mustang", artist: "Lana Del Rey", file: "songs/Lana Del Rey - White Mustang.m4a" },
  { title: "Unite!", artist: "Unknown Artist", file: "songs/Unite!.m4a" },
  { title: "Dusk Till Dawn ft. Sia ", artist: "ZAYN", file: "songs/ZAYN - Dusk Till Dawn ft. Sia (Lyrics).mp3" },
  { title: "if depression gets the best of me", artist: "Zevia", file: "songs/Zevia - if depression gets the best of me (Lyrics).m4a" },
  
];

let currentIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;

  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

function playPauseSong() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

playBtn.addEventListener("click", playPauseSong);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentIndex = index;
    loadSong(index);
    audio.play();
  });
  playlist.appendChild(li);
});

loadSong(currentIndex);
volume.value = 0.5;
audio.volume = 0.5;
