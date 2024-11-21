// Definisikan daftar lagu dengan URL audio dan thumbnail untuk setiap lagu
const songs = [
    { id: "song1", title: "Breaking The Chain", artist: "Bloviat", url: "songs/Breaking The Chain.mp3", thumbnail: "./Gambar/Breaking The Chain.png" },
    { id: "song2", title: "Bunga Kertas Merah Berduri", artist: "Romi Jahat", url: "songs/Romi Jahat - Bunga Kertas Merah Berduri.mp3", thumbnail: "./Gambar/Bunga Merah Berduri.png" },
    { id: "song3", title: "Magic And Mystery", artist: "Artist Dazzle", url: "songs/Magic And Mystery.mp3", thumbnail: "./Gambar/Magic And Mystery.png" },
    { id: "song4", title: "Revenge Is Mine", artist: "Artist Dazzle", url: "songs/Revenge Is Mine.mp3", thumbnail: "./Gambar/Revenge Is Mine.png" },
    { id: "song5", title: "Vanity And Void", artist: "Artist Dazzle", url: "songs/Vanity and Void.mp3", thumbnail: "./Gambar/Vanity And Void.png" },
    { id: "song6", title: "Crawling For The Mercy", artist: "Artist Dazzle", url: "songs/Crawling For The Mercy.mp3", thumbnail: "./Gambar/Vanity And Void.png" },
    { id: "song7", title: "Purge", artist: "Artist Dazzle", url: "songs/Purge.mp3", thumbnail: "./Gambar/Vanity And Void.png" }
];

// Element references
const playlistItems = document.getElementById('playlist-items');
const addSongButton = document.getElementById('add-song-btn');
const songTitleInput = document.getElementById('song-title');
const nowPlaying = document.getElementById('now-playing');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

// Default song details jika lagu tidak ditemukan (gunakan gambar dan URL default)
const defaultSongUrl = 'https://www.example.com/default-song.mp3'; // Ganti dengan URL lagu default Anda
const defaultSongImage = 'https://via.placeholder.com/50'; // Ganti dengan URL gambar default Anda

// Fungsi untuk menambahkan lagu ke playlist
addSongButton.addEventListener('click', () => {
    const title = songTitleInput.value.trim();

    if (!title) {
        alert('Please provide the song title!');
        return;
    }

    // Cek apakah lagu ada di daftar lagu (songs)
    const song = songs.find(song => song.title.toLowerCase() === title.toLowerCase());

    // Jika lagu ditemukan, gunakan detail lagu tersebut
    const songUrl = song ? song.url : defaultSongUrl;
    const songThumbnail = song ? song.thumbnail : defaultSongImage;
    const songArtist = song ? song.artist : 'Unknown Artist';

    // Membuat elemen li untuk lagu
    const li = document.createElement('li');

    // Menambahkan gambar thumbnail
    const img = document.createElement('img');
    img.src = songThumbnail; // Gunakan thumbnail dari lagu yang ditemukan atau gambar default
    li.appendChild(img);

    // Menambahkan judul dan artis lagu
    const span = document.createElement('span');
    span.textContent = `${title} - ${songArtist}`;
    li.appendChild(span);

    // Menambahkan tombol play untuk lagu
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {
        nowPlaying.textContent = `Now Playing: ${title} - ${songArtist}`;
        audioSource.src = songUrl; // Gunakan URL lagu yang ditemukan atau URL default
        audioPlayer.load();
        audioPlayer.play();
    });
    li.appendChild(playButton);

    // Menambahkan tombol hapus untuk lagu
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        li.remove(); // Menghapus lagu dari playlist
    });
    li.appendChild(removeButton);

    // Menambahkan lagu ke dalam playlist
    playlistItems.appendChild(li);

    // Menghapus teks placeholder setelah menambahkan lagu
    if (playlistItems.querySelector('li')) {
        playlistItems.querySelector('li').remove(); // Hapus teks "No songs added yet."
    }

    // Mengosongkan input setelah lagu ditambahkan
    songTitleInput.value = '';
});
