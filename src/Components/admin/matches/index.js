import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";
import { Button, CircularProgress, Card } from "@material-ui/core";
import { firebaseMatches } from "../../../firebase";
import { showErrorToast } from "../../ui/misc";

const AdminMatches = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    if (!matches) {
      setLoading(true);
      firebaseMatches
        .limit(5)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const matches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setMatches(matches);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [matches]);

  const loadMoreMatches = () => {
    if (lastVisible) {
      setLoading(true);
      firebaseMatches
        .startAfter(lastVisible)
        .limit(5)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const newMatches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLastVisible(lastVisible);
          setMatches([...matches, ...newMatches]);
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
    <AdminLayout title="The matches">
      <Card className="card-box mb-4">
        <div className="card-header d-flex align-items-center py-3">
          <div className="card-header--title font-size-lg font-weight-bold flex-grow-1"></div>
          <div className="card-header--actions">
            <Button
              variant="contained"
              component={Link}
              to={"/admin_matches/add_match"}
              color="primary"
              className="action-btn"
            >
              Add match
            </Button>
          </div>
        </div>
        <div className="table-responsive px-3">
          <table className="table table-hover text-nowrap mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Match</th>
                <th>Result</th>
                <th>Final</th>
              </tr>
            </thead>
            <tbody>
              {matches
                ? matches.map((match, i) => (
                    <tr key={i}>
                      <td>{match.date}</td>
                      <td>
                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                          {match.away} <strong>-</strong> {match.local}
                        </Link>
                      </td>
                      <td>
                        {match.resultAway} <strong>-</strong>{" "}
                        {match.resultLocal}
                      </td>
                      <td>
                        {match.final === "yes" ? (
                          <span className="matches_tag_red">Final</span>
                        ) : (
                          <span className="matches_tag_green">
                            Not played yet
                          </span>
                        )}
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
            onClick={() => loadMoreMatches()}
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

export default AdminMatches;
