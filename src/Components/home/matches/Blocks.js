import React, { useState, useEffect } from "react";
import { firebaseMatches } from "../../../firebase";
import MatchesBlock from "../../ui/matches_block";
import { Slide } from "react-awesome-reveal";

const Blocks = () => {
  const [matches, seMatches] = useState([]);

  useEffect(() => {
    if (!matches.length > 0) {
      firebaseMatches
        .get()
        .then((snapshot) => {
          const matches = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          seMatches(matches);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matches]);

  const showMatches = (matches) =>
    matches
      ? matches.map((match) => (
          <Slide bottom key={match.id} className="item" triggerOnce>
            <div>
              <div className="wrapper">
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  return <div className="home_matches">{showMatches(matches)}</div>;
};

export default Blocks;
