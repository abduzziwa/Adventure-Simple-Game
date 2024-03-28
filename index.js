const readline = require("readline");
const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const winArt = `
██╗   ██╗ ██████╗ ██╗   ██╗    ██╗    ██╗██╗███╗   ██╗
╚██╗ ██╔╝██╔═══██╗██║   ██║    ██║    ██║██║████╗  ██║
 ╚████╔╝ ██║   ██║██║   ██║    ██║ █╗ ██║██║██╔██╗ ██║
  ╚██╔╝  ██║   ██║██║   ██║    ██║███╗██║██║██║╚██╗██║
   ██║   ╚██████╔╝╚██████╔╝    ╚███╔███╔╝██║██║ ╚████║
   ╚═╝    ╚═════╝  ╚═════╝      ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝
`;

const welcomeArt = `
WW   W    WW  EEEEE  LL       CCCCC    OOOOO   MM        MM  EEEEE  !!!
WW  W  W  WW  EE     LL      CC       OO   OO  MMM      MMM  EE     !!!
WW W    W WW  EEEEE  LL      CC       OO   OO  MM M    M MM  EEEEE  !!!
WWW      WWW  EE     LL      CC       OO   OO  MM  M  M  MM  EE     !!!
W         WW  EEEEE  LLLLLL   CCCCC    OOOOO   MM   MM   MM  EEEEE  !!!
`;

const author = `
/*********************************************************************
* Author: Abdul G Zziwa
* Date: 28/03/2024
* Description: Treasure Hunt Game
* Version: 1.0.0
* Usage: node index.js
* Enjoy the game!
* Want to chart with the author main me "abdulzziwa007@outlook.com"
**********************************************************************/`;
const loseArt = `
HH  HH  EEEEE  LL      AAAA    AAAA   SSSS
HH  HH  EE     LL     AA  AA  AA  AA  SS
HHHHHH  EEEE   LL     AAAAAA  AAAAAA  SSSS
HH  HH  EE     LL     AA  AA  AA  AA    SS
HH  HH  EEEEE  LLLLL  AA  AA  AA  AA  SSSS
`;
console.log(author);
console.log(welcomeArt);
console.log("Welcome to the treasure hunt game!\n");

const story = {
  start: {
    message: "Je bevindt je aan de rand van de jungle, met twee paden voor je:",
    options: [
      {
        text: "Dit pad leidt door een dicht struikgewas van doornen",
        next: "caveOrPath",
      },
      {
        text: "Dit pad lijkt duidelijk en goed begaanbaar te zijn",
        next: "riverOrPath",
      },
    ],
  },
  caveOrPath: {
    message:
      "Je duwt je een weg door het struikgewas, verdraagt krassen en snijwonden onderweg. Uiteindelijk kom je uit in een open plek en vind je een verborgen grot.",
    options: [
      { text: "Ga je de grot binnen?", next: "win" },
      { text: "Ga je verder op het pad?", next: "riverOrPath" },
    ],
  },
  riverOrPath: {
    message:
      "Je volgt het goed begaanbare pad en komt bij een rivier. Probeer je de rivier over te steken of zoek je een andere route?",
    options: [
      { text: "Probeer de rivier over te steken?", next: "loseRiver" },
      { text: "Zoek je een andere route?", next: "losePath" },
    ],
  },
  win: {
    message: "Je hebt de schatkist gevonden!!!",
    action: () => {
      console.log(winArt);
      console.log("Congratulations! YOU WON the game!");
      process.exit();
    },
  },
  loseRiver: {
    message: "Je kon de rivier niet oversteken.. HET EINDE",
    action: () => {
      console.log(`
      ${loseArt} 
      Eindigt hier je reis. Volgende keer beter!`);
      process.exit();
    },
  },
  losePath: {
    message: "Na jaren zoeken heb je de schatkist niet gevonden... HET EINDE",
    action: () => {
      console.log(
        "Je bent aan het einde van je avontuur gekomen. Bedankt voor het spelen!"
      );
      process.exit();
    },
  },
};

function playStory(part) {
  const section = story[part];
  console.log(section.message);
  if (section.options) {
    console.log("\n");
    section.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option.text}`);
    });
    console.log("\n");
    inquirer.question("Maak je keuze:", (choice) => {
      const option = section.options[parseInt(choice) - 1];
      if (option) {
        playStory(option.next);
      } else {
        console.log("Ongeldige keuze! Probeer het opnieuw.");
        playStory(part);
      }
    });
  } else if (section.action) {
    section.action();
  }
}

playStory("start");
