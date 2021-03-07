import { 
  Route, 
  Redirect, 
  Switch, 
  BrowserRouter as Router, 
} from 'react-router-dom';

import Nav from './common/components/Navigation/Nav/Nav';
import Users from './user/pages/Users/Users';
import Auth from './user/pages/Auth/Auth';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import NewPlace from './places/pages/NewPlace/NewPlace';
import { Functional } from "./common/types";
import classes from './App.module.css';


const App: Functional = () => (
  <Router>
    <Nav />
    <main className={classes.App} >
      <Switch>
        <Route path='/' exact> 
          <Users />
        </Route>
        <Route path='/:userId/places' exact >
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact> 
          <NewPlace />
        </Route>
        <Route path='/places/:placeId' >
          <UpdatePlace />
        </Route>
        <Route path='/auth' exact> 
          <Auth />
        </Route>
        <Redirect to='/' />
      </Switch>
    </main>
  </Router>
);


export default App;
