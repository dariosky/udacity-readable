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
        <div className="container">
          <p>Welcome to readable!</p>
          <p>A React-redux place for post-comments-categories </p>
          <PostList/>
        </div>
      </div>
    )
  }
}

export default App
