const nameInput = document.getElementById("name-input");
const pairsInput = document.getElementById("pairs-input");
let matchedPairs = 0;
let timerInterval;
let currnttime='';

const imgs = [
    "C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\atar.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\eden.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\idan.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\ivri.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\keren.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\lior.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\miri.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\ninet.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\omer.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\osher.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\ravid.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\shiri.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\shlomo.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\tuna.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\yasmin.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\arik.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\aviv.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\gal.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\gali.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\margol.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\mevol.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\ono.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\rami.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\rita.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\sarit.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\shalom.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\tamir.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\yoni.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\yuval.jpg",
"C:\\Users\\idanp\\OneDrive\\Desktop\\Computers science\\memory game\\photos\\zohar.jpg"
];

function startGame() {
    const playerName = nameInput.value.trim();
    const numOfPairs = parseInt(pairsInput.value);

    if (playerName === "") {
        alert("Enter Name!");
        return;
    }

    if (isNaN(numOfPairs) || numOfPairs < 1 || numOfPairs > 30) {
        alert("Enter a valid number of pairs (1-30)!");
        return;
    }

    startTimer();
    const shuffledImages = shuffleArray(imgs.slice(0, numOfPairs));
    createCards(shuffledImages, numOfPairs,playerName);
}

function createCards(images, numOfPairs, playerName) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    matchedPairs = 0;

    const playerNameElement = document.createElement('div');
    playerNameElement.id='name';
    playerNameElement.textContent = `Player: ${playerName}`;
    container.appendChild(playerNameElement);

    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    container.appendChild(timerElement);

    startTimer();

    const duplicatedImages = duplicateArrayElements(images);
    const shuffledImages = shuffleArray(duplicatedImages);

    let flippedCards = [];

    shuffledImages.forEach((img, i) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const imgElement = document.createElement('img');
        imgElement.classList.add('card-image');
        imgElement.src = img;
        imgElement.dataset.id = i;
        imgElement.style.display = 'none';

        cardContainer.onclick = () => {
            if (imgElement.style.display === 'none' && flippedCards.length < 2) {
                imgElement.style.display = 'block';
                flippedCards.push(imgElement);
                if (flippedCards.length === 2) {
                    const [card1, card2] = flippedCards;
                    if (card1.src === card2.src) {
                        disableCards(card1.dataset.id, card2.dataset.id);
                        matchedPairs++;
                        if (numOfPairs === matchedPairs) {
                            clearInterval(timerInterval);
                            alert(`Congratulations ${playerName}! You've matched all the pairs in ${currnttime} . Click 'OK' to start a new game.`);
                            location.reload();
                        }
                        flippedCards = [];
                    } else {
                        setTimeout(() => {
                            card1.style.display = 'none';
                            card2.style.display = 'none';
                            flippedCards = [];
                        }, 1000);
                    }
                }
            }
        };
        cardContainer.appendChild(imgElement);
        container.appendChild(cardContainer);
    });
}

function disableCards(id1, id2) {
    document.querySelector(`.card-image[data-id='${id1}']`).classList.add('disabled');
    document.querySelector(`.card-image[data-id='${id2}']`).classList.add('disabled');
}

function duplicateArrayElements(arr) {
    return arr.flatMap(item => [item, item]);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startTimer() {
    let seconds = 0;
    let minutes = 0;
    const timerElement = document.getElementById('timer');

    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerElement.textContent = formattedTime;
        currnttime=formattedTime;
    }, 1000);
}

