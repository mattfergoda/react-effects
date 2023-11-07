import React, { useState, useEffect } from "react";
import { getNewDeck, getNextCard } from "./deckOfCardsApi";
import Card from "./Card";

/** Logical component representing the list of drawn cards.
 * State:
 * - deck: { id, cardsDrawn, remaining, isLoading, showErrorMsg }
 *  where cardsDrawn is like [{ imageUrl, cardValue, suit }, ...]
 *
 * App -> CardList
 */

function CardList() {
  const [deck, setDeck] = useState({
    id: null,
    cardsDrawn: null,
    remaining: null,
    isLoading: true,
    showErrorMsg: false,
  });

  console.log("Rendering CardList. deck=", deck);

  /** Effect for getting deck and first card on initial render. */

  useEffect(function fetchDeckAndFirstCardWhenMounted() {
    async function fetchDeckAndFirstCard() {
      const deckId = await getNewDeck();
      const { imageUrl, cardValue, suit, remaining } = await getNextCard(deckId);
      const firstCard = {
        imageUrl,
        cardValue,
        suit
      }
      setDeck({
        ...deck,
        id: deckId,
        cardsDrawn: [firstCard],
        remaining: remaining,
        isLoading: false
      })
      console.log("CardList. updating deck=", deck);
    }
    fetchDeckAndFirstCard();
  }, [ ]);

  /** Handler for user requesting a new card */

  async function handleGetCard(evt) {
    evt.preventDefault();

    if (deck.remaining === 0) {
      setDeck({
        ...deck,
        showErrorMsg: true,
      })
      return;
    }

    const { imageUrl, cardValue, suit, remaining } = await getNextCard(deck.id);
    const nextCard = {
      imageUrl,
      cardValue,
      suit
    }
    setDeck({
            ...deck,
            cardsDrawn: [...deck.cardsDrawn, nextCard],
            remaining: remaining,
            isLoading: false
          })
          console.log("CardList. getting new card deck=", nextCard);
  }

  // useEffect(function fetchCardWhenCardDrawn() {
  //   async function fetchNextCard() {
  //     const card = await getNextCard(deck.deckId);
  //     setDeck({
  //       ...deck,
  //       cardsDrawn: [...deck.cardsDrawn, card],
  //       isLoading: false
  //     })
  //     console.log("CardList. updating deck=", deck);
  //   }
  //   fetchNextCard();
  // }, [deck.cardsDrawn]);


  if (deck.isLoading) return <i>Loading...</i>;

  return (
    <div className="CardList">
      {deck.showErrorMsg && <h1>Error: no cards remaining!</h1>}
      <form onSubmit={handleGetCard}>
        <button>Draw another card!</button>
      </form>
      {deck.cardsDrawn.map(card => <Card key={card.imageUrl} card={card} />)}
    </div>
  )
}

export default CardList;