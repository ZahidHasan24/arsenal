import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";

import { Button, CircularProgress, Card } from "@material-ui/core";
import { showErrorToast } from "../../ui/misc";
import { firebaseTeams } from "../../../firebase";

const LIMIT = 20;

const AdminTeams = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    if (!teams) {
      setLoading(true);
      firebaseTeams
        .limit(LIMIT)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const teams = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setTeams(teams);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [teams]);

  const loadMoreTeams = () => {
    if (lastVisible) {
      setLoading(true);
      firebaseTeams
        .startAfter(lastVisible)
        .limit(LIMIT)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const newTeams = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLastVisible(lastVisible);
          setTeams([...teams, ...newTeams]);
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
    <AdminLayout title="All Teams">
      <Card className="card-box mb-4">
        <div className="card-header d-flex align-items-center py-3">
          <div className="card-header--title font-size-lg font-weight-bold flex-grow-1"></div>
          <div className="card-header--actions">
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={"/admin_teams/add_team"}
              className="action-btn"
            >
              Add Team
            </Button>
          </div>
        </div>
        <div className="table-responsive px-3">
          <table className="table table-hover text-nowrap mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Stadium</th>
              </tr>
            </thead>
            <tbody>
              {teams
                ? teams.map((team, i) => (
                    <tr key={team.id}>
                      <td>
                        <Link to={`/admin_teams/edit_team/${team.id}`}>
                          {team.name}
                        </Link>
                      </td>
                      <td>
                      <Link to={`/admin_teams/edit_team/${team.id}`}>
                          {team.stadium}
                        </Link>
                      </td>
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
            onClick={() => loadMoreTeams()}
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

export default AdminTeams;
