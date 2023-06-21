var myCards = document.querySelector(".container");
var startGame = document.querySelector(".start-game");
var resetGame = document.querySelector(".reset-game");
var timeCountdown = document.querySelector(".time-countdown");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close");
var level = document.querySelector(".game-level");
var chooseLevel = document.querySelectorAll(".level");
let score = document.querySelector(".score-achieve");
var modalLB = document.getElementById("modalLeaderboard");
var leaderboard = document.querySelector(".leader-board");

var timeOut = 0;
var count = 0;
var countDown = 100;
var interval;
var correct = 0;
var item = [];
let images = [];

var css =
  "text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue; font-size: 40px; color:red;";
console.log("%cDừng tay bạn ơi", css);

//radio button level
var chooseLevelButton = () => {
  for (let i = 0; i < chooseLevel.length; i++) {
    const element = chooseLevel[i];
    element.dataset.item = "unchecked";
    element.addEventListener("click", (e) => {
      element.dataset.item = "checked";
      for (let j = 0; j < chooseLevel.length; j++) {
        const element2 = chooseLevel[j];
        if (element !== element2) {
          element2.dataset.item = "unchecked";
        }
      }
    });
  }
  chooseLevel[0].dataset.item = "checked";
};
chooseLevelButton();
//render card for level
document.querySelector(".start-game").addEventListener("click", (e) => {
  var value = document.querySelector('button[data-item ="checked"]').value;
  if (value) {
    images = [
      "reactjs",
      "nodejs",
      "csharp",
      "cplus",
      "java",
      "python",
      "ruby",
      "dart",
      "php",
      "js",
    ];
    if (value === "easy") {
      shuffle(images);
      images = [images[0], images[1], images[2]];
    } else if (value === "normal") {
      shuffle(images);
      images = [
        images[3],
        images[4],
        images[5],
        images[6],
        images[1],
        images[2],
      ];
    } else {
      shuffle(images);
      images = [
        images[0],
        images[1],
        images[2],
        images[3],
        images[4],
        images[5],
        images[6],
        images[7],
        images[8],
      ];
    }
  }
});

//shuffle array
var shuffle = (arrShuffle) => {
  for (var i = 0; i < arrShuffle.length; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arrShuffle[i];
    arrShuffle[i] = arrShuffle[j];
    arrShuffle[j] = temp;
  }
};

//check value of 2 cards
var check = (item1, item2) => {
  if (item1 === item2) {
    return true;
  }
  return false;
};

//change class of card when cards checked
var checkClass = () => {
  let classList = document.querySelectorAll(".flipped");
  for (let i = 0; i < classList.length; i++) {
    if (check(item[0], item[1])) {
      classList[i].className = "correct";
      renderImg("correct", document.querySelector(".correct").dataset.item); // maybe use css
      correct++;
      scoreCal();
    } else {
      classList[i].className = "incorrect";
    }
  }
  let classIncorrect = document.querySelectorAll(".incorrect");
  for (let i = 0; i < classIncorrect.length; i++) {
    classIncorrect[i].style.background = "";
  }
  item = [];
  timeOut = 0;
};

// load image for cards // maybe use css
var renderImg = (className, dataItem) => {
  let getClassName = document.querySelectorAll(
    `.${className}[data-item="${dataItem}"]`
  );
  for (let i = 0; i < getClassName.length; i++) {
    const element = getClassName[i];
    element.style.background = `url("img/${dataItem}.png") left center no-repeat #fff`;
    element.style.backgroundSize = "120px 180px";
  }
};

//render cards and catch event 'click' on cards
var renderCards = () => {
  var clone = images.slice(0); // duplicate array
  var cards = images.concat(clone); // merge to arrays
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("div");
    card.dataset.item = cards[i];
    card.dataset.view = "card";
    myCards.appendChild(card);
    card.addEventListener("click", (e) => {
      if (
        e.target.className === "correct" ||
        e.target.className === "flipped" ||
        timeOut != 0
      ) {
        e.preventDefault();
      } else {
        card.className = "flipped";
        item.push(e.target.dataset.item);
        renderImg("flipped", e.target.dataset.item); // maybe use css
        if (item.length > 1) {
          timeOut = setTimeout(() => {
            checkClass();
          }, 600);
        }
      }
    });
  }
};

//progress bar
var progressBar = () => {
  interval = setInterval(() => {
    countDown -= 0.01;
    timeCountdown.style.width = countDown + "%";
    win(correct);
  }, 6);
};

//start game
startGame.addEventListener("click", (e) => {
  score.innerHTML = "";
  document.querySelector(".score-level-chosen").innerHTML = "";
  level.style.display = "none";
  document.querySelector(".score-level-chosen").innerHTML = document
    .querySelector('button[data-item ="checked"]')
    .value.toUpperCase();
  renderCards();
  progressBar();
});

//restart
var reStartGame = () => {
  // startGame.style.display = "block";
  // resetGame.style.display = "none";
  clearInterval(interval);
  countDown = 100;
  correct = 0;
  timeCountdown.style.height = "100%";
  while (myCards.hasChildNodes()) {
    myCards.removeChild(myCards.firstChild);
  }
};
//reset game
// resetGame.addEventListener("click", (e) => {
//   reStartGame();
// });

//modal win the game
var win = (quantityCorrecr) => {
  if (quantityCorrecr == images.length * 2 && countDown > 0) {
    clearInterval(interval);
    modal.style.display = "block";
    modal.children[0].children[0].innerHTML = "You won the game!";
    modal.children[0].children[1].innerHTML = "Score: " + score.textContent;
    lBRank(
      score.textContent,
      document.querySelector('button[data-item ="checked"]').value.toUpperCase()
    );
  }
  if (countDown < 0) {
    clearInterval(interval);
    modal.style.display = "block";
    modal.children[0].children[0].innerHTML = "HAHA GÀ!";
  }
};
//close model
for (let i = 0; i < span.length; i++) {
  const element = span[i];
  element.onclick = function () {
    modal.style.display = "none";
    modalLB.style.display = "none";
    level.style.display = "block";
    reStartGame();
  };
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalLB.style.display = "none";
    level.style.display = "block";
    reStartGame();
  }
};

//score
var scoreCal = () => {
  let cD;
  score.innerHTML = correct * 100;
  if (correct === images.length * 2) {
    cD = Math.floor(countDown);
    var pFScore = parseFloat(score.textContent);
    score.innerHTML = pFScore + cD * 10;
  }
};

leaderboard.addEventListener("click", (e) => {
  modalLB.style.display = "block";
});

//leaderboard rank
// let scoreArr = [];
// let tbody = document.getElementById('tbody');
// let trElement = document.getElementsByTagName('tr');
// var lBRank = (score) => {
//   scoreArr.push(score);
//   scoreArr = scoreArr.sort();
//   while (tbody.hasChildNodes()) {
//     tbody.removeChild(tbody.firstChild);
//   }
//   let j = 0;
//   for (let i = scoreArr.length - 1; i >= 0; i--) {
//     let tr = document.createElement("tr");
//     tbody.appendChild(tr);
//     let td1 = document.createElement("td");
//     let td2 = document.createElement("td");
//     let td3 = document.createElement("td");
//     td1.innerText = ++j ;
//     td2.innerText = scoreArr[i];
//     td3.innerText = new Date();
//     tr.appendChild(td1);
//     tr.appendChild(td2);
//     tr.appendChild(td3);
//   }
// }
//object contructor
class Player {
  constructor(score, level) {
    this.score = score;
    this.level = level;
  }
}
//leaderboard rank
let tbody = document.getElementById('tbody');
let trElement = document.getElementsByTagName('tr');
let playerArr = [];
var lBRank = (score, level) => {
  let lB = new Player(score, level);
  playerArr.push(lB);
  playerArr = playerArr.sort((a, b) => {
    return b.score - a.score;
  });
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  let j = 0;
  for (let i = 0; i < playerArr.length; i++) {
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    td1.innerText = i+1;
    td2.innerText = playerArr[i].score;
    td3.innerText = playerArr[i].level;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
  }
};
