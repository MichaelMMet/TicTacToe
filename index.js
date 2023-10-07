document.addEventListener("DOMContentLoaded", function () {
    console.log("running");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


//first, attach event listeners to form
   
const form = document.querySelector("#myForm")

form.addEventListener('submit', (event) =>{
  event.preventDefault();

  //initialize user form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  document.querySelector(".modal").style.display = "none";
  initializeGame(data)
});

const initializeVariables = (data) => {
    data.gamemodeChoice = +data.gamemodeChoice;

    data.board = [0,1,2,3,4,5,6,7,8,];
    data.playerOne = "X";
    data.playerOne = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
}

const initializeGame = (data) => {
  //initialize game vars
  //add event listeners to gameboard
  

  initializeVariables(data);
  console.log(data);
 
}































// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  console.log("hi");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
});