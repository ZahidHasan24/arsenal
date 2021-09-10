import React from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import Aubameyang from "../../../Resources/images/players/Aubameyang.jpg";
import PlayerCard from "../../ui/playerCard";

const cards = [
  {
    bottom: 90,
    left: 300,
  },
  {
    bottom: 60,
    left: 200,
  },
  {
    bottom: 30,
    left: 100,
  },
  {
    bottom: 0,
    left: 0,
  },
];

const HomeCards = ({ show }) => {
  const showAnimateCards = () =>
    cards.map((card, i) => (
      <Animate
        key={i}
        show={show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 500, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => {
          return (
            <div
              style={{
                position: "absolute",
                left,
                bottom,
              }}
            >
              <PlayerCard
                number="14"
                name="Pierre-Emerick"
                lastname="Aubameyang"
                bck={Aubameyang}
              />
            </div>
          );
        }}
      </Animate>
    ));

  return <div>{showAnimateCards()}</div>;
};

export default HomeCards;
