document.addEventListener("DOMContentLoaded", function () {
  console.log("running");

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("modalBtn");

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

  const initializeVariables = (data) => {
    data.gamemodeChoice = data.gamemodeChoice;

    data.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    data.playerOne = "X";
    data.playerTwo = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
    data.myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 
  };

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
        newMove2.classList.add("oMove");
        newMove2.innerHTML = "O";
        data.currentPlayer = "X";
        gameSpace.appendChild(newMove2);
        data.board[aiMove(data)] = "O";
      }

    }

    checkForWin(data.board);

    //console.log(data);
  };

  function aiMove(data, gameSpace){



  }

  /*
  function checkForWin(board) {
    const winCombinations = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
      [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
      [1, 5, 9], [3, 5, 7]             // Diagonals
    ];
  
    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a - 1] === board[b - 1] && board[b - 1] === board[c - 1]) {
       // return board[a - 1]; // Return the winning player (X or O)
        if(board[a-1] == 'X'){
          console.log("x win")
          gameOver('X');
        }else{
          console.log("y win")
          gameOver('Y');
        }
      }
      console.log("no winner")
      return null; // No winner found
    }
  }
  */
  function aiMove(data) {
    console.log("AIMOVE");
    var randomInt = 1;
    do {
      randomInt = Math.floor(Math.random() * data.myArray.length);
    } while (data.myArray[randomInt] != randomInt);
    console.log(
      "Random Int: " + randomInt + "array:" + data.myArray[randomInt]
    );
    data.myArray.splice(randomInt, 1);
    console.log("Array: " + data.myArray);
    return randomInt;
  }

  function checkForWin(board) {
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
      if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
        console.log("winner:" + board[a]); // Return the winning player (X or O)
      }
    }

    return null; // No winner found
  }

  function gameOver(winner) {
    console.log(winner);
    document.querySelector(".winText").innerHTML = winner;
    document.querySelector(".endModal").style.display = "block";
  }

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
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
