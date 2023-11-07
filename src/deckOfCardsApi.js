const BASE_URL = "https://deckofcardsapi.com/api/deck";

/**
 * Get a new deck from the API
 *
 * Returns deckId for the new deck as a string.
 */

async function getNewDeck() {
  const resp = await fetch(BASE_URL + "/new/shuffle");
  const data = await resp.json();
  return data.deck_id;
}

/**
 * Gets next card in an existing deck from the API.
 * Takes deckId as string.
 * Returns object like { imageUrl, cardValue, suit, remaining }
 *
 */

async function getNextCard(deckId) {
  const resp = await fetch(BASE_URL + `/${deckId}/draw`);
  const data = await resp.json();
  const { image, value, suit } = data.cards[0];
  return {
    imageUrl: image,
    cardValue: value,
    suit: suit,
    remaining: data.remaining
  };
}

export { getNewDeck, getNextCard };