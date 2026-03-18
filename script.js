import DomEngine from './support/DomEngine.js';
// Two nested classes used in DomEngine.js
// import MetaData from './support/MetaData.js';
// import VerseData from './support/VerseData.js';

// cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
const domEngine = new DomEngine();

async function challenge() {
    await domEngine.getNewVerse();
}
// console.log(domEngine.audioPlayer);
await challenge()

