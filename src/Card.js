import React from "react";

/** Presentational component Card
 * Renders a card image.
 * Props:
 * - card: { imageUrl, cardValue, suit }
 */

function Card({card}) {
  return <img src={card.imageUrl} alt={`${card.cardValue} of ${card.suit}`}  />
}

export default Card;