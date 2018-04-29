var cardPoints = 0;
var playerPoints = 0;
var dealerPoints = 0;
var playerSoftPoints = 0;   // for Aces
var dealerSoftPoints = 0;

var cardNumb = 2;
var messages = "";

var dealCards = true;
var hitCard = false;
var dealtCards = [];
var betAmount = Number(document.getElementById("bet").value);
var playerCash = 500;
var dealerCash = 500;
var winner;
var pot = 0;

document.getElementById("player-cash").innerHTML = "Cash $" + playerCash;
document.getElementById("dealer-cash").innerHTML = "Cash $" + dealerCash;

var cardNumbs = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
var cardSuits = ["Hearts", "Diamonds", "Clubs", "Spades"];
var dealtCards = [];

var myHand = new Hand();
var dealerHand = new Hand();

function Card(face_value, suit) {
    this.face_value = face_value;
    if (face_value >= 2 && face_value <= 10){
        this.card_number = face_value;
    }
    else if (face_value.toUpperCase() === "J") {
        this.card_number = 11;
    }
    else if (face_value.toUpperCase() === "Q") {
        this.card_number = 12;
    }
    else if (face_value.toUpperCase() === "K") {
        this.card_number = 13;
    }
    else if (face_value.toUpperCase() === "A") {
        this.card_number = 1;
    }
    this.image = "images/cards/" + face_value + suit[0] + ".png";
    this.suit = suit;
    this.softPoints = 0;
    
    if (this.card_number >= 11){
        this.pointValue = 10;
    }
    else if (this.card_number === 1) {
        this.pointValue = 11;
        this.softPoints -= 10;
    }
    else {
        this.pointValue = this.card_number;
    }
}

function Hand() {
    this.cards = [];
    this.addCard = function(card) {
        this.cards.push(card);
    }
    this.softPoints = 0
    this.getPoints = function() {
        var handPoints = 0
        for (x in this.cards) {
            handPoints += this.cards[x]["pointValue"]
        }
        return handPoints + this.softPoints;
    }
}

function deal() {
    document.getElementById("player-card2").src="";
    document.getElementById("dealer-card2").src="";
    cardNumb = 2;
    // Adjusts bet to not exceed player or dealer cash
    betAmount = Number(document.getElementById("bet").value);
    if (betAmount > playerCash || betAmount > dealerCash) {
        betAmount = Math.min(playerCash, dealerCash);
        document.getElementById("bet").value = betAmount;
    }
    playerCash -= betAmount;
    dealerCash -= betAmount;
    document.getElementById("player-cash").innerHTML = "Cash $" + playerCash;
    document.getElementById("dealer-cash").innerHTML = "Cash $" + dealerCash;
    pot = betAmount * 2;
    document.getElementById("pot").innerHTML = "Pot - $" + pot;
    
    if (dealCards === true) {
        var currentPlayer = "player"
        var numb_cards_to_deal = 2;
        for (var j = 0; j < 2; j++){
            // deals for player on the first loop then deals dealer cards during second
            if (currentPlayer === "dealer") {
                numb_cards_to_deal = 1
            }
            for (var i = 0; i < numb_cards_to_deal; i++) {
                var random_card_numb = Math.floor(Math.random() * 13);
                var random_card_suit = Math.floor(Math.random() * 4);
                var random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];
                
                while (dealtCards.indexOf(random_card) >= 0) {
                    random_card_numb = Math.floor(Math.random() * 13);
                    random_card_suit = Math.floor(Math.random() * 4);
                    random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];
                }
                dealtCards.push(random_card);
                
                var myCard = new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]);
                
                document.getElementById(currentPlayer + "-card" + i).src= myCard.image;
                
                if (currentPlayer === "player") {
                    myHand.addCard(new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]));
                    if (myCard.pointValue === 11) {
                        playerSoftPoints -= 10
                    }
                }
                else if (currentPlayer === "dealer"){
                    dealerHand.addCard(new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]));
                    if (myCard.pointValue === 11) {
                        dealerSoftPoints -= 10
                    }
                }
                
                playerPoints = myHand.getPoints();
                document.getElementById("player-points").innerHTML = playerPoints;
                dealerPoints = dealerHand.getPoints();
                document.getElementById("dealer-points").innerHTML = dealerPoints;
                 
                document.getElementById("dealer-card1").src="images/cards/red_back.png";
                
                dealCards = false;
                hitCard = true;
                
                }
        currentPlayer = "dealer"
        }
    if (playerPoints === 21) {
            messages = "Blackjack!";
            document.getElementById("messages").innerHTML = messages;
            hitCard = false;
            setTimeout(blackjackOnDraw, 2000);
        }
        else {
            messages = "Hit or Stand?";
            document.getElementById("messages").innerHTML = messages;  
        }   
        document.getElementById("deal-button").style.visibility="hidden";
        document.getElementById("hit-button").style.visibility="visible";
        document.getElementById("stand-button").style.visibility="visible";
    }
}

function hit() {
    // Generate cards
    if (hitCard === true){
        var random_card_numb = Math.floor(Math.random() * 13);
        var random_card_suit = Math.floor(Math.random() * 4);
        var random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];

        while (dealtCards.indexOf(random_card) >= 0) {
            random_card_numb = Math.floor(Math.random() * 13);
            random_card_suit = Math.floor(Math.random() * 4);
            random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];
        }
        dealtCards.push(random_card);
        
        var myCard = new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]);
        
        myHand.addCard(new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]));
        
        document.getElementById("player-card" + cardNumb).src= myCard.image;
        
        playerPoints = myHand.getPoints();
        
        if (myCard.pointValue === 11) {
            playerSoftPoints -= 10;
        }
        
        cardNumb += 1
        
    if (playerPoints > 21 && playerSoftPoints < 0) {
        playerPoints -= 10;
        myHand.softPoints -= 10;
        playerSoftPoints += 10;
        // converts an Ace to 1 point
    }    
        
    document.getElementById("player-points").innerHTML = playerPoints;
    
    if (playerPoints > 21) {
        messages = "Bust. You lost $" + betAmount;
        document.getElementById("messages").innerHTML = messages;
        hitCard = false;
        winner = "Dealer";
        setTimeout(gameOver, 3500);
        }    
    }
}
function stand() {
    if (dealCards != true) {
        cardNumb = 1;
        hitCard = false;
        while (dealerPoints < 17) {
            var random_card_numb = Math.floor(Math.random() * 13);
            var random_card_suit = Math.floor(Math.random() * 4);
            var random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];

            while (dealtCards.indexOf(random_card) >= 0) {
                random_card_numb = Math.floor(Math.random() * 13);
                random_card_suit = Math.floor(Math.random() * 4);
                random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];
            }
            dealtCards.push(random_card);

            var myCard = new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]);
            
            dealerHand.addCard(new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]));
        
            document.getElementById("dealer-card" + cardNumb).src= myCard.image;

            dealerPoints = dealerHand.getPoints();

            if (myCard.pointValue === 11) {
                dealerSoftPoints -= 10;
            }
            
            cardNumb += 1;

            if (dealerPoints > 21 && dealerSoftPoints < 0) {
                dealerPoints -= 10;
                dealerHand.softPoints -= 10;
                dealerSoftPoints += 10;
            // converts an Ace to 1 point
            }    
            document.getElementById("dealer-points").innerHTML = dealerPoints;
        }
    }
    
    document.getElementById("player-points").innerHTML = playerPoints;
    
    if (dealerPoints > 21) {
        messages = "Dealer bust. You win $" + betAmount + "!";
        winner = "Player";
    }
    else if (dealerPoints < playerPoints) {
        messages = "You win $" + betAmount + "!";
        winner = "Player";
    }
    else if (dealerPoints > playerPoints) {
        messages = "You lost $" + betAmount;
        winner = "Dealer";
    }
    else if (dealerPoints === playerPoints) {
        messages = "Push";
        winner = "None";
        playerCash += betAmount;
        dealerCash += betAmount
    }
    document.getElementById("messages").innerHTML = messages;
    setTimeout(gameOver, 3500);
}

function blackjackOnDraw() {
        var random_card_numb = Math.floor(Math.random() * 13);
        var random_card_suit = Math.floor(Math.random() * 4);
        var random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];

        while (dealtCards.indexOf(random_card) >= 0) {
            random_card_numb = Math.floor(Math.random() * 13);
            random_card_suit = Math.floor(Math.random() * 4);
            random_card = cardNumbs[random_card_numb] + cardSuits[random_card_suit];
        }
        var myCard = new Card(cardNumbs[random_card_numb], cardSuits[random_card_suit]);
        document.getElementById("dealer-card1").src= myCard.image;

        dealerPoints = dealerHand.getPoints();
        document.getElementById("dealer-points").innerHTML = dealerPoints;
    
    document.getElementById("messages").innerHTML = messages;
    
    setTimeout(gameOver, 3500);
}

function increaseBet() {
    if (dealCards === true && betAmount < playerCash) {
        betAmount = Number(document.getElementById("bet").value);
        betAmount += 1;
        document.getElementById("bet").value = betAmount;
    }
}

function decreaseBet() {
    if (betAmount > 5 && dealCards === true) {
        betAmount = Number(document.getElementById("bet").value);
        betAmount -= 1;
        document.getElementById("bet").value = betAmount;
    }
    if (betAmount > playerCash) {
        document.getElementById("bet").value = playerCash;
    }
}

function gameOver() {
    // adds bet amount to winner
    if (winner === "Player") {
        playerCash += pot;
    }
    else if (winner === "Dealer") {
        dealerCash += pot;
    }
    pot = 0;
    
    document.getElementById("player-cash").innerHTML = "Cash $" + playerCash;
    document.getElementById("dealer-cash").innerHTML = "Cash $" + dealerCash;
    document.getElementById("pot").innerHTML = "Pot - $" + pot;
    
    if (playerCash > 0 && dealerCash > 0) {
    
        cardNumb = 0
        while (cardNumb < 6) {
            document.getElementById("player-card" + cardNumb).src="";
            document.getElementById("dealer-card" + cardNumb).src="";
            cardNumb += 1;
        }
        // reset all variables
        document.getElementById("player-card1").src="images/cards/red_back.png";
        document.getElementById("dealer-card1").src="images/cards/red_back.png";
        document.getElementById("player-card2").src="images/cards/red_back.png";
        document.getElementById("dealer-card2").src="images/cards/red_back.png";
        
        playerPoints = 0;
        dealerPoints = 0;
        myHand = new Hand();
        dealerHand = new Hand();
        document.getElementById("player-points").innerHTML = playerPoints;
        document.getElementById("dealer-points").innerHTML = dealerPoints;
        dealCards = true;
        messages = "Place bet and click deal to play another hand";
        document.getElementById("deal-button").style.visibility="visible";
        document.getElementById("hit-button").style.visibility="hidden";
        document.getElementById("stand-button").style.visibility="hidden";
        playerSoftPoints = 0;
        dealerSoftPoints = 0;
            
        dealtCards = [];
        
    
    }
    else if (dealerCash === 0) {
        messages = "Congratulations, you won all the dealers money!"
        document.getElementById("hit-button").style.visibility="hidden";
        document.getElementById("stand-button").style.visibility="hidden";
    }
    else if (playerCash === 0) {
        messages = "You lost all your money. Game Over"
        document.getElementById("hit-button").style.visibility="hidden";
        document.getElementById("stand-button").style.visibility="hidden";
    }
    document.getElementById("messages").innerHTML = messages;
    
}

var date = new Date();
var currentYear = date.getFullYear();

$("#copyright").text("\u00A9 " + currentYear + " JablonskiWebDevelopment");