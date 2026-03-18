import MetaData from "./MetaData.js"

export default class VerseData {
    constructor(verseIndex) {
        this.verseIndex = verseIndex
        this.randomReciter = this.pickRandomReciter(Object.values(this.reciters));
        this.reciterName = Object.keys(this.reciters).find(key => this.reciters[key] === this.randomReciter);
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    reciters = {
        "Mohammed Al-Minshawi": "ar.minshawi",
        "Mishary Al-Afasy": "ar.alafasy",
        "AbdulBaset AbdulSamad": "ar.abdulbasitmurattal"
    };

    pickRandomReciter(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    randomReciter = this.pickRandomReciter(Object.values(this.reciters));

    cleanWord(word) {
        return word.replace(/[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~˹˺""]/g, "").toLowerCase().trim();
    }

    pickMeaningfulWordIndex(words) {
        const stopWords = new Set([
            "the", "and", "for", "that", "this", "with", "from", "they", "have", "will",
            "not", "are", "was", "his", "her", "him", "our", "your", "its", "but", "then",
            "when", "who", "what", "whom", "which", "upon", "over", "unto", "into", "also",
            "their", "them", "than", "been", "were", "all", "one", "two", "has", "had", "you",
            "he", "she", "it", "we", "is", "of", "to", "a", "an", "be", "do", "in", "on", "at", "by"
        ]);
        const candidates = [];
        for (let i = 0; i < words.length; i++) {
            const clean = this.cleanWord(words[i]);
            if (clean.length >= 4 && !stopWords.has(clean)) {
                candidates.push(i);
            }
        }
        return candidates.length > 0
            ? candidates[this.randomInt(0, candidates.length - 1)]
            : this.randomInt(0, words.length - 1);
    }

    async getQuranAndAudio() {
        const [surah, ayah] = this.verseIndex.split(":");
        // en.sahih = Saheeh International, a confirmed working English translation
        const url = `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.sahih,${this.randomReciter}`;
        const response = await fetch(url);
        const json = await response.json();

        if (json.code !== 200 || !json.data || json.data.length < 3) {
            throw new Error(`API error: ${json.status || 'unknown'}`);
        }

        const arabicData = json.data[0]; // Arabic
        const translationData = json.data[1]; // English (Saheeh International)
        const audioData = json.data[2]; // Audio

        // Arabic verse shown as-is
        this.verse = arabicData.text;

        // English translation — strip HTML tags
        const cleanedTranslation = translationData.text.replace(/<[^>]*>/g, "").trim();
        this.verseTranslated = cleanedTranslation;

        // Pick a meaningful English word to blank out
        const words = cleanedTranslation.split(" ");
        const missingIndex = this.pickMeaningfulWordIndex(words);
        this.missingWord = this.cleanWord(words[missingIndex]);

        const challengeWords = [...words];
        challengeWords[missingIndex] = "____";
        this.verseForChallenge = challengeWords.join(" ");

        this.audio = audioData.audio;
    }

    async getTafsir() {
        const [surah, ayah] = this.verseIndex.split(":");
        try {
            // quranapi.pages.dev — returns Ibn Kathir, Maarif ul Quran, Tazkirul Quran per ayah
            const url = `https://quranapi.pages.dev/api/tafsir/${surah}_${ayah}.json`;
            const response = await fetch(url);
            const json = await response.json();

            // Use Ibn Kathir (index 0) — strip markdown headings (##) and clean up
            const ibnKathir = json.tafsirs[0];
            const rawContent = ibnKathir.content
                .replace(/^##.+$/gm, "")   // remove markdown headings
                .replace(/\n{3,}/g, "\n\n") // collapse excess newlines
                .trim();

            this.tafsir = rawContent;
            this.tafsirEnglishName = "Ibn Kathir";
            this.tafsirName = "ابن كثير";
        } catch (err) {
            console.warn("Tafsir fetch failed:", err);
            this.tafsir = "Tafsir not available for this verse.";
            this.tafsirEnglishName = "";
            this.tafsirName = "";
        }
    }

    async getDataFromAPI() {
        await this.getQuranAndAudio();
        await this.getTafsir();
        return this;
    }
}