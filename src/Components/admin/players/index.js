import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";

import { Button, CircularProgress, Card } from "@material-ui/core";
import { showErrorToast } from "../../ui/misc";
import { firebasePlayers } from "../../../firebase";

const AdminPlayers = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      setLoading(true);
      firebasePlayers
        .limit(5)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setPlayers(players);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  const loadMorePlayers = () => {
    if (lastVisible) {
      setLoading(true);
      firebasePlayers
        .startAfter(lastVisible)
        .limit(5)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const newPlayers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLastVisible(lastVisible);
          setPlayers([...players, ...newPlayers]);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showErrorToast("nothing to load");
    }
  };

  return (
    <AdminLayout title="The players">
      <Card className="card-box mb-4">
        <div className="card-header d-flex align-items-center py-3">
          <div className="card-header--title font-size-lg font-weight-bold flex-grow-1"></div>
          <div className="card-header--actions">
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={"/admin_players/add_player"}
              className="action-btn"
            >
              Add player
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover text-nowrap mb-0">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Number</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {players
                ? players.map((player, i) => (
                    <tr key={player.id}>
                      <td>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                          {player.name}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                          {player.lastname}
                        </Link>
                      </td>
                      <td>{player.number}</td>
                      <td>{player.position}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="card-footer py-3 text-center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => loadMorePlayers()}
            disabled={loading}
          >
            View more
          </Button>
          <div>
            {loading ? (
              <CircularProgress
                thickness={7}
                style={{ color: "#98c5e9", marginTop: "10px" }}
              />
            ) : null}
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminPlayers;
