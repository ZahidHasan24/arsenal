import React, { useEffect, useReducer, useState } from "react";
import { showErrorToast } from "../ui/misc";

import { CircularProgress } from "@material-ui/core";
import { firebaseMatches } from "../../firebase";

import LeagueTable from "./table";
import MatchesList from "./matchesList";

const TheMatches = () => {
  const [matches, setMatches] = useState(null);
  const [state, dispatch] = useReducer(
    (prevState, nextState) => {
      return { ...prevState, ...nextState };
    },
    {
      filterMatches: null,
      playedFilter: "All",
      resultFilter: "All",
    }
  );

  useEffect(() => {
    if (!matches) {
      firebaseMatches
        .get()
        .then((snapshot) => {
          const matches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(matches);
          dispatch({ ...state, filterMatches: matches });
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [matches, state]);

  const showPlayed = (played) => {
    // all, yes, no
    const list = matches.filter((match) => {
      return match.final === played;
    });

    dispatch({
      ...state,
      filterMatches: played === "All" ? matches : list,
      playedFilter: played,
      resultFilter: "All",
    });
  };

  const showResult = (result) => {
    const list = matches.filter((match) => {
      return match.result === result;
    });

    dispatch({
      ...state,
      filterMatches: result === "All" ? matches : list,
      playedFilter: "All",
      resultFilter: result,
    });
  };

  console.log(state.filterMatches);

  return (
    <>
      <div className="the_matches_container">
        {matches ? (
          <div className="the_matches_wrapper">
            <div className="left">
              <div className="match_filters">
                <div className="match_filters_box">
                  <div className="tag">Show Matches</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.playedFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "yes" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("yes")}
                    >
                      Played
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "no" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("no")}
                    >
                      Not Played
                    </div>
                  </div>
                </div>
                <div className="match_filters_box">
                  <div className="tag">Result games</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.resultFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => showResult("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "W" ? "active" : ""
                      }`}
                      onClick={() => showResult("W")}
                    >
                      W
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "L" ? "active" : ""
                      }`}
                      onClick={() => showResult("L")}
                    >
                      L
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "D" ? "active" : ""
                      }`}
                      onClick={() => showResult("D")}
                    >
                      D
                    </div>
                  </div>
                </div>
              </div>
              <MatchesList matches={state.filterMatches} />
            </div>
            <div className="right">
              <LeagueTable />
            </div>
          </div>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default TheMatches;
