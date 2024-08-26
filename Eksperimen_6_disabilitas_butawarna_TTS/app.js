document.addEventListener('DOMContentLoaded', () => {
    let voices = [];  // Array untuk menyimpan suara yang didukung oleh browser

    // Fungsi untuk mendapatkan daftar suara dari Web Speech API
    const loadVoices = () => {
        voices = speechSynthesis.getVoices();
    };

    // Mengambil suara saat tersedia
    speechSynthesis.onvoiceschanged = loadVoices;

    // Fungsi untuk memilih suara yang sesuai dengan bahasa
    const getVoiceForLanguage = (lang) => {
        return voices.find(voice => voice.lang === lang) || voices[0]; // Default ke suara pertama jika tidak ada yang cocok
    };

    // Fungsi utama untuk memulai aplikasi
    const init = () => {
        loadVoices();  // Muat suara saat halaman dimuat

        // Dapatkan semua elemen teks dengan kelas 'text-hover'
        const textElements = document.querySelectorAll('.text-hover');

        // Tambahkan event listener untuk setiap elemen teks
        textElements.forEach(element => {
            element.addEventListener('mouseover', () => {
                const text = element.getAttribute('data-text');
                const lang = element.getAttribute('data-lang'); // Dapatkan bahasa dari atribut data
                const selectedVoice = getVoiceForLanguage(lang); // Dapatkan suara yang sesuai

                if (text && selectedVoice) {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.voice = selectedVoice; // Atur suara sesuai dengan bahasa
                    utterance.lang = lang; // Atur bahasa sesuai dengan data-lang
                    speechSynthesis.speak(utterance);
                }
            });

            element.addEventListener('mouseout', () => {
                speechSynthesis.cancel();
            });
        });
    };

    init(); // Panggil fungsi init saat halaman dimuat
});
