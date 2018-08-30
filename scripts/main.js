var picturesFirstRow = [];
var picturesSecondRow = [];
var pictures = [];
var wrapper = document.querySelector(".wrapper");
var divPicturesSecond = document.querySelector(".secondRow");
var divCounter = document.querySelector(".counter");
var divContainer;
var overlay = document.querySelector(".giftOverLayer");

var gift = document.querySelector(".headerImg");

pictures = [
  "akse2705.jpg",
  "akse2700.jpg",
  "akse2635.jpg",
  "akse2624.jpg",
  "akse2198.jpg",
  "akse2160.jpg",
  "akse1947.jpg",
  "akse1939.jpg",
  "akse1637.jpg",
  "akse1227.jpg",
  "akse1085.jpg",
  "akse1025.jpg",
  "akse0913.jpg",
  "akse0867.jpg",
  "akse0762.jpg",
  "akse0646.jpg",
  "akse0601.jpg",
  "akse0583.jpg",
  "akse0580.jpg",
  "akse0579.jpg",
  "akse0562.jpg",
  "akse0318sw.jpg",
  "akse0314sw.jpg",
  "akse0303sw.jpg",
  "akse0288sw.jpg",
  "akse0202.jpg",
  "akse0083.jpg"
];

for (var i = 0; i <= 7; i++) {
  var countainer = document.createElement("div");
  countainer.setAttribute("class", "container");
  var image = document.createElement("img");
  image.setAttribute(
    "src",
    "images/" + pictures[Math.floor(Math.random() * 8) + 1]
  );
  image.setAttribute("class", "picture");

  countainer.appendChild(image);
  wrapper.appendChild(countainer);
}
divContainer = document.querySelectorAll(".picture");

var dateOfAnniversary = new Date(2005, 1, 7, 12, 0, 0);

setTimer();

function setTimer() {
  divCounter.textContent = moment("2005-02-07 12:00:00").preciseDiff(
    new Date()
  );
}
// change images //
var randomNr = 0;
var randomPic = 0;
function displayNextImage() {
  randomNr = Math.floor(Math.random() * (pictures.length - 1) + 1);
  randomPic = Math.floor(Math.random() * 8);

  checkImage();
  divContainer[randomPic].setAttribute("src", "images/" + pictures[randomNr]);
}

function checkImage() {
  var counter = 0;
  var newImage = pictures[randomNr];
  for (var i = 0; i < divContainer.length; i++) {
    counter++;
    var currentPic = divContainer[i].getAttribute("src");
    currentPic = currentPic.substring(7);
    if (currentPic === newImage) {
      randomNr = Math.floor(Math.random() * pictures.length - 1) + 1;
      newImage = pictures[randomNr];
      i = 0;
    }
  }
}

function startTimer() {
  setInterval(displayNextImage, 1000);
}
function refreshTimer() {
  setInterval(setTimer, 400);
}

function changeToPresent() {
  overlay.style.visibility = "visible";
}

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    overlay.style.visibility = "hidden";
  }
});

overlay.addEventListener("click", function() {
  overlay.style.visibility = "hidden";
});

function chageToPrestentImage() {
  gift.setAttribute("class", "headerImg");
  var imgHeader = document.querySelector("#present");
  imgHeader.src = "images/gift-01.png";
  document
    .querySelector(".pictureTxt")
    .setAttribute("style", "visibility: hidden;");
  gift = document.querySelector(".headerImg");
}

gift.addEventListener("mousedown", changeToPresent);

refreshTimer();
startTimer();
