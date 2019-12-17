import React from 'react'
import Card from './Card'

const CommunityCards = ({cards, currentBettingRound}) => {
  if(currentBettingRound >= 4) {
    return (
      <div id="community-cards">
        {cards.map((card, i) => <Card key={i} card={card} />)}
      </div>
    )
  } else if(currentBettingRound === 3) {
    return (
      <div id="community-cards">
        <Card card={cards[0]} />
        <Card card={cards[1]} />
        <Card card={cards[2]} />
        <Card card={cards[3]} />
      </div>
    ) 
  } else if(currentBettingRound === 2) {
      return (
        <div id="community-cards">
          <Card card={cards[0]} />
          <Card card={cards[1]} />
          <Card card={cards[2]} />
        </div>
      )
  } else {
    return (
      <div id="community-cards"></div>
    )
  }
}

export default CommunityCards