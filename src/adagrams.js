const LETTER_POOL = {
  A: 9,  B: 2,  C: 2,  D: 4,  E: 12,
  F: 2,  G: 3,  H: 2,  I: 9,  J: 1,
  K: 1,  L: 4,  M: 2,  N: 6,  O: 8,
  P: 2,  Q: 1,  R: 6,  S: 4,  T: 6,
  U: 4,  V: 2,  W: 2,  X: 1,  Y: 2,
  Z: 1,
};

const points = {
  A: 1, E: 1, I: 1, O: 1, U: 1,
  L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};

// wave 01
export const drawLetters = () => {
  const letterPoolList = [];
  for (const[letter,count] of Object.entries(LETTER_POOL)){
    for (let i = 0; i < count; i++){
      letterPoolList.push(letter)
    }
  }

  const letterList = [];
  while (letterList.length < 10) {
    const index = Math.floor(Math.random() * letterPoolList.length);
    const letter = letterPoolList[index];
    letterList.push(letter);
    letterPoolList.splice(index, 1);
  }
  return letterList;
}

// wave 02
export const usesAvailableLetters = (input, lettersInHand) => {
  const tempLetterBank = lettersInHand.map(letter => letter.toLowerCase());

  for (let letter of input.toLowerCase()) {
    const index = tempLetterBank.indexOf(letter);
    if (index == -1) {
      return false;
    } else {
      tempLetterBank.splice(index,1);
    }
  }
  return true;
};

// wave 03
export const scoreWord = (word) => {
  if (!word) return 0;

  let totalScore = 0;

  for (let letter of word.toUpperCase()){
    const score = points[letter] || 0;
    totalScore += score;
  }

  if (word.length >= 7 && word.length <=10){
      totalScore += 8;
    }
    
  return totalScore
  };
 

// wave 04
export const highestScoreFrom = (words) => {
  let wordScoreList = []
  for (const word of words){
    const score = scoreWord(word);
    wordScoreList.push([word,score]);
  }

// get the highest score
  let highestScore = -1;
  for (const[word, score] of wordScoreList) {
    if (score > highestScore) {
      highestScore = score;
    }
  }
// get te word list that has the highest score
  let tieWords = [];
  for (const[word, score] of wordScoreList){
    if (score === highestScore){
      tieWords.push([word, score])
    }
  }
// compare the length of the word to get the winner
  let winner = {word: tieWords[0][0], score: tieWords[0][1]};
  for (const[word, score] of tieWords){
    if (word.length === 10) {
      return {word, score};
    }
    if (word.length < winner.word.length) {
      winner = {word, score};
    }
  }
  return winner;
};


