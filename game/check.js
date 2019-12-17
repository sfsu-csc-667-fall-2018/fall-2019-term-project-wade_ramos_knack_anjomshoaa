var Hand = require('pokersolver').Hand;

const winner = (fiveCard, users) => {

    let hands = [{
        index: '',
        current: [],
        name: null
    }]
    
    let midHand = []
    let userHand = []
    let solveHands = []
    

    return new Promise((resolve, reject) => {
        /**Transforming Puppy Card Ranks to Texas Hold'em 
             * Wiener = diamonds
             * Corgy = clubs
             * Sheeb = spades
             * Pug = hearts
            **/

        for(let i=0; i<fiveCard.length; i++){
            console.log(i)
            if(fiveCard[i].charAt(1)==="W"){
            midHand.push(fiveCard[i].replace(fiveCard[i].charAt(1),"d"))
            }else if(fiveCard[i].charAt(1)==="C"){
            midHand.push(fiveCard[i].replace(fiveCard[i].charAt(1),"c"))    
            }else if(fiveCard[i].charAt(1)==="S"){
            midHand.push(fiveCard[i].replace(fiveCard[i].charAt(1),"s"))    
            }else if(fiveCard[i].charAt(1)==="P"){
            midHand.push(fiveCard[i].replace(fiveCard[i].charAt(1),"h"))
            }
        }
        for(let i=0; i<users.length; i++){
            // console.log(i)
        for(let j=0; j<2; j++){
            if(users[i].isInHand === true)
            {   
            // console.log(users[i].holeCards[j])
                if(users[i].holeCards[j].charAt(1)==="W"){
                    userHand.push(users[i].holeCards[j].replace(users[i].holeCards[j].charAt(1),"d"))
                    }else if(users[i].holeCards[j].charAt(1)==="C"){
                    userHand.push(users[i].holeCards[j].replace(users[i].holeCards[j].charAt(1),"c"))    
                    }else if(users[i].holeCards[j].charAt(1)==="S"){
                    userHand.push(users[i].holeCards[j].replace(users[i].holeCards[j].charAt(1),"s"))    
                    }else if(users[i].holeCards[j].charAt(1)==="P"){
                    userHand.push(users[i].holeCards[j].replace(users[i].holeCards[j].charAt(1),"h"))
                    }
                    if(j==1){
                        //console.log(userHand)
                        userHand = userHand.concat(midHand)
                        hands.push({
                            index: i, current:userHand, name: users[i].username
                        })
                        userHand = []
                    }    
            } 
        }
        }
        
        // console.log(hands)
        for(let i =1; i < hands.length; i++){
        solveHands.push(Hand.solve(hands[i].current))
        }

        for(let i = 0; i < solveHands.length; i++){
            if(Hand.winners([...solveHands]).toString() === solveHands[i].toString()){
                //console.log('check.js: ', hands[i].index);
                resolve(hands[i + 1].index) 
            } 
        }

    })
    
}   

// winner(["5W","8C","5S","6S","7P"],[{"username":"jon","isInHand":true,"chipCount":200,"currentBet":0,"holeCards":["7S","9C"]},{"username":"selina","isInHand":true,"chipCount":200,"currentBet":0,"holeCards":["TP","JS"]},{"username":null,"isInHand":false,"chipCount":200,"currentBet":0,"holeCards":[]},{"username":null,"isInHand":false,"chipCount":200,"currentBet":0,"holeCards":[]},{"username":null,"isInHand":false,"chipCount":200,"currentBet":0,"holeCards":[]},{"username":null,"isInHand":false,"chipCount":200,"currentBet":0,"holeCards":[]},{"username":null,"isInHand":false,"chipCount":200,"currentBet":0,"holeCards":[]},{"username":null,"isInHand":false,"chipCount":200,"currentBet":0,"holeCards":[]},{"username":null,"isInHand":false,"chipCount":200,"currentBet":0,"holeCards":[]}])

module.exports.winner = winner