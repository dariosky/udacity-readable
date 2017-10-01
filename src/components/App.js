import React, {Component} from 'react'
import '../App.css'
import {AppBar, Toolbar, Typography} from 'material-ui'
import {Home} from './Home'
import Route from 'react-router-dom/es/Route'
import {PageNotFound} from './PageNotFound'
import Switch from 'react-router-dom/es/Switch'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography type="title" color="inherit">
              Readable
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route
            exact path="/"
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
