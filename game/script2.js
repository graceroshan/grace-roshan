const images = ["🌟", "(◔◡◔)", "😎", "🦄", "🎉", "🍕", "🚀", "🌺"];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function createGameBoard() {
    const gameBoard = document.getElementById("gameBoard");
    cards = [];

    // Duplicate images to make pairs
    const cardImages = images.concat(images);

    cardImages.sort(() => Math.random() - 0.5);

    for (let i = 0; i < cardImages.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = cardImages[i];
        card.textContent = "?";
        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
    }
}

function handleCardClick() {
    const card = this;

    if (card.classList.contains("matched") || flippedCards.length >= 2) {
        return;
    }

    card.textContent = card.dataset.image;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === images.length) {
            setTimeout(showGameOverMessage, 500);
        }
    } else {
        card1.textContent = "?";
        card2.textContent = "?";
    }

    flippedCards = [];
}

function showGameOverMessage() {
    alert("Congratulations! You've matched all pairs!");
    resetGame();
}

function resetGame() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    matchedPairs = 0;
    createGameBoard();
}

createGameBoard();

