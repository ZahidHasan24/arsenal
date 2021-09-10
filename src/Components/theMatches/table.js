import React, { useEffect, useState } from "react";
import { firebaseTeams } from "../../firebase";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const LeagueTable = () => {
  const [positions, setPosition] = useState(null);

  useEffect(() => {
    if (!positions) {
      firebaseTeams.get().then((snapshot) => {
        const positions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedPositions = sortFn(positions);
        setPosition(sortedPositions);
      });
    }
  }, [positions]);

  const sortFn = (teams) => {
    return teams.sort(
      (b, a) => a.point - b.point || a.gd - b.gd || a.gf - b.gf || a.ga - b.ga
    );
  };

  const showTeamPositions = () =>
    positions
      ? positions.map((pos, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{pos.name}</TableCell>
            <TableCell>{pos.win}</TableCell>
            <TableCell>{pos.draw}</TableCell>
            <TableCell>{pos.lose}</TableCell>
            <TableCell>{pos.point}</TableCell>
          </TableRow>
        ))
      : null;

  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showTeamPositions()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
