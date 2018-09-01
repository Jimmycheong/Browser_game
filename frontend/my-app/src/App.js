import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import NotFound from './NotFound'
import TopLevel from './TopLevel'
import { HashRouter, Route, Link, Switch, IndexRoute } from 'react-router-dom'
// import { IndexRoute } from 'react-router'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  render(){
    return(
      <div>
        <br /><br />
        <Switch>
          <Route exact path="/" component={TopLevel} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('component')
)

export default App;
