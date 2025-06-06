var pictures = [];
var wrapper = document.querySelector(".wrapper");
var divPicturesSecond = document.querySelector(".secondRow");
var divCounter = document.querySelector(".counter");
var divContainer;
var overlay = document.querySelector(".giftOverLayer");
var gift = document.querySelector(".headerImg");

pictures = [
  "MAMA (1).jpg",
  "MAMA (2).jpg",
  "MAMA (3).jpg",
  "MAMA (4).jpg",
  "MAMA (5).jpg",
  "MAMA (6).jpg",
  "MAMA (7).jpg",
  "MAMA (8).jpg",
  "MAMA (9).jpg",
  "MAMA (10).jpg",
  "MAMA (11).jpg",
  "MAMA (12).jpg",
  "MAMA (13).jpg",
  "MAMA (14).jpg",
  "MAMA (15).jpg",
  "MAMA (16).jpg",
  "MAMA (17).jpg",
  "MAMA (18).jpg",
  "MAMA (19).jpg",
  "MAMA (20).jpg",
  "MAMA (21).jpg",
  "MAMA (22).jpg",
  "MAMA (23).jpg"/*,
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
  "akse0083.jpg" */
];

/* for (var i = 0; i <= 7; i++) {
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
*/
// Beim initialen Laden
const initialPictures = ["MAMA (1).jpg",
  "MAMA (2).jpg",
  "MAMA (3).jpg",
  "MAMA (4).jpg",
  "MAMA (5).jpg",
  "MAMA (6).jpg",
  "MAMA (7).jpg",
  "MAMA (8).jpg"]; // Kopie erstellen
for (let i = 0; i < 8; i++) { // Angenommen, du willst 8 Bilder
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const image = document.createElement("img");
  
  if (initialPictures.length > 0) {
    const randomIndex = Math.floor(Math.random() * initialPictures.length);
    const selectedPic = initialPictures.splice(randomIndex, 1)[0]; // Bild auswählen und entfernen
    image.setAttribute("src", "images/" + selectedPic);
  } else {
    // Fallback, falls weniger als 8 Bilder im Array sind
    // oder alle schon verwendet wurden (sollte hier nicht passieren)
    image.setAttribute("src", "images/MAMA (1).jpg"); // Beispiel
  }
  image.setAttribute("class", "picture");
  container.appendChild(image);
  wrapper.appendChild(container);
}
divContainer = document.querySelectorAll(".picture"); // Danach neu zuweisen

//divContainer = document.querySelectorAll(".picture");

var dateOfAnniversary = new Date(2005, 1, 7, 12, 0, 0);

function setTimer() {
  divCounter.textContent = moment("2005-02-07 12:00:00").preciseDiff(
    new Date()
  );
}
// change images //
var randomNr = 0;
var randomPic = 0;
//function displayNextImage() {
//  randomNr = Math.floor(Math.random() * (pictures.length - 1) + 1);
//  randomPic = Math.floor(Math.random() * 8);
//  checkImage();
//  divContainer[randomPic].setAttribute("src", "images/" + pictures[randomNr]);
//}
function displayNextImage() {
  const displayedImageSources = Array.from(divContainer).map(img => img.getAttribute("src"));
  let newImageSrc;
  let attempts = 0; // Schutz vor Endlosschleife, falls alle Bilder schon angezeigt werden
                   // (unwahrscheinlich bei deiner Konfiguration, aber gute Praxis)

  do {
    const randomIdx = Math.floor(Math.random() * pictures.length); // Wählt aus ALLEN Bildern
    newImageSrc = "images/" + pictures[randomIdx];
    attempts++;
  } while (displayedImageSources.includes(newImageSrc) && attempts < pictures.length * 2);
  // Wenn nach einigen Versuchen kein neues Bild gefunden wurde,
  // oder wenn das Bild zufällig nicht schon angezeigt wird:
  
  const randomPicSlot = Math.floor(Math.random() * divContainer.length);
  divContainer[randomPicSlot].setAttribute("src", newImageSrc);
}
// In diesem Fall wird checkImage() nicht mehr separat benötigt,
// die Logik ist in displayNextImage integriert.
// Du müsstest dann startTimer() anpassen, um diese neue displayNextImage aufzurufen.
//function checkImage() {
//  var newImage = pictures[randomNr];
//  for (var i = 0; i < divContainer.length; i++) {
//    var currentPic = divContainer[i].getAttribute("src");
//    currentPic = currentPic.substring(7);
//    if (currentPic === newImage) {
//      randomNr = Math.floor(Math.random() * pictures.length - 1) + 1;
//      newImage = pictures[randomNr];
//      i = 0;
//    }
//  }
//}

function startTimer() {
  setInterval(displayNextImage, 1000);
}
function refreshTimer() {
  setInterval(setTimer, 400);
}

function changeToPresent() {
  overlay.style.visibility = "visible";
}

document.addEventListener("keydown", setOverlayHidden);

overlay.addEventListener("click", setOverlayHidden);

function chageToPrestentImage() {
  document.querySelector(".pictureTxt").style.visibility = "hidden";
}

gift.addEventListener("mousedown", changeToPresent);

function setOverlayHidden(params) {
  overlay.style.visibility = "hidden";
}

setTimer();
refreshTimer();
startTimer();
