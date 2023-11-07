document.addEventListener("DOMContentLoaded", function () {

  // Get the modal
  var modal = document.getElementById("myModal");

  var endModal = document.getElementById("gameOverModal");

  // Get the button that opens the modal
  var btn = document.getElementById("modalBtn");

  var endBtn = document.getElementById("newGameButton");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  //first, attach event listeners to form
  const form = document.querySelector("#myForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modal").style.display = "none";
    initializeGame(data);
  });

  //initialize variables
  const initializeVariables = (data) => {
    data.gamemodeChoice = data.gamemodeChoice;

    data.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    data.playerOne = "X";
    data.playerTwo = "O";
    data.playerOneName = data.playerOneName;
    data.playerTwoName = data.playerTwoName;
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
    data.myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 
  };

//adds event listeners to each pickable space
  const addEventListenerToGameBoard = (data) => {
    document.querySelectorAll(".gameSpace").forEach((gameSpace) => {
      gameSpace.addEventListener("click", (e) => {
        playMove(event.target, data);
      });
    });
  };

  const initializeGame = (data) => {
    //initialize game vars
    //add event listeners to gameboard

    initializeVariables(data);

    addEventListenerToGameBoard(data);
  };

  //controls logic for updating gameSpace and swiching current turn
  const playMove = (gameSpace, data) => {
    console.log("CHOICE" + data.gamemodeChoice);
    if (data.gamemodeChoice == 0) {
      console.log("hi");

      console.log(data.board[parseInt(gameSpace.id)]);

      if (
        data.board[parseInt(gameSpace.id)] != "X" &&
        data.board[parseInt(gameSpace.id)] != "Y"
      ) {
        if (data.currentPlayer == "X") {
          const newMove = document.createElement("p");
          newMove.classList.add("xMove");
          newMove.innerHTML = "X";
          data.currentPlayer = "O";
          gameSpace.appendChild(newMove);
          data.board[parseInt(gameSpace.id)] = "X";
        } else if (data.currentPlayer == "O") {
          const newMove = document.createElement("p");
          newMove.classList.add("oMove");
          newMove.innerHTML = "O";
          data.currentPlayer = "X";
          gameSpace.appendChild(newMove);
          data.board[parseInt(gameSpace.id)] = "O";
        }
      } else {
        console.log("cant choose this space");
      }
    } else if(data.gamemodeChoice == 1){
      console.log("working")

      if (data.currentPlayer == "X") {
        const newMove = document.createElement("p");
        newMove.classList.add("xMove");
        newMove.innerHTML = "X";
        data.currentPlayer = "O";
        gameSpace.appendChild(newMove);
        data.board[parseInt(gameSpace.id)] = "X";
      
        const newMove2 = document.createElement("p");
        const randInt = aiMove(data);
        const aiSpace = document.getElementById(toString(randInt));
        newMove2.classList.add("oMove");
        newMove2.innerHTML = "O";
        data.currentPlayer = "X";
        aiSpace.appendChild(newMove2);
        data.board[randInt] = "O";
        console.log(data.board);
      }

    }

    checkForWin(data);

  };

 

  // choses a random move from the spots available 
  function aiMove(data) {
    console.log("AIMOVE");
    var randomInt = 1;
    do {
      randomInt = Math.floor(Math.random() * data.myArray.length);
      console.log("HUH")
      
    } while (data.myArray[randomInt] != randomInt + 1);
    console.log(
      "Random Int: " + randomInt + "array:" + data.myArray[randomInt]
    );
    data.myArray[randomInt] = -1;
    
    console.log("Array: " + data.myArray);
    console.log("Random Int: "+ randomInt);
    return randomInt;
  }

  //checks if any player has won
  function checkForWin(data) {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (data.board[a] === data.board[b] && data.board[b] === data.board[c] && data.board[a] !== "") {
        console.log("winner:" + data.board[a]); // Return the winning player (X or O)
        gameOver(data.board[a], data);
      }
    }

    return null; // No winner found
  }

  //resets game and annouces who won
  function gameOver(winner, data) {
    console.log(data);
    if(data.playerOneName == "" || data.playerTwoName == ""){
    document.querySelector(".winText").innerHTML = "Player " + winner + " wins!";
    }else if(winner == "X"){
      document.querySelector(".winText").innerHTML = data.playerOneName + " wins!";
    } else{
      document.querySelector(".winText").innerHTML = data.playerTwoName + " wins!";
    }
    document.querySelector(".endModal").style.display = "block";
    initializeVariables(data);
    document.querySelectorAll(".gameSpace").forEach((gameSpace) => {
    gameSpace.innerHTML = "";
    });
  }

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  endBtn.onclick = function () {
    endModal.style.display = "none"
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    console.log("hi");
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
