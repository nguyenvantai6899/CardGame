var myCards = document.querySelector(".container");
var startGame = document.querySelector(".start-game");
var resetGame = document.querySelector(".reset-game");
var timeCountdown = document.querySelector(".time-countdown");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var level = document.querySelector(".game-level");

var timeOut = 0;
var count = 0;
var countDown = 0;
var interval;
var correct = 0;
var item = [];
let images = [];

var css =
  "text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue; font-size: 40px; color:red;";
console.log("%cDừng tay bạn ơi", css);

//choose level
document.querySelector('.start-game').addEventListener("click",(e) => {
  var value = document.querySelector('input[name="level"]:checked').value;
  console.log(value);
  if (value) {
    if (value === "easy") {
      images = ["reactjs", "nodejs"];
    } else if (value === "normal") {
      images = ["reactjs", "nodejs", "csharp", "c", "java"];
    } else {
      images = [
        "reactjs",
        "nodejs",
        "csharp",
        "c",
        "java",
        "python",
        "ruby",
        "dart",
        "php",
        "js",
      ];
    }
  }
})

// level.addEventListener("click", (e) => {
//   var value = e.target.value;
//   if (value) {
//     if (value === "easy") {
//       images = ["reactjs", "nodejs"];
//     } else if (value === "normal") {
//       images = ["reactjs", "nodejs", "csharp", "c"];
//     } else {
//       images = [
//         "reactjs",
//         "nodejs",
//         "csharp",
//         "c",
//         "java",
//         "python",
//         "ruby",
//         "dart",
//         "php",
//         "js",
//       ];
//     }
//   }
// });

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
      correct++;
    } else {
      classList[i].className = "incorrect";
    }
  }
  item = [];
  timeOut = 0;
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
    countDown += 0.01;
    timeCountdown.style.height = countDown + "%";
    win(correct);
  }, 6);
};

//start game
startGame.addEventListener("click", (e) => {
  startGame.style.display = "none";
  resetGame.style.display = "block";
  renderCards();
  progressBar();
});

//restart
var reStartGame = () => {
  startGame.style.display = "block";
  resetGame.style.display = "none";
  clearInterval(interval);
  countDown = 0;
  correct = 0;
  timeCountdown.style.height = "0%";
  while (myCards.hasChildNodes()) {
    myCards.removeChild(myCards.firstChild);
  }
};
//reset game
resetGame.addEventListener("click", (e) => {
  reStartGame();
});

//win the game
var win = (quantityCorrecr) => {
  if (quantityCorrecr == images.length * 2 && countDown < 100) {
    modal.style.display = "block";
    modal.children[0].children[0].innerHTML = "You won the game!";
    reStartGame();
  }
  if (countDown > 100) {
    modal.style.display = "block";
    modal.children[0].children[0].innerHTML = "HAHA GÀ!";
    reStartGame();
  }
};
//close model
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
