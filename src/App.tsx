import { useState, useCallback} from 'react';
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
import AuthContext from './common/context/auth';
import { Functional, UseStateTuple } from "./common/types";
import classes from './App.module.css';


const App: Functional = () => {

  const [isLoggedIn, setIsLoggedIn]: UseStateTuple<boolean> = useState<boolean>(false);
  const [userId, setUserId]        : UseStateTuple<string>  = useState<string>('');

  const login = useCallback((userId: string) => {
    setIsLoggedIn(true);
	setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
	setUserId('');
  }, []);

  let routes: JSX.Element;

  if (isLoggedIn) {
    routes = (
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
			<Redirect to='/' />
		</Switch>
    );
  } else {
    routes = (
		<Switch>
			<Route path='/' exact> 
				<Users />
			</Route>
			<Route path='/:userId/places' exact >
				<UserPlaces />
			</Route>
			<Route path='/auth' exact> 
				<Auth />
			</Route>
			<Redirect to='/auth' />
		</Switch>
    );
  }

  return (
	<AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
		<Router>
		<Nav />
			<main className={classes.App} >
				{routes}
			</main>
		</Router>
	</AuthContext.Provider>
  )
};


export default App;
