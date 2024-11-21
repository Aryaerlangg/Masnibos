// Daftar lagu dengan detail termasuk thumbnail
const songs = [
    { id: "song1", title: "Breaking The Chain", artist: "Bloviat", url: "songs/Breaking The Chain.mp3", thumbnail: "./Gambar/Breaking The Chain.png" },
    { id: "song2", title: "Bunga Kertas Merah Berduri", artist: "Romi Jahat", url: "songs/Romi Jahat - Bunga Kertas Merah Berduri.mp3", thumbnail: "./Gambar/Bunga Merah Berduri.png" },
    { id: "song3", title: "Magic And Mystery", artist: "Artist Dazzle", url: "songs/Magic And Mystery.mp3", thumbnail: "./Gambar/Magic And Mystery.png" },
    { id: "song4", title: "Revenge Is Mine", artist: "Artist Dazzle", url: "songs/Revenge Is Mine.mp3", thumbnail: "./Gambar/Revenge Is Mine.png" },
    { id: "song5", title: "Vanity And Void", artist: "Artist Dazzle", url: "songs/Vanity and Void.mp3", thumbnail: "./Gambar/Vanity And Void.png" },
    { id: "song6", title: "Crawling For The Mercy", artist: "Artist Dazzle", url: "songs/Crawling For The Mercy.mp3", thumbnail: "./Gambar/Vanity And Void.png" },
    { id: "song7", title: "Purge", artist: "Artist Dazzle", url: "songs/Purge.mp3", thumbnail: "./Gambar/Vanity And Void.png" }
];

// Fungsi untuk memutar lagu
function playMusic(songId) {
    const song = songs.find(s => s.id === songId);
    const nowPlaying = document.getElementById('now-playing');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');

    if (song) {
        audioSource.src = song.url;
        audioPlayer.load();
        audioPlayer.play();
        nowPlaying.textContent = `Now Playing: ${song.title} - ${song.artist}`;
    } else {
        console.error("Song not found:", songId); // Log jika lagu tidak ditemukan
    }
}

// Fungsi untuk menampilkan hasil pencarian
function displaySearchResults(query) {
    const results = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = ""; // Bersihkan hasil sebelumnya

    if (results.length > 0) {
        results.forEach(song => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("search-result-item");
            resultItem.style.display = "flex";
            resultItem.style.alignItems = "center";
            resultItem.style.marginBottom = "10px";
            resultItem.style.padding = "10px";
            resultItem.style.border = "1px solid #ddd";
            resultItem.style.borderRadius = "5px";
            resultItem.style.backgroundColor = "#f9f9f9";
            resultItem.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";

            resultItem.innerHTML = `
                <img src="${song.thumbnail}" alt="${song.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 10px;">
                <div style="flex-grow: 1;">
                    <span style="display: block; font-weight: bold;">${song.title}</span>
                    <span style="color: #aaa;">${song.artist}</span>
                </div>
                <button onclick="playMusic('${song.id}')" style="padding: 5px 10px; background-color: #1db954; color: white; border: none; border-radius: 5px; cursor: pointer;">Play</button>
            `;

            searchResultsContainer.appendChild(resultItem);
        });
    } else {
        searchResultsContainer.innerHTML = "<p>No results found.</p>";
    }
}

// Event listener untuk tombol pencarian
document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-bar").value.trim();
    if (query !== "") {
        displaySearchResults(query);
    } else {
        document.getElementById("search-results").innerHTML = "<p>Please enter a search query.</p>";
    }
});

// Element references
const playlistItems = document.getElementById('playlist-items');
const addSongButton = document.getElementById('add-song-btn');
const songTitleInput = document.getElementById('song-title');
const nowPlaying = document.getElementById('now-playing');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

// Default song details (URL and image can be customized)
const defaultSongUrl = 'https://www.example.com/default-song.mp3'; // Ganti dengan URL lagu default Anda
const defaultSongImage = 'https://via.placeholder.com/50'; // Ganti dengan URL gambar default Anda

// Add song to playlist
addSongButton.addEventListener('click', () => {
    const title = songTitleInput.value.trim();

    if (!title) {
        alert('Please provide the song title!');
        return;
    }

    const li = document.createElement('li');

    // Song Thumbnail
    const img = document.createElement('img');
    img.src = defaultSongImage; // Use default image
    li.appendChild(img);

    // Song Title
    const span = document.createElement('span');
    span.textContent = title;
    li.appendChild(span);

    // Play Button
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {
        nowPlaying.textContent = `Now Playing: ${title}`;
        audioSource.src = defaultSongUrl; // Use default URL
        audioPlayer.load();
        audioPlayer.play();
    });
    li.appendChild(playButton);

    // Remove Button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        li.remove();
    });
    li.appendChild(removeButton);

    // Add to Playlist
    playlistItems.appendChild(li);

    // Clear input
    songTitleInput.value = '';
});
