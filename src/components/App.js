import React, {Component} from 'react'
import '../App.css'
import PostList from './PostList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Readable</h2>
        </div>
        <p className="container">
          <p>Welcome to readable!</p>
          <PostList/>
        </p>
      </div>
    )
  }
}

export default App
