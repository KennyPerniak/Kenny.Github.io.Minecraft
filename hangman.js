let minecraft = [
	'Enderman',
	'Ender Dragon',
	'Zombie',
	'Skeleton',
	'Spider',
	'Baby Zombie',
	'Pig',
	'Cow',
	'Chicken',
	'Spider Jokey',
	'Squid',
	'fish',
	'Salmon',
	'Diamonds',
	'Gold',
	'Redstone',
	'Coal',
	'Iron',
	'Cobblestone',
	'Carrot',
	'Carrot on a Stick',
	'Nether',
	'The End',
	'Wolf',
	'Moo Shroom',
	'Parrot',
	'Steve',
	'Alex',
	'Stone',
	'wood',
	'Villagers',
	'Salamander',
	'Iron Golem',
	'Doors',
	'Bow',
	'Sword',
	'Shield',
	'Silverfish',
	'Potion',
	'Horse',
	'Mule',
	'Emeralds',
	'Snowman',
	'Wither',
	'Ghast',
	'Zombie Pigman',
	'Armor',
	'Saddle',
	'Shovel',
	'sheer',
	'Axe',
	'Hoe',
	'Grassland',
	'Jungle',
	'Ocean',
	'Dessert',
	'Swamp',
	'Gravel',
	'Sand',
	'Grass',
	'Arrows',
	'Helmet',
	'Chestplate',
	'leggins',
	'Boots',
	'Boat',
	'Chest',
	'Enchantment Table',
	'Railroad',
	'Fence',
	'Golden Apple',
	'Apple',
	'Sugar',
	'Sugar Cane',
	'Spider Web',
	'Fishing Rod',
	'Enderpearl',
	'Golden Carrot',
	'Slime',
	'Shulker',
	'Guardian',
	'Magma Cube',
	'Creeper',
	'Cave Spider',
	'Wither Skeleton',
	'Warden',
	'Vindicator',
	'Evoker',
	'Piglin',
	'Piglin Brute',
	'Vex',
	'Phantom',
	'Drowned',
	'Donkey',
	'Clock',
	'Crossbow',
	'Map',
	'Lead',
	'Flint and Steel',
	'Spyglass',
	'Glass bottle',
	'Glass',
	'Totem of Undying',
	'Bread',
	'Egg',
	'Cookie',
	'Milk',
	'Eye of Ender',
	'Feather',
	'Spider Eye',
	'Fermented Spider Eye',
	'Flint',
	'Glowstone',
	'Ingot',
	'Nugget',
	'Lapis Lazuli',
	'Leather',
	'Name Tag',
	'Music Disc',
	'Jukebox',
	'Brick',
	'Paper',
	'Wheat',
	'Turtle',
	'Elytra',
	'Compass',
	'TNT',
	'Beacon',
	'Nether Star',
	'Sign',
	'Water Bucket',
	'Lava Bucket',
	'Cake',
	'Bed',
	'Rotten Flesh',
	'Mushroom',
	'Pickaxe'
];


const youWon = "You gained XP!";
const youLost = "You Died!";

function Game() {
    let word = minecraft[Math.floor(Math.random() * minecraft.length)];
    word = word.toUpperCase();
    let guessedLetters = [];
    let maskedWord = "";
    let incorrectGuesses = 0;
    let possibleGuesses = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let won = false;
    let lost = false;
    const maxGuesses = 7;

    for (let i = 0; i < word.length; i++) {
        let space = " ";
        let nextCharacter = word.charAt(i) === space ? space : "_";
        maskedWord += nextCharacter;
    }

    let guessWord = function (guessedWord) {
        guessedWord = guessedWord.toUpperCase();
        if (guessedWord === word) {
            guessAllLetters();
        }
        else {
            handleIncorrectGuess();
        }
    }

    let guessAllLetters = function () {
        for (let i = 0; i < word.length; i++) {
            guess(word.charAt(i));
        }
    }

    let guess = function (letter) {
        letter = letter.toUpperCase();
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            possibleGuesses = possibleGuesses.replace(letter, "");
            if (word.includes(letter)) {
                let matchingIndexes = [];
                for (let i = 0; i < word.length; i++) {
                    if (word.charAt(i) === letter) {
                        matchingIndexes.push(i);
                    }
                }

                matchingIndexes.forEach(function (index) {
                    maskedWord = replace(maskedWord, index, letter);
                });

                if (!lost) {
                    won = maskedWord === word;
                }
            }
            else {
                handleIncorrectGuess();
            }
        }
    }

    let handleIncorrectGuess = function () {
        incorrectGuesses++;
        lost = incorrectGuesses >= maxGuesses;
        if (lost) {
            guessAllLetters();
        }
    }

    return {
        "getWord": function () { return word; },
        "getMaskedWord": function () { return maskedWord; },
        "guess": guess,
        "getPossibleGuesses": function () { return [...possibleGuesses]; },
        "getIncorrectGuesses": function () { return incorrectGuesses; },
        "guessWord": guessWord,
        "isWon": function () { return won; },
        "isLost": function () { return lost; },
    };
}

function replace(value, index, replacement) {
    return value.substr(0, index) + replacement + value.substr(index + replacement.length);
}

function listenForInput(game) {
    let guessLetter = function (letter) {
        if (letter) {
            let gameStillGoing = !game.isWon() &&
                !game.isLost();
            if (gameStillGoing) {
                game.guess(letter);
                render(game);
            }
        }
    };

    let handleClick = function (event) {
        if (event.target.classList.contains('guess')) {
            guessLetter(event.target.innerHTML);
        }
    }

    let handleKeyPress = function (event) {
        let letter = null;
        const A = 65;
        const Z = 90;
        const ENTER = 13;
        let isLetter = event.keyCode >= A && event.keyCode <= Z;
        let guessWordButton = document.getElementById("guessWordButton");
        let newGameButton = document.getElementById("newGameButton");
        let guessBox = document.getElementById("guessBox");
        let gameOver = guessBox.value === youWon || guessBox.value === youLost;

        if (event.target.id !== "guessBox" && isLetter) {
            letter = String.fromCharCode(event.keyCode);
        }
        else if (event.keyCode === ENTER && gameOver) {
            newGameButton.click();
        }
        else if (event.keyCode === ENTER && guessBox.value !== "") {
            guessWordButton.click();
        }
        guessLetter(letter);
    }

    document.addEventListener('keydown', handleKeyPress);
    document.body.addEventListener('click', handleClick);
}

function guessWord(game) {
    let gameStillGoing = !game.isWon() &&
        !game.isLost();
    let guessedWord = document.getElementById('guessBox').value;
    if (gameStillGoing) {
        game.guessWord(guessedWord);
        render(game);
    }
}

function render(game) {
    document.getElementById("word").innerHTML = game.getMaskedWord();
    document.getElementById("guesses").innerHTML = "";
    game.getPossibleGuesses().forEach(function (guess) {
        let innerHtml = "<span class='guess'>" + guess + "</span>";
        document.getElementById("guesses").innerHTML += innerHtml;
    });
    document.getElementById("hangmanImage").src = "hangman" + game.getIncorrectGuesses() + ".png";

    let guessBox = document.getElementById('guessBox');
    if (game.isWon()) {
        guessBox.value = youWon;
        guessBox.classList = "win";
    }
    else if (game.isLost()) {
        guessBox.value = youLost;
        guessBox.classList = "loss";
    }
    else {
        guessBox.value = "";
        guessBox.classList = "";
    }
}

function newGame() {
    history.go(0)
}

let game = new Game();
render(game);
listenForInput(game);
