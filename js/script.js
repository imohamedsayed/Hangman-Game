const letter = "abcdefghijklmnopqrstuvwxyz";

let lettersArr = Array.from(letter);

let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArr.forEach((letter) => {
  let span = document.createElement("span");
  let theletter = document.createTextNode(letter);
  span.appendChild(theletter);
  span.className = "letterBox";
  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestiege",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "up",
    "Stanger things",
  ],
  people: [
    "Albert Einstein",
    "Hitchock",
    "Alexander",
    "Cleopatra",
    "Mahtma Ghandy",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words);

let randomNumber = Math.floor(Math.random() * allKeys.length);

let randomProp = allKeys[randomNumber];

let randomWords = words[randomProp];

let randomValueNumber = Math.floor(Math.random() * randomWords.length);

let randomWord = randomWords[randomValueNumber];

//set category info

document.querySelector(".gameInfo .category span").innerHTML = randomProp;

let letterGuess = document.querySelector(".letterGuess");

let lettersAndSpace = Array.from(randomWord);

// create spans depends on word

lettersAndSpace.forEach((letter) => {
  let span = document.createElement("span");

  if (letter === " ") {
    span.className = "withSpace";
  }

  letterGuess.appendChild(span);
});

//clicking on letter

let guessSpans = document.querySelectorAll(".letterGuess span ");

// set choose stats

// set wrong attempts

let wrongAttempts = 0;
let success = 0;
let theDraw = document.querySelector(".hangmanDraw");

document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className == "letterBox") {
    e.target.classList.add("clicked");

    let clickedLetter = e.target.innerHTML.toLowerCase();
    let chosenWord = Array.from(randomWord.toLowerCase());

    chosenWord.forEach((wordLetter, Wordindex) => {
      if (clickedLetter == wordLetter) {
        theStatus = true;
        success++;

        guessSpans.forEach((span, spanIndex) => {
          if (spanIndex == Wordindex) {
            span.innerHTML = wordLetter;
          }
        });
      }
    });

    if (success == chosenWord.length) {
      lettersContainer.classList.add("finished");

      successF();
    }

    if (theStatus != true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    }
  }
});

//end game funvtion

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over, The Word is ${randomWord}`);

  div.appendChild(divText);

  div.className = "popup";

  document.body.appendChild(div);
}
function successF() {
  let level;
  if (wrongAttempts < 2) {
    level = "excellant";
  } else if (wrongAttempts < 4) {
    level = "very good";
  } else {
    level = "not bad";
  }

  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Success ! , you completed with ${wrongAttempts} wrong attempts, you are ${level}`
  );

  div.appendChild(divText);

  div.className = "successPopup";

  document.body.appendChild(div);
}
