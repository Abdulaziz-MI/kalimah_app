# :fountain_pen: kalimah 
The Quran-based application intended to strengthen your companionship with the Quran and Arabic language.

Kalimah - https://abdulaziz-mi.github.io/kalimah_app/

## :computer: On Computer:

<img width="1440" alt="Screenshot 2023-02-13 at 16 31 35" src="https://user-images.githubusercontent.com/107209170/218515743-84d7a588-7644-4ef1-b990-99b52307c405.png">



## :iphone: On Mobile (with answer revealed)

<p align="center">
<img width="494" alt="Screenshot 2023-02-13 at 16 32 54" src="https://user-images.githubusercontent.com/107209170/218516192-72165bae-8182-472f-bf4a-b924f67f9c89.png">
</p>





## :ledger: Table Of Content 

### - [About](#beginner-about)
### - [Technology](#zap-technology)
### - [Challenge](#computer-challenge)
### - [Development](#wrench-development)



##  :beginner: About
This  application is designed to aid students of the Arabic language, to immerse themselves in the Arabic language through the Quran. 

Anyone that has learnt language beyond their mother tongue will tell say 'you must busy yourself with the language' they refer to reading, listening, and speaking the new language. This app is designed for the user to fulfil that by listening, reading and pondering over Arabic verses and scholarly explanations.



## :zap: Technology
HTML | CCS and Bootstrap | Vanilla JavaScript | APIs | 

This is a front-end app that makes API get requests for the verse data via Quran.com's API:
https://quran.api-docs.io/v4/getting-started/introduction

For this API, I used Postman to help me with the get request. I had to develop a method of getting a verse index in this format ${A:B}

A = Surah/Chapter number

B = Ayah/Verse number

I used support/metadata.json which has each chapter of the Quran and their verse count alongside other information. Then in MetaData.js, I developed methods to generate and store the needed data for the API and challenge. such as chapter name and verse index.

In VerseData.js I used the data from MetaData.js to make the API fetch request for the verse, audio, translation, and scholarly explanation.

In DomEngine.JS I manipulated the DOM and set the value for every relevant HTML element (basically integrated JS with the HTML to make a fully-functional webpage with information and functional buttons.

And finally, in Script.js all of these files are used to make this functional application.



## :computer: Challenge

A random verse and its translation will be presented from the Quran. One word will be missing from the translation. The user is expected to read the Arabic verse and figure out the missing word from the translation, using the text input. After submitting the correct answer, a scholarly explanation of the verse will be displayed with a success message. There is also a reveal button in case the user gets stuck.

Translations often don't give the full meaning especially since Arabic is a rich language, so if you recall the correct meaning and understanding of the word then you are successful, It is about understanding.



## :wrench: Development

The project is in the beginning stage, I aim to make massive changes and add new features when I find the time.

Features and additions:
 - Multiple choice mode (Same concept of the challenge, but using clickable words instead of submitting via text input)
 - Backend (User login, User statistics)
 - Daily challenges
 - User preferences (Language, reciter, scholarly explanation)
