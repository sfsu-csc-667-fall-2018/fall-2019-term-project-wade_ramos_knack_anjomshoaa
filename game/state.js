
const defaultUsername = null;
const defaultIsInHand = false;
const defaultChipCount = 200;
const defaultCurrentBet = 0;

let _deck = [];
let suits = ["C","W","S","P"];
let ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
suits.forEach((suit) =>{    
    ranks.forEach((rank) => {
        let card = str.concat(rank,suit);
        _deck.push(card);
    });
});

let players = [
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount : defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    },
    {
      username: defaultUsername,
      isInHand: defaultIsInHand,
      chipCount: defaultChipCount,
      currentBet: defaultCurrentBet,
      holeCards: []
    }
  ]
  
  let communityCards =  [
    _deck.pop(), _deck.pop(), _deck.pop(), _deck.pop(), _deck.pop()
  ]
  
class State {
    constructor(_id, _username){

        players[0].username = _username;
        players[0].isInHand = true;
        players[0].holeCards.push(_deck.pop())
        players[0].holeCards.push(_deck.pop())

        let record =  
                {
                    id: _id
                    , created_at: 'NOW()'
                    , updated_at: 'NOW()'
                    , deck: _deck
                    , pot_amount: 0
                    , player_count: 1
                    , community_cards: JSON.stringify(communityCards)
                    , player_ranking: null
                    , is_active: true
                    , dealer: 0
                    , last_raised: 0
                    , current_player: 3
                    , players: JSON.stringify(players)
                }
    }
};

module.exports = State;