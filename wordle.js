const letters = document.querySelectorAll(".word-containers")
const ANSWER_LENGTH = 5;

async function init () {
  let currentGuess = '';
  let currentRow =  0;


  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");

  console.log(word)


  function addLetter(letter) {
    if(currentGuess.length < ANSWER_LENGTH) {
      // adds letter to the end 
      currentGuess += letter;
    }else {
      // replaces the last letter 
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter; 
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter; 
  }

  async function commit() {
    if(currentGuess.length != ANSWER_LENGTH) {
      // do nothing
      return;
    }
    // TODO validate the word
  
    // TODO do all the marking as correct close, or wrong 

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);

    for (let i = 0; i < ANSWER_LENGTH; i++ ) {
      // mark as correct 
      if(guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct")
        map[guessParts[i]]--;
      }
    }

    for( let i = 0; i < ANSWER_LENGTH; i++) {
      if(guessParts[i] === wordParts[i]) {
        //do nothing 
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close")
        map[guessParts[i]]--;
      }else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong")
      }
    }



  
    // TODO  did they win or lose 

    currentRow++;
    currentGuess = '';
  }

  function backspace () {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = '';
  }


  document.addEventListener( 'keydown', function handleKeyPress (event) {
    const action = event.key;
   

    if(action === 'Enter') {
      commit();
    }else if( action === 'Backspace') {
      backspace();
    }else if (isLetter(action)) {
      addLetter(action.toUpperCase())
    } else {
      // do nothing 
    }
  })
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function makeMap (array) {
  const obj = {};
  for(let i = 0; i < array.length; i++) {
    const letter =array[i];
    if(obj[letter]) {
      obj[letter]++;
    }else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();






















// const options = {method: 'GET'};

// fetch('https://words.dev-apis.com/word-of-the-day', options)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .then(response => console.log(response))
//   .catch(err => console.error(err));