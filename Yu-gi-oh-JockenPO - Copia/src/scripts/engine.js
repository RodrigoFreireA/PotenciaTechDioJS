const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),

    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOF: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOF: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOF: [1],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(randomIdCard);
        });
    }
    return cardImage;
}

async function setCardsField(cardId){

    //remove todas as cartas antes
    await removeAllCardsImages();



    let computerCardId = await getRandomCardId();

    await showHiddenCardFieldsImages(true);  

    await hiddenCardDetails();

    await drawCardsInField(cardId, computerCardId);
    let duelResults = await checkDuelResults(cardId,computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | 
    Lose: ${state.score.computerScore}`;
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function hiddenCardDetails(){ 
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";

}

async function drawCardsInField(cardId, computerCardId){    
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}


async function showHiddenCardFieldsImages(value){
    if(value === true){      

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
    }

    if(value === false){
        

    state.fieldCards.player.style.display= "none";
    state.fieldCards.computer.style.display= "none";

    }
}

async function drawButton(text){
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, ComputerCardId){
    let duelResults = "DRAW";

    let playerCard = cardData[playerCardId];

    if(playerCard.winOf.includes(ComputerCardId)){
        duelResults = "WIN";
        await playAudio(duelResults);
        state.score.playerScore++;
    }

    if(playerCard.loseOF.includes(ComputerCardId)){
        duelResults = "LOSE";
        await playAudio(duelResults);
        state.score.computerScore++;
    }
    return duelResults;
}


async function removeAllCardsImages(){
    let { computerBOX, player1BOX} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img")
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img")
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute : " + cardData
    [index].type;
}



async function drawCards(cardNumbers, fieldSide) {
    const container = document.getElementById(fieldSide);

    // Check if the container element exists
    if (container) {
        for (let i = 0; i < cardNumbers; i++) {
            const randomIdCard = await getRandomCardId();
            const cardImage = await createCardImage(randomIdCard, fieldSide);

            // Append the card only if the container is not null
            container.appendChild(cardImage);
        }
    } else {
        console.error(`Container element with ID '${fieldSide}' not found.`);
    }
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}

function init() {
    showHiddenCardFieldsImages(false);

    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();