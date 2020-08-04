import React from 'react';
import Layout from './HOC/Layout';
import './App.css';

import PublicRoute from './Components/authRoute/PublicRoute';
import Home from './Components/Home';
import Team from './Components/Team';
import Matches from './Components/Matches';
import Sign_in from './Components/Sign_in';
import NotFound from './Components/NotFound';

import PrivateRoute from './Components/authRoute/PrivateRoute';
import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/AddEditMatch';
import AdminPlayers from './Components/admin/players';
import AddEditPlayer from './Components/admin/players/AddEditPlayer';

import { Switch } from 'react-router-dom';

const Routes = (props) => {
  return (
    <Layout user={props.user}>
      <Switch>
        <PrivateRoute
          exact
          {...props}
          path="/dashboard"
          component={Dashboard}
        />
        <PrivateRoute
          exact
          {...props}
          path="/admin_players"
          component={AdminPlayers}
        />
        <PrivateRoute
          exact
          {...props}
          path="/admin_players/add_player"
          component={AddEditPlayer}
        />
        <PrivateRoute
          exact
          {...props}
          path="/admin_players/add_player/:id"
          component={AddEditPlayer}
        />

        <PrivateRoute
          exact
          {...props}
          path="/admin_matches/edit_match"
          component={AddEditMatch}
        />
        <PrivateRoute
          exact
          {...props}
          path="/admin_matches/edit_match/:id"
          component={AddEditMatch}
        />
        <PrivateRoute
          exact
          {...props}
          path="/admin_matches"
          component={AdminMatches}
        />

        <PublicRoute
          exact
          restricted={true}
          {...props}
          path="/sign_in"
          component={Sign_in}
        />
        <PublicRoute
          exact
          restricted={false}
          {...props}
          path="/the_team"
          component={Team}
        />
        <PublicRoute
          exact
          restricted={false}
          {...props}
          path="/the_matches"
          component={Matches}
        />
        <PublicRoute
          exact
          restricted={false}
          {...props}
          path="/"
          component={Home}
        />
        <PublicRoute restricted={false} {...props} component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
