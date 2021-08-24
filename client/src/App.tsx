import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home'
import NewArticle from './pages/NewArticle'


function App() {
  const [newArticlePerm, setNewArticlePerm] = useState<boolean>(false);

  const routes = [
    {path:"/", name :"Home", Component: Home, show: true},
    {path:"/article/new", name : "New Article", Component: NewArticle, show: newArticlePerm}
  ]

  useEffect(() => {
    fetch(`http://localhost:8080/api/permissions/${1}`)
          .then(rsp => {
            if (rsp.status === 200) {
                return rsp.json()
            } else {
                throw Error('no permission')
            }
          })
          .then(json => {
            setNewArticlePerm(json.data.permissions.articles.write)
          })
          .catch(e => {
            setNewArticlePerm(false)
            console.log(e)
          })
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar bg = "light">
          <Container>
            <Nav className = "mx-auto">
            {
              routes.filter(route => route.show ).map(route => (
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
