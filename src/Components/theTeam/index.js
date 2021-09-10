import React, { useState, useEffect } from "react";
import PlayerCard from "../ui/playerCard";
import { Slide } from "react-awesome-reveal";
import { CircularProgress } from "@material-ui/core";
import { firebasePlayers, firebase } from "../../firebase";
import { showErrorToast } from "../ui/misc";
import { Promise } from "core-js";

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);
  useEffect(() => {
    if (!players) {
        firebasePlayers
        .get()
        .then((snapshot) => {
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          let promises = [];

          players.forEach((player, index) => {
            promises.push(
              new Promise((resolve, reject) => {
                firebase
                  .storage()
                  .ref("players")
                  .child(player.image)
                  .getDownloadURL()
                  .then((url) => {
                    players[index].url = url;
                    resolve();
                  })
                  .catch((error) => {
                    reject();
                  });
              })
            );
          });

          Promise.all(promises).then(() => {
            setPlayers(players);
          });
          ////
        })
        .catch((error) => {
          showErrorToast("Sorry try again later");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  const showPlayerByCategory = (category) =>
    players
      ? players.map((player, i) => {
          return player.position === category ? (
            <Slide left key={player.id} triggerOnce>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Slide>
          ) : null;
        })
      : null;

 

  return (
    <div className="the_team_container">
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">{showPlayerByCategory("Keeper")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">{showPlayerByCategory("Defence")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">{showPlayerByCategory("Midfield")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">{showPlayerByCategory("Striker")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheTeam;
