import { 
  BrowserRouter as Router, 
  Route, Redirect, Switch 
} from 'react-router-dom';

import Nav from './common/components/Navigation/Nav/Nav';
import Users from './user/pages/Users/Users';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import NewPlace from './places/pages/NewPlace/NewPlace';
import { Functional } from "./common/types";


const App: Functional = () => (
  <Router>
    <Nav />
    <main>
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
        <Redirect to='/' />
      </Switch>
    </main>
  </Router>
);


export default App;
