// import React from "react";
// import Layout from "./Hoc/Layout";
// import { Switch, Route } from "react-router-dom";

// import PrivateRoute from "./Components/authRoutes/privateRoutes";
// import PublicRoute from "./Components/authRoutes/publicRoutes";

// import Home from "./Components/home";
// import SignIn from "./Components/signin";
// import TheTeam from "./Components/theTeam";
// import TheMatches from "./Components/theMatches";
// import NotFound from "./Components/ui/not_found";

// import Dashboard from "./Components/admin/Dashboard";
// import AdminMatches from "./Components/admin/matches";
// import AddEditMatch from "./Components/admin/matches/addEditMatch";
// import AdminPlayers from "./Components/admin/players";
// import AddEditPlayers from "./Components/admin/players/addEditPlayers";

// const Routes = (props) => {
//   return (
//     <Layout>
//       <Switch>
//         <PrivateRoute
//           {...props}
//           path="/admin_players/add_players"
//           exact
//           component={AddEditPlayers}
//         />
//         <PrivateRoute
//           {...props}
//           path="/admin_players/add_players/:id"
//           exact
//           component={AddEditPlayers}
//         />
//         <PrivateRoute
//           {...props}
//           path="/admin_players"
//           exact
//           component={AdminPlayers}
//         />
//         <PrivateRoute
//           {...props}
//           path="/admin_matches/edit_match"
//           exact
//           component={AddEditMatch}
//         />
//         <PrivateRoute
//           {...props}
//           path="/admin_matches/edit_match/:id"
//           exact
//           component={AddEditMatch}
//         />
//         <PrivateRoute
//           {...props}
//           path="/admin_matches"
//           exact
//           component={AdminMatches}
//         />
//         <PrivateRoute
//           {...props}
//           path="/dashboard"
//           exact
//           component={Dashboard}
//         />
//         <PublicRoute
//           {...props}
//           restricted={true}
//           path="/sign_in"
//           exact
//           component={SignIn}
//         />
//         <PublicRoute
//           {...props}
//           restricted={false}
//           path="/the_matches"
//           exact
//           component={TheMatches}
//         />
//         <PublicRoute
//           {...props}
//           restricted={false}
//           path="/the_team"
//           exact
//           component={TheTeam}
//         />
//         <PublicRoute
//           {...props}
//           restricted={false}
//           path="/"
//           exact
//           component={Home}
//         />
//         <PublicRoute {...props} restricted={false} component={NotFound} />
//       </Switch>
//     </Layout>
//   );
// };

// export default Routes;


import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './Hoc/Auth';

import Header from './Components/Header_footer/Header';
import Footer from './Components/Header_footer/Footer';
import Home from './Components/home';
import SignIn from './Components/signin';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';
import NotFound from "./Components/ui/not_found";

import Dashboard from './Components/admin/Dashboard';
import AdminPlayers from './Components/admin/players';
import AddEditPlayer from './Components/admin/players/addEditPlayers';
import AdminMatches from './Components/admin/matches/index';
import AddEditMatch from './Components/admin/matches/addEditMatch';
import AddEditTeams from './Components/admin/teams/addEditTeams';

const Routes = ({user}) => {

  return (
    <BrowserRouter>
      <Header user={user}/>
      <Switch>
        <Route path="/admin_matches/edit_match/:matchid" component={AuthGuard(AddEditMatch)}/>
        <Route path="/admin_matches/add_match" component={AuthGuard(AddEditMatch)}/>
        <Route path="/admin_matches" component={AuthGuard(AdminMatches)}/>

        <Route path="/admin_players/edit_player/:playerid" component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players/add_player" component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players" component={AuthGuard(AdminPlayers)}/>

        <Route path="/admin_players/add_team" component={AuthGuard(AddEditTeams)}/>

        <Route path="/dashboard" component={AuthGuard(Dashboard)}/>
        <Route path="/the_matches" component={TheMatches}/>
        <Route path="/the_team" component={TheTeam}/>
        <Route path="/sign_in" component={ 
          props => (<SignIn {...props} user={user}/>) 
        }/>
        <Route path="/" exact component={Home}/>
        <Route component={NotFound}/>
      </Switch>
      <ToastContainer />
      <Footer/>
    </BrowserRouter>
  );
  
}

export default Routes;