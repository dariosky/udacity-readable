import React, {Component} from 'react'
import '../App.css'
import {AppBar, Toolbar, Typography} from 'material-ui'
import Home from './Home'
import Route from 'react-router-dom/es/Route'
import {PageNotFound} from './PageNotFound'
import Switch from 'react-router-dom/es/Switch'
import {Link} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Link to="/"
                  style={{'color': '#333', 'textDecoration': 'none'}}>
              <Typography type="title" color="inherit">
                Readable - React Udacity -
                Project 2 - by Dario Varotto
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route
            exact path="/"
            component={Home}
          />
          <Route
            exact path="/category/:category"
            component={Home}
          />
          <Route
            component={PageNotFound}
          />
        </Switch>
      </div>
    )
  }
}

export default App
