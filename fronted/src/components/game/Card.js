import React from 'react'

const Card = ({card}) => {
  const cardRelativePath = `resources/${card}.png`
  return (
    <img src={cardRelativePath} alt="This players hole card" id="hole-card" />
  )
}

export default Card