const gameBoard = (function() {
    const Board = { 
        board: [
        [],[],[],
        [],[],[],
        [],[],[]
        ]
     }; 

    let gameBoard = document.querySelector(".gameboard-container");
    let gameBoardSection = document.querySelector(".gameboard-section")
    let playerOneScoreIndicator = document.querySelector(".player-score-container:first-child > p:last-child");
    let playerTwoScoreIndicator = document.querySelector(".player-score-container:last-child > p:last-child");
    let playNewGameBtn = document.querySelector(".playNewGame-container") 
    
    const playerOne = {
       score: 0,
       playerSymbol: "x" 
    };

    const PlayerTwo = {
        score: 0,
        playerSymbol: "0"
    };   

    function playersScore (playerOne, playerTwo) {
        return [playerOne, playerTwo];
    }

    let thisTurn = "Player One";
    let gameStatus = "";

    function pickPlace(cellIndex, array){
        let symbol = thisTurn === "Player One" ? "X" : "0";
        if (Board.board[cellIndex][0] === undefined) {
            array[cellIndex].textContent = symbol;
            Board.board[cellIndex] = symbol;
            gameStatus = checkBoard(symbol, thisTurn) === "game over" ? "game over" : "not over";
            if (gameStatus !== "game over"){
                thisTurn = thisTurn === "Player One" ? "Player Two" : "Player One";
                console.log("Your turn is next " + thisTurn);
            }
        } else {
            console.log("There is already a sign!");
        };
    };

    function clearBoard() {
        console.log(Board.board);
        Board.board = [
            [],[],[],
            [],[],[],
            [],[],[]
            ];
        let gameBoardCellList = document.querySelectorAll(".gameboard-container > .container-item");
        for (let i = 0; i < gameBoardCellList.length; i++){
                gameBoardCellList[i].textContent = "";
            }
        console.log(Board.board);
    };

    function finishGame(man) {
        clearBoard();
        thisTurn = "Player One";
        if (man === "Player One"){
            playerOne.score += 1;
            console.log(`${man} wins!`);
        } else if (man === "Player Two") {
            PlayerTwo.score += 1;
            console.log(`${man} wins!`);
        } else {
            console.log("It's a tie!");
        }
        playerOneScoreIndicator.textContent = playerOne.score;
        playerTwoScoreIndicator.textContent = PlayerTwo.score;
        if (playerOne.score >= 5 || PlayerTwo.score >= 5) {
            finishRound(man);
        }  
        console.log(`Score: Player One (${playerOne.score}) - Player Two (${PlayerTwo.score})`)
        return "game over";
    };

    function finishRound(player) {
            gameBoard.style.display = "none";
            let finalResult = document.createElement("p");
            finalResult.textContent =`${player.toUpperCase()} WINS!`;
            gameBoardSection.appendChild(finalResult);
    }

    function startNewGame() {
        playerOne.score = 0;
        PlayerTwo.score = 0;
        playerOneScoreIndicator.textContent = playerOne.score;
        playerTwoScoreIndicator.textContent = PlayerTwo.score;
        let finalResult = document.querySelector(".gameboard-section p");
        finalResult.remove();
        gameBoard.style.display = "grid";  
    }

    function checkBoard(symbol, player) {
        //check if horisontal win present
        let isCrossedHorizontally = false;
        for (let i = 0; i < Board.board.length; i++) {
            let redline = i + 3;
            for (let y = i; y < redline; y++){
                if (Board.board[y] !== symbol) {
                    isCrossedHorizontally = false;
                    break;
                } else {
                    isCrossedHorizontally = true;
                }
            };

            if (isCrossedHorizontally === true) {
                console.log("it's me!!!")
                return finishGame(player);
            } else {
                i = redline - 1;
            }
        }   
        //check if vertical win present
        let verticalArray = [];

        for (let i = 0; i < Board.board.length; i++) {
            for (let y = i; y < Board.board.length;) {
                if (Board.board[y] === symbol) {
                    verticalArray.push(Board.board[y]);
                    y += 3;
                } else {
                    break;
                }
            }
            if (verticalArray.length >= 3){
                return finishGame(player); 
            } else {
                verticalArray = [];
            }
        }

        console.log(verticalArray);


        //checks if diagonal win present
        let diagonalResultX = false; 
        for (let i = 0; i < Board.board.length;){
            if (i % 2 === 0){
                if (Board.board[i] === symbol){
                    diagonalResultX = true;
                    i += 4;
                } else {
                    diagonalResultX = false;
                    break;
                }
            }
        }

        let diagonalResultY = false; 
        for (let i = 2; i < Board.board.length - 1;){
            if (i % 2 === 0){
                if (Board.board[i] === symbol){
                    diagonalResultY = true;
                    i += 2;
                } else {
                    diagonalResultY = false;
                    break;
                }
            }
        }
        
        if (diagonalResultX === true || diagonalResultY === true) {
            return finishGame(player);
        } 

        // checks if all places filled
        let allPlacesFilled = true;
        for (let i = 0; i < Board.board.length; i++)  {
                if (Board.board[i][0] === undefined) {
                    allPlacesFilled = false;
                    break;
                }
        }

        if (allPlacesFilled === true) {
            return finishGame("It's a tie!");
        }

        console.log(Board.board);
    } 

    //events 
    gameBoard.addEventListener("click", (event) => {
        let gameBoardCellList = document.querySelectorAll(".gameboard-container > .container-item");
        for (let i = 0; i < gameBoardCellList.length; i++){
            gameBoardCellList[i].index = i;
        }
        
        for (let i=0; i < gameBoardCellList.length; i++) {
            if (event.target.index === gameBoardCellList[i].index) {
                pickPlace(event.target.index, gameBoardCellList);
            }
        }
    }); 

    playNewGameBtn.addEventListener("click", startNewGame);

    return {
        getPlayersScore: playersScore,
    };
})();



// gameBoard.pickPlace(0, 0)
// gameBoard.pickPlace(1, 0)
// gameBoard.pickPlace(0, 1)
// gameBoard.pickPlace(1, 1)
// gameBoard.pickPlace(0, 2)
