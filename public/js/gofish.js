let view = {

    roundCount: 1,
    currentRound: 1,

    displayMessage(msg) {
        let gameConsole = document.getElementById("console2");
        gameConsole.innerHTML += "</br>" + msg;

        const consoleTranslation = [
			{chinese: '回合', pinyin: 'huíhé', description: 'раунд, ход'},
			{chinese: '第', pinyin: 'dì', description: 'префикс порядкового числительного'},
			{chinese: '回复', pinyin: 'huífù', description: 'отвечать'},
            {chinese: '我', pinyin: 'wǒ', description: 'я'},
            {chinese: '你', pinyin: 'nǐ', description: 'ты'},
            {chinese: '猜', pinyin: 'cāi', description: 'угадывать, гадать'},
            {chinese: '对', pinyin: 'duì', description: 'верно, правильный'},
            {chinese: '错', pinyin: 'cuò', description: 'ошибаться, неверно'},
            {chinese: '了', pinyin: 'le', description: 'частица, обозначает появление новой ситуации или завершение действия'},
            {chinese: '多少', pinyin: 'duōshǎo', description: 'сколько?'},
            {chinese: '是', pinyin: 'shì', description: 'являться, да'},
            {chinese: '不是', pinyin: 'bú shì', description: 'не являться, нет'},
            {chinese: '没有', pinyin: 'méi yǒu', description: 'не иметь, не обладать'},
            {chinese: '有', pinyin: 'yǒu', description: 'иметь, обладать'}
		]

		for (let i=0; i < consoleTranslation.length; i++) {
			tippy('.'+ consoleTranslation[i].chinese, {
				content: '<div class="pinyin">'+ consoleTranslation[i].pinyin + '</div><div>'+ consoleTranslation[i].description + '</div>',
				theme: 'light-border',
				placement: 'bottom'
            })
        }
        
    },

    deckObject: 
                {
                    rusDeck: ["лошадь","книга","птица","рыба","яблоко","стол","стул","нож","носки","шапка","рубашка","пистолет","карандаш"],
                    engDeck: ["horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil"],
                    chinDeck: ["马","书","鸟","鱼","苹果","桌子","椅子","刀","袜子","帽子","衬衫","手枪","铅笔"],
                    pinyinDeck: ["mǎ","shū","niǎo","yú","píngguǒ","zhuōzi","yǐzi","dāo","wàzi","màozi","chènshān","shǒuqiāng","qiānbǐ"],
                    liangCi: ["匹","本","只","条","个","张","把","把","双","顶","件","把","支"],
                    liangCiPinyin: ["pǐ","běn","zhī","tiáo","ge","zhāng","bǎ","bǎ","shuāng","dǐng","jiàn","bǎ","zhī"]
                }, 
    
    startDeck: ["horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil",
                "horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil",
                "horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil",
                "horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil"],

    startCards: ["horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil"],

    shuffle(arr) {
        for (let i = 0; i < arr.length; i++) {
          let swapIdx = Math.trunc(Math.random() * arr.length);
          let tmp = arr[swapIdx];
          arr[swapIdx] = arr[i];
          arr[i] = tmp;
        }
    },

    sliceIt() {
        this.shuffle(this.startCards);
        return this.startCards.slice(0, 4);
    },

    initPlayers() {
        for (let i=0; i < 4; i++) {
            let player = document.getElementById("player" + i);
            player.innerHTML = "";
            let sliceArr = this.sliceIt();
            model.players[i].cards = sliceArr;
            
            if(i === 3) {
                for (let j=0; j<4; j++) {
                    let elem = document.createElement("img");
                    elem.src = "./img/gofish/" + sliceArr[j] + ".png";
                    elem.setAttribute("class", "playersCards");
                    player.appendChild(elem);
                }
            } else {
                for (let j=0; j<4; j++) {
                    let elem = document.createElement("img");
                    elem.src = "./img/gofish/cardback.png";
                    elem.setAttribute("class", "otherPlayersCards");
                    player.appendChild(elem);
                }
            }
        }

        model.currentPlayer = model.players[3]
    },

    rearrangeCards() {

        for (let i=0; i < 4; i++) {
            let player = document.getElementById("player" + i);
            player.innerHTML = "";

            if(i === 3) {
                for (let j=0; j< model.players[i].cards.length; j++) {
                    let elem = document.createElement("img");
                    elem.src = "./img/gofish/" + model.players[i].cards[j] + ".png";
                    elem.setAttribute("class", "playersCards");
                    player.appendChild(elem);
                }
            } else {
                for (let j=0; j< model.players[i].cards.length; j++) {
                    let elem = document.createElement("img");
                    elem.src = "./img/gofish/cardback.png";
                    elem.setAttribute("class", "otherPlayersCards");
                    player.appendChild(elem);
                }
            }
        }

        let numberOfDeckCards = document.getElementById('numberOfCards');
        numberOfDeckCards.innerHTML = this.startDeck.length;
        this.initStartDeck();
    },

    deleteStartCardsFromStartDeck() {
        for (let i = 0; i < 4; i++) {
            let playerCards = model.players[i].cards;

            for (let j = 0; j < 4; j++) {
                this.startDeck.splice(this.startDeck.indexOf(playerCards[j]),1);
            }
        }
    },

    initStartDeck() {

        if(this.startDeck.length === 52) {
            this.deleteStartCardsFromStartDeck();
            this.shuffle(this.startDeck);
        }
        let startDeck = document.getElementById('startDeck');

        startDeck.innerHTML = '';
        let margin = 0;
        for(let i=0; i < this.startDeck.length; i++) {

                let elem = document.createElement("img");
                elem.src = "./img/gofish/cardback.png";
                margin = i*10;
                elem.style = 'transform: rotate(' + margin + 'deg); position: absolute;'; 
                startDeck.appendChild(elem);
        }
    },

    displayReminder() {
        let reminder = document.getElementById("reminder");
        let table = reminder.getElementsByTagName('td')
        for (let i=0; i < this.deckObject.engDeck.length; i++) {
            let elem = document.createElement("img");
            elem.src = "./img/gofish/" + this.deckObject.engDeck[i] + ".png";
            table[i*5].innerHTML = '';
            table[i*5].appendChild(elem);
            table[i*5 + 1].innerHTML = this.deckObject.chinDeck[i]
            table[i*5 + 2].innerHTML = this.deckObject.pinyinDeck[i]
            table[i*5 + 3].innerHTML = this.deckObject.liangCi[i]
            table[i*5 + 4].innerHTML = this.deckObject.liangCiPinyin[i]

        }
    },

    gameOver() {
        
        let gameOverId = document.getElementById('gameOver');

        for (let i=0; i < 4; i++) {
            
            for (let j=0; j < model.players[i].fullSetsName.length; j++) {

                let elem = document.createElement("img");
                elem.src = "./img/gofish/" + model.players[i].fullSetsName[j] + ".png";

                let scorePlace = gameOverId.getElementsByTagName('td');
                scorePlace[i*2+1].appendChild(elem) 
            }
        }

    },

    animateFullSet(value) {

        if (model.currentPlayer.name === '客官') {
            var playerId = document.getElementById('player3');
        } else if (model.currentPlayer.name === '曹操') {
            var playerId = document.getElementById('player0');
        } else if (model.currentPlayer.name === '刘备') {
            var playerId = document.getElementById('player1');
        } else if (model.currentPlayer.name === '孙权') {
            var playerId = document.getElementById('player2');
        } 

        let elem = document.createElement("img");
        elem.src = "./img/gofish/" + value + ".png";

        playerId.appendChild(elem);
        elem.classList.add('testing');

        changeTeam();
    }

};

let model = {

    chineseNumbers: ["一", "两", "三"],
    currentPlayer: null,
    askedPlayer: null,
    correctGuess: null,
    players: [
        {cards: [], fullSetsName: [], name: "曹操", pinyin: "Cáo Cāo", description: "Цао Цао (155 — 220 гг., китайский полководец, автор сочинений по военному мастерству и поэт, первый министр династии Хань; обр. хитрый, лукавый человек)"},
        {cards: [], fullSetsName: [], name: "刘备", pinyin: "Liú Bèi", description: "Лю Бэй (один из наиболее могущественных полководцев эпохи Троецарствия, основатель царства Шу)"}, 
        {cards: [], fullSetsName: [], name: "孙权", pinyin: "Sūn Quán", description: "Сунь Цюань (годы правления 222-252, правитель У в период Троецарствия)"},
        {cards: [], fullSetsName: [], name: "客官", pinyin: "kèguān", description: "чиновник из чужого княжества (области)"}
    ],

    checkForFullSet() {

        for (let j=0; j < this.players.length; j++) {
            let player = this.players[j];

            let  count = {};
            player.cards.forEach(i =>  count[i] = (count[i]||0) + 1);
    
            let countValues = Object.values(count);
    
            for (let y=0; y < countValues.length; y++) {
                

                if(countValues[y] === 4) {

                    let value = Object.keys(count)[y];
                    player.fullSetsName.push(value);

                    for(let k=0; k < 4; k++) {
                        player.cards.splice(player.cards.indexOf(value), 1);
                    }

                    // if (model.players[0].cards.length === 0 &&
                    //     model.players[1].cards.length === 0 &&
                    //     model.players[2].cards.length === 0 &&
                    //     model.players[3].cards.length === 0) {
            
                    //         alert('the end of a game')
                    //         return false;
                    // }

                    view.rearrangeCards();

                    //// 
                    if (model.currentPlayer.name === '客官') {
                        let playerMe = document.getElementById('player3');

                        for (let z=0; z < 4; z++) {
                            let elem = document.createElement("img");
                            elem.src = "./img/gofish/" + value + ".png";
                    
                            playerMe.appendChild(elem);
                            elem.classList.add('playersCards', 'fadingOut');
                        }
                        fadeOut(); 
                    }

///////
                    view.animateFullSet(value);
                }
            }
        }
    },

    botQuantityGuess(currentPlayer, guess) {

        let arr = currentPlayer.cards;
        let filteredArr = arr.filter( name => name === guess);

        if(filteredArr.length === 3) {
            return 1;
        } else if (filteredArr.length === 2) {
            return Math.ceil(Math.random() * 2);
        } else if (filteredArr.length === 1) {
            return Math.ceil(Math.random() * 3);
        } else {
            return false;
        }
    },

    processCorrectGuess(quantity) {
        let currentPlayer = model.currentPlayer;
        let askedPlayer = model.askedPlayer;
        let guess = this.correctGuess;

        if (currentPlayer.name !== '客官') {
            quantity = this.botQuantityGuess(currentPlayer, guess);
        }

        let quantityToCheck = askedPlayer.cards.filter( elem => elem === guess).length;

        if(quantity === quantityToCheck) {

            //// animate if guess is correct ////

            for(let i = 0; i < quantity; i++) {
                currentPlayer.cards.push(guess);
                askedPlayer.cards.splice( askedPlayer.cards.indexOf(guess), 1 );

            }

            takingCardFromAnother(guess, quantity);

            // view.rearrangeCards();
            view.displayMessage(askedPlayer.name + "<span class=\'回复 transTip\'>回复</span>" + currentPlayer.name + "：<span class=\'猜 transTip\'>猜</span><span class=\'对 transTip\'>对</span><span class=\'了 transTip\'>了</span>！<span class=\'是 transTip\'>是</span>" + this.chineseNumbers[quantity-1] + view.deckObject.liangCi[view.deckObject.engDeck.indexOf(model.correctGuess)]);
            // model.correctGuess = null;
            // this.checkForFullSet();
            return true;
        } else {
            view.displayMessage(askedPlayer.name + "<span class=\'回复 transTip\'>回复</span>" + currentPlayer.name + "：<span class=\'猜 transTip\'>猜</span><span class=\'错 transTip\'>错</span><span class=\'了 transTip\'>了</span>！<span class=\'不是 transTip\'>不是</span>" + this.chineseNumbers[quantity-1] + view.deckObject.liangCi[view.deckObject.engDeck.indexOf(model.correctGuess)]);
            this.correctGuess = null;
            this.checkForFullSet();

            if (view.startDeck.length > 0) {
                let drawedCard = view.startDeck.shift();
                model.currentPlayer.cards.push(drawedCard)

                changeTeamForDrawedCard(drawedCard);
            } else {
                view.rearrangeCards();
                model.checkForFullSet();
                model.currentPlayer = model.players[controller.count];
                controller.count++;
                model.correctGuess = null;
                model.checkForFullSet();
                controller.botsGuess();
            }

            return false;
        }
    }
};

let controller = {
    count: 0,
    startedAskingBots: true,

    //set player who we want to ask
    setPlayerToAsk() {
        let playerName = document.getElementById('playerName').innerHTML;

        if (model.currentPlayer.name === '客官' && playerName === '客官') {
            alert('Вы не можете спрашивать сами себя!');
            document.getElementById('playerName').innerHTML = '问谁';
            model.askedPlayer = null;
        } else {

            let arr = model.players;
    
            model.askedPlayer = arr.find(({name}) => name === playerName);
        }
    },

    ifZeroCards(nextPlayer) {

            if (view.startDeck.length >= 1) {

                let drawedCard = view.startDeck.shift();
                nextPlayer.cards.push(drawedCard);
                
                drawCardIfZeroCards(nextPlayer, drawedCard);

            } else if (view.startDeck.length === 0) {
                controller.count++;
            }

    },

    //guess if player has the thing, if he doesn't - then it's next player's turn
    processGuess(guess) {
        let currentPlayer = model.currentPlayer;

        if (currentPlayer.name === '客官') {
            this.setPlayerToAsk();
            this.count = 0;

            if(this.startedAskingBots) {
                view.displayMessage('--- <span class=\"第 transTip\">第</span>' + view.roundCount + '<span class=\"回合 transTip\">回合</span> ---');
                view.roundCount++;
                this.startedAskingBots = false;
            }
        } else {
            this.startedAskingBots = true;
        }

        let askedPlayer = model.askedPlayer;

        if (model.askedPlayer === null || model.askedPlayer === undefined) {
            alert('Сначала выберите кого хотите спросить');
            return false;
        }


        if(currentPlayer.cards.indexOf(guess) >= 0 && askedPlayer.cards.indexOf(guess) >= 0) {
            view.displayMessage(askedPlayer.name + "<span class=\'回复 transTip\'>回复</span>" + currentPlayer.name + "：<span class=\'我 transTip\'>我</span><span class=\'有 transTip\'>有</span>" + view.deckObject.chinDeck[view.deckObject.engDeck.indexOf(guess)] + "。<span class=\'你 transTip\'>你</span><span class=\'猜 transTip\'>猜</span><span class=\'我 transTip\'>我</span><span class=\'有 transTip\'>有</span><span class=\'多少 transTip\'>多少</span>");
            model.correctGuess = guess;

            if(currentPlayer.name === '客官') {

            } else {
                let quantityGuess = model.processCorrectGuess();

                /// CHECK IT  !!!!!
                if(quantityGuess) {
                    // model.correctGuess = null;
                    // this.botsGuess();
                } 
            }

        } else if (currentPlayer.cards.indexOf(guess) < 0 && currentPlayer.cards.length !== 0) {
            view.displayMessage(askedPlayer.name + "<span class=\'回复 transTip\'>回复</span>" + currentPlayer.name + "：你自己都没有，干嘛问别人！");
            model.correctGuess = null;
            this.botsGuess();
        } else if (currentPlayer.cards.length === 0 && view.startDeck.length === 0) {
            model.currentPlayer = model.players[controller.count];
            controller.count++;
            model.correctGuess = null;
            model.checkForFullSet();
            controller.botsGuess();
        } else {
            view.displayMessage(askedPlayer.name + "<span class=\'回复 transTip\'>回复</span>" + currentPlayer.name + "：<span class=\'没有 transTip\'>没有</span>。<span class=\'我 transTip\'>我</span><span class=\'没有 transTip\'>没有</span>" + view.deckObject.chinDeck[view.deckObject.engDeck.indexOf(guess)]);

            if (view.startDeck.length > 0) {
                let drawedCard = view.startDeck.shift();
                model.currentPlayer.cards.push(drawedCard) 
                
                changeTeamForDrawedCard(drawedCard);
            } else {
                view.rearrangeCards();
                model.checkForFullSet();

                let nextPlayer = model.players[this.count];
                if (nextPlayer.cards.length === 0 && view.startDeck.length > 0) {
                    this.ifZeroCards(nextPlayer);
                } else {
                    model.currentPlayer = model.players[controller.count];
                    controller.count++;
                    model.correctGuess = null;
                    model.checkForFullSet();
                    controller.botsGuess();
                }

            }

        }
    },

    botSetsPlayerToAsk() {
        let arr = model.players;
        let randPlayerInd = Math.floor(arr.length * Math.random())
        let randPlayer = arr[randPlayerInd]

        // ask player who isn't equal current bot player and has at least one card
        while (randPlayer.name === model.currentPlayer.name || randPlayer.cards.length === 0) {
            randPlayerInd = Math.floor(arr.length * Math.random())
            randPlayer = arr[randPlayerInd]
        }

        document.getElementById('playerName').innerHTML = randPlayer.name;

        model.askedPlayer = randPlayer;
        
        let guessInd = Math.floor(Math.random() * model.currentPlayer.cards.length)
        let guess = model.currentPlayer.cards[guessInd]

        return guess;
    },

    botsGuess() {
        if (model.currentPlayer.name !== '客官') {
            let guess = this.botSetsPlayerToAsk();
            this.processGuess(guess);
        } 
    }
};

/////////////////
/// FUNCTIONS ///
/////////////////

function init() {
    view.initPlayers();
    view.initStartDeck();
    view.displayReminder();

    resize();
}

function replayClick() {

    // FOR RESTART
    const console2 = document.getElementById('console2');
    console2.innerHTML = '';

    const numberOfCards = document.getElementById('numberOfCards');
    numberOfCards.innerHTML = '36';

    const inputValue = document.getElementById('guessInput');
    inputValue.value = '';

    const playerName = document.getElementById('playerName');
    playerName.innerHTML = '问谁';

    const scores = document.getElementsByClassName('scoreBoard');
    for(let i =0; i< scores.length; i++) {
        scores[i].innerHTML = '';
    }

    model.askedPlayer = null;
    model.correctGuess = null;

    controller.count = 0;
    controller.startedAskingBots = true;

    view.roundCount = 1;
    view.startDeck  = ["horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil",
                    "horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil",
                    "horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil",
                    "horse","book","bird","fish","apple","table","chair","knife","socks","hat","shirt","gun","pencil"];

    init();
};

function parseGuess(guess) {

    guess = guess.trim();

    if (guess.length === 0) {
        alert("Нужно ввести ответ");
    } else {
        // regex to delete question mark
        guess = guess.replace(/\？/g,'');

        if(guess.includes('你有没有') && !guess.includes('吗')) {
            guess = guess.substring(4);

        } else if (!guess.includes('你有没有') && guess.includes('吗')  && guess.includes('你有')) {
            guess = guess.substring(2, guess.length - 1);
        } else {
            alert("Уверены, что правильно написали?");
            return null;
        }

        engGuess = view.deckObject.engDeck[view.deckObject.chinDeck.indexOf(guess)];
        return engGuess; 
    }
    return null;
}

function parseQuant(quantity) {

    quantity = quantity.trim();

    if (quantity.length === 0) {
        alert("Нужно ввести ответ");
        return null;
    } else {

        let index = view.deckObject.engDeck.indexOf(model.correctGuess);

        if(quantity.includes('我猜你有') && quantity.includes(view.deckObject.liangCi[index])) {
            quantity = quantity.charAt(4);
        } else if (!quantity.includes('我猜') && quantity.includes('你有') && quantity.includes(view.deckObject.liangCi[index])) {
            quantity = quantity.charAt(2);
        } else if (!quantity.includes(view.deckObject.liangCi[index])) {
            alert("А где нужное счетное слово?");
            return null;
        } else {
            alert("Уверены, что правильно написали?");
            return null;
        }

        quantityInt = (model.chineseNumbers.indexOf(quantity) + 1);
        return quantityInt; 
    }
}

function handleFireButton() {
    let fireButton = document.getElementById('fireButton');
    fireButton.setAttribute('onclick', '')

    let playerName = document.getElementById('playerName').innerHTML;

    if(model.askedPlayer !== null || playerName !== '问谁' || playerName !== '客官') {
        if(model.currentPlayer.name === '客官') {
            let guessInput = document.getElementById("guessInput");
            if(!model.correctGuess) {
                let guess = guessInput.value;
                guess = parseGuess(guess);
                controller.processGuess(guess);
            } else {
                let quantity = guessInput.value;
                quantity = parseQuant(quantity);

                if(quantity === null) {
                    view.displayMessage(model.askedPlayer.name + "<span class=\'回复 transTip\'>回复</span>" + model.currentPlayer.name + "：你问得不对！再来一次");
                } else {
                    model.processCorrectGuess(quantity);
                }
            }
        }
    } else {
        alert('Выберите игрока, которого хотите спросить');
        model.askedPlayer = null;
    }

    setTimeout(function(){
        let fireButton = document.getElementById('fireButton');
        fireButton.setAttribute('onclick', 'handleFireButton();')
    }, 500)
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }

    if (e.keyCode === 32) {
        const focusInput = document.getElementById("guessInput");
        focusInput.value = '';
        imgSpeech.click();        
        focusInput.focus(); 
        return false;
    }
}

window.onload = init;


//choose which player you want ask
function putNameIn() {
    let playerName = document.getElementById("playerName");
    playerName.innerHTML = this.getElementsByTagName("h4")[0].innerHTML;
    playerName.style.transition = '';
    playerName.style.backgroundColor = '#6c757d';
    playerName.style.color = 'white';


    setTimeout( ()=> {
        playerName.style.transition = 'all .6s ease-out';
        playerName.style.backgroundColor = '#e9ecef';
        playerName.style.color = '#495057';
    }, 150)

    let arr = model.players;
    model.askedPlayer = arr.find(({name}) => name === playerName.innerHTML);

}

document.getElementById("player_0_name").addEventListener("click", putNameIn);
document.getElementById("player_1_name").addEventListener("click", putNameIn);
document.getElementById("player_2_name").addEventListener("click", putNameIn);

document.addEventListener("keydown", handleKeyPress, false);





///////// GSAP ANIMATION ///////////

// fullSet animation

function changeTeam() {

    if (model.currentPlayer.name === '客官') {
		var board = document.getElementsByClassName('scoreBoard')[3];
	} else if (model.currentPlayer.name === '曹操') {
		var board = document.getElementsByClassName('scoreBoard')[0];
	} else if (model.currentPlayer.name === '刘备') {
		var board = document.getElementsByClassName('scoreBoard')[1];
	} else if (model.currentPlayer.name === '孙权') {
		var board = document.getElementsByClassName('scoreBoard')[2];
    }
    
	var test = [...document.getElementsByClassName('testing')];

	board.innerHTML += '';

	for(let k=0; k < test.length; k++) {
        var rect = test[k].getBoundingClientRect();

        board.appendChild(test[k]);
        
        TweenMax.set(test[k], {x: 0, y: 0});
        
        gsap.to(test[k], 1, {  });
            
        var newRect = test[k].getBoundingClientRect();

        gsap.from(test[k], 3, {
            x: rect.left - newRect.left,
            y: rect.top - newRect.top,
            ease: Power4.easeOut
        });
        test[k].classList.remove("testing");
	}
}

// fade out for fullSet animation

const $el = document.getElementsByClassName('fadingOut');
const duration = 2;
const from = { opacity: 1, ease: Linear.ease };
const to = { 
    opacity: 0,
    onComplete: deleteFaded 
};

function fadeOut() {
   TweenLite.fromTo($el, duration, from, to);
}

function deleteFaded() {
    $('.fadingOut').remove();
}

// draw card from startDeck animation

function changeTeamForDrawedCard(drawedCard) {
    
    let startDeck = document.getElementById('startDeck');

    let elem = document.createElement("img");

    if (model.currentPlayer.name === '客官') {
        var board = document.getElementById('player3');
        elem.src = "./img/gofish/" + drawedCard + ".png";
        elem.classList.add('playersCards', 'drawCardAnimation');

	} else if (model.currentPlayer.name === '曹操') {
        var board = document.getElementById('player0');
        elem.src = "./img/gofish/cardback.png";
        elem.classList.add('otherPlayersCards', 'drawCardAnimation');

	} else if (model.currentPlayer.name === '刘备') {
        var board = document.getElementById('player1');
        elem.src = "./img/gofish/cardback.png";
        elem.classList.add('otherPlayersCards', 'drawCardAnimation');


	} else if (model.currentPlayer.name === '孙权') {
        var board = document.getElementById('player2');
        elem.src = "./img/gofish/cardback.png";
        elem.classList.add('otherPlayersCards', 'drawCardAnimation');


    }

    startDeck.appendChild(elem);

	var test = [...document.getElementsByClassName('drawCardAnimation')];

	board.innerHTML += '';

	for(let k=0; k < test.length; k++) {
        var rect = test[k].getBoundingClientRect();

        board.appendChild(test[k]);
        
        TweenMax.set(test[k], {x: 0, y: 0});
        
        gsap.to(test[k], 1, {  });
            
        var newRect = test[k].getBoundingClientRect();

        gsap.from(test[k], 1, {
            x: rect.left - newRect.left,
            y: rect.top - newRect.top,
            ease: Power2.easeIn,
            onComplete: endDrawCardAction
        });
        // test[k].classList.remove("drawCardAnimation");
	}
}

function endDrawCardAction() {
    view.rearrangeCards();
    model.checkForFullSet();


    let nextPlayer = model.players[controller.count];
    if (nextPlayer.cards.length === 0) {
        controller.ifZeroCards(nextPlayer);
    } else {
        model.currentPlayer = model.players[controller.count];
        controller.count++;
        model.correctGuess = null;
        model.checkForFullSet();
        controller.botsGuess();
    }


}

// draw card from startDeck animation IF PLAYER HAS NO CARDS 

function drawCardIfZeroCards(nextPlayer, drawedCard) {
    
    let startDeck = document.getElementById('startDeck');

    let elem = document.createElement("img");

    if (nextPlayer.name === '客官') {
        var board = document.getElementById('player3');
        elem.src = "./img/gofish/" + drawedCard + ".png";
        elem.classList.add('playersCards', 'drawCardAnimationZero');

	} else if (nextPlayer.name === '曹操') {
        var board = document.getElementById('player0');
        elem.src = "./img/gofish/cardback.png";
        elem.classList.add('otherPlayersCards', 'drawCardAnimationZero');

	} else if (nextPlayer.name === '刘备') {
        var board = document.getElementById('player1');
        elem.src = "./img/gofish/cardback.png";
        elem.classList.add('otherPlayersCards', 'drawCardAnimationZero');


	} else if (nextPlayer.name === '孙权') {
        var board = document.getElementById('player2');
        elem.src = "./img/gofish/cardback.png";
        elem.classList.add('otherPlayersCards', 'drawCardAnimationZero');

    }

    startDeck.appendChild(elem);

	var test = [...document.getElementsByClassName('drawCardAnimationZero')];

	board.innerHTML += '';

	for(let k=0; k < test.length; k++) {
        var rect = test[k].getBoundingClientRect();

        board.appendChild(test[k]);
        
        TweenMax.set(test[k], {x: 0, y: 0});
        
        gsap.to(test[k], 1, {  });
            
        var newRect = test[k].getBoundingClientRect();

        gsap.from(test[k], 1, {
            x: rect.left - newRect.left,
            y: rect.top - newRect.top,
            ease: Power2.easeIn,

            ///////////////////
            onComplete: endDrawCardActionForZeroCards
        });
        // test[k].classList.remove("drawCardAnimationZero");
	}
}

function endDrawCardActionForZeroCards() {
    model.currentPlayer = model.players[controller.count];
    controller.count++;
    model.correctGuess = null;
    model.checkForFullSet();
    controller.botsGuess();
}


// TAKE card from another player animation

function takingCardFromAnother(drawedCard, quantity) {

    if (model.askedPlayer.name === '客官') {
        var startDeck = document.getElementById('player3');
	} else if (model.askedPlayer.name === '曹操') {
        var startDeck = document.getElementById('player0');
	} else if (model.askedPlayer.name === '刘备') {
        var startDeck = document.getElementById('player1');
	} else if (model.askedPlayer.name === '孙权') {
        var startDeck = document.getElementById('player2');
    }


    for (let i=0; i < quantity; i++) {
        let elem = document.createElement("img");
        elem.src = "./img/gofish/" + drawedCard + ".png";
        if (model.currentPlayer.name === '客官') {
            elem.classList.add('playersCards', 'drawCardAnimation', 'whiteBack');
            startDeck.appendChild(elem);
            elem.style.marginLeft = '' + 20*i + 'px';

        } else {
            elem.classList.add('otherPlayersCardsFromOthers', 'drawCardAnimation', 'whiteBack');
            startDeck.appendChild(elem);
            elem.style.marginLeft = '' + 20*i + 'px';
        }
    
    }

    

    if (model.currentPlayer.name === '客官') {
        var board = document.getElementById('player3');

	} else if (model.currentPlayer.name === '曹操') {
        var board = document.getElementById('player0');

	} else if (model.currentPlayer.name === '刘备') {
        var board = document.getElementById('player1');

	} else if (model.currentPlayer.name === '孙权') {
        var board = document.getElementById('player2');
    }


	var test = [...document.getElementsByClassName('drawCardAnimation')];

	board.innerHTML += '';


    if(test.length === 1) {
        for(let k=0; k < test.length; k++) {
            var rect = test[k].getBoundingClientRect();
    
            board.appendChild(test[k]);
            
            TweenMax.set(test[k], {x: 0, y: 0});
            
            gsap.to(test[k], 1, {  });
                
            var newRect = test[k].getBoundingClientRect();
    
            gsap.from(test[k], 1, {
                x: rect.left - newRect.left,
                y: rect.top - newRect.top,
                ease: Power2.easeIn,
    
                onComplete: endTakeCardAction
            });
        }
    } else if ( test.length === 2) {
        for(let k=0; k < test.length-1; k++) {
            var rect = test[k].getBoundingClientRect();
    
            board.appendChild(test[k]);
            
            TweenMax.set(test[k], {x: 0, y: 0});
            
            gsap.to(test[k], 1, {  });
                
            var newRect = test[k].getBoundingClientRect();
    
            gsap.from(test[k], 1, {
                x: rect.left - newRect.left,
                y: rect.top - newRect.top,
                ease: Power2.easeIn
            });
        }

        for(let k=1; k < test.length; k++) {
            var rect = test[k].getBoundingClientRect();
    
            board.appendChild(test[k]);
            
            TweenMax.set(test[k], {x: 0, y: 0});
            
            gsap.to(test[k], 1, {  });
                
            var newRect = test[k].getBoundingClientRect();
    
            gsap.from(test[k], 1, {
                x: rect.left - newRect.left,
                y: rect.top - newRect.top,
                ease: Power2.easeIn,
                onComplete: endTakeCardAction
            });
        }
    } else if (test.length === 3) {

        for(let k=0; k < test.length-1; k++) {
            var rect = test[k].getBoundingClientRect();
    
            board.appendChild(test[k]);
            
            TweenMax.set(test[k], {x: 0, y: 0});
            
            gsap.to(test[k], 1, {  });
                
            var newRect = test[k].getBoundingClientRect();
    
            gsap.from(test[k], 1, {
                x: rect.left - newRect.left,
                y: rect.top - newRect.top,
                ease: Power2.easeIn
            });
        }

        for(let k=2; k < test.length; k++) {
            var rect = test[k].getBoundingClientRect();
    
            board.appendChild(test[k]);
            
            TweenMax.set(test[k], {x: 0, y: 0});
            
            gsap.to(test[k], 1, {  });
                
            var newRect = test[k].getBoundingClientRect();
    
            gsap.from(test[k], 1, {
                x: rect.left - newRect.left,
                y: rect.top - newRect.top,
                ease: Power2.easeIn,
                onComplete: endTakeCardAction
            });
        }
    }

}

function endTakeCardAction() {

    
        setTimeout(function() {
            view.rearrangeCards();
            model.correctGuess = null;
            model.checkForFullSet();

            if (model.players[0].cards.length === 0 &&
                model.players[1].cards.length === 0 &&
                model.players[2].cards.length === 0 &&
                model.players[3].cards.length === 0) {
        
                    // тут поставить счет 
                    alert('Конец: сценарий 2')

                    view.gameOver();
                    $('#myModal').modal('show')
                    return false;
            } else if (model.currentPlayer.name === '客官' && model.currentPlayer.cards.length === 0 && model.currentPlayer.cards.length === 0) {
                alert('Конец')
                view.gameOver();
                $('#myModal').modal('show')
                return false;
            }
            //

            if(model.currentPlayer.name !== '客官' && model.currentPlayer.cards.length > 0) {
                controller.botsGuess();
    
            } else if (model.currentPlayer.cards.length === 0 && view.startDeck.length === 0) {
    
                model.currentPlayer = model.players[controller.count]; 
    
                if(model.currentPlayer.name === '客官' && view.startDeck.length === 0 && model.currentPlayer.cards.length === 0) {
                /// End Of a Game!
                alert('the end 3')
    
                } else {
                    model.correctGuess = null;
                    model.checkForFullSet();
                    controller.botsGuess();
                }
            } else if (model.currentPlayer.name === '客官' && model.currentPlayer.cards.length === 0 && model.currentPlayer.cards.length === 0) {
                /// End Of a Game!
                alert('Конец: сценарий 3')
                return false;

            } else if (model.currentPlayer.name !== '客官' && model.currentPlayer.cards.length === 0 && view.startDeck.length === 0) {
    
                model.currentPlayer = model.players[controller.count]; 
    
                if(model.currentPlayer.name === '客官' && view.startDeck.length === 0 && model.currentPlayer.cards.length === 0) {
                    /// End Of a Game!
                    alert('the end 5')
        
                    } else {
                        model.correctGuess = null;
                        model.checkForFullSet();
                        controller.botsGuess();
                    }
            }
        }, 500)

}


// @TODO умнее боты === если уже забрал карту у кого-то, то не спрашивать в этот кон того же игрока про ту же карту
// @TODO zero cards after FULL SET -- need to check it