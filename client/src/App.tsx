import React from 'react';
import './App.css';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './pages/Home'



function App() {
  const routes = [
    {path:"/", name :"Home", Component: Home}
  ]
  return (
    <div className="App">
      <Router>
        <Navbar bg = "light">
          <Nav className = "mx-auto">
          {
            routes.map(route => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                exact
              >
                {route.name}
              </Nav.Link>
            ))
          }
          </Nav>
        </Navbar>

        <div>
        {
          routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
            {
              <Component/>
            }
            </Route>
          ))
        }
        </div>

      </Router>
    </div>
  );
}

export default App;
