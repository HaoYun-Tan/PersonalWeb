import React from 'react';
import './App.css';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home'
import NewArticle from './pages/NewArticle'


function App() {
  const routes = [
    {path:"/", name :"Home", Component: Home},
    {path:"/article/new", name : "New Article", Component: NewArticle}
  ]
  return (
    <div className="App">
      <Router>
        <Navbar bg = "light">
          <Container>
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
          </Container>
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
