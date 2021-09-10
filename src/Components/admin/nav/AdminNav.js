// import React from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import ListItem from '@material-ui/core/ListItem';
// import { firebase } from '../../../firebase';

// const AdminNav = () => {

//     const links = [
//         {
//             title: 'Matches',
//             linkTo: '/admin_matches'
//         },
//         {
//             title: 'Add Match',
//             linkTo: '/admin_matches/edit_match'
//         },
//         {
//             title: 'Players',
//             linkTo: '/admin_players'
//         },
//         {
//             title: 'Add Players',
//             linkTo: '/admin_players/add_players'
//         }
//     ]

//     const style = {
//         color: '#fff',
//         fontWeight: '300',
//         borderBottom: '1px solid #353535'
//     }

//     const renderItems = () => (
//         links.map(link => (
//             <Link to={link.linkTo} key={link.title}>
//                 <ListItem button style={style}>
//                     {link.title}
//                 </ListItem>
//             </Link>
//         ))
//     )

//     const logoutHandler = () => {
//         firebase.auth().signOut().then(()=>{
//             console.log('Log out succesfull');
//         },(error)=>{
//             console.log('Error logging out', error);
//         })
//     }

//     return (
//         <div>
//             {renderItems()}
//             <ListItem button style={style} onClick={() => logoutHandler()}>
//                 Log out
//             </ListItem>
//         </div>
//     );
// }

// export default withRouter(AdminNav);

import React from "react";
import { Link, withRouter } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase";

const AdminNav = (props) => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches",
    },
    {
      title: "Add Match",
      linkTo: "/admin_matches/edit_match",
    },
    {
      title: "Players",
      linkTo: "/admin_players",
    },
    {
      title: "Add Player",
      linkTo: "/admin_players/add_player",
    },
  ];

  const style = {
    color: "#fff",
    fontWeight: "300",
    borderBottom: "1px solid #353535",
  };

  const renderItems = () =>
    links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Log out succesfull");
        },
        (error) => {
          console.log("Error logging out", error);
        }
      );
  };

  return (
    <div>
      {renderItems()}
      <ListItem
        button
        className="admin_nav_link"
        onClick={() => logoutHandler()}
        style={style}
      >
        Log out
      </ListItem>
    </div>
  );
};

export default withRouter(AdminNav);
