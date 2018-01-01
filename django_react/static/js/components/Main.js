var HashRouter = ReactRouterDOM.HashRouter;
var Route = ReactRouterDOM.Route;
var Link = ReactRouterDOM.Link;
var Switch = ReactRouterDOM.Switch;
var IndexRoute = ReactRouter.IndexRoute;

class App extends React.Component {

    constructor (){
        super()
        this.state = {
            joined_game : false, 
        }
        this.joinGame = this.joinGame.bind(this)
    }

    joinGame(){
        // console.log("Joined game")
        this.setState({joined_game:true})
    }

    render() {
        return (
            <div>
                <Lobby joinGame={this.joinGame} />
            </div>
            
            // Render GameBox
            // <div>            
            //     <div>
            //     <GameBox gameSession={"game-empty"}/>
            //     </div>
            // </div>

        )
    }
}

class RouteMap extends React.Component {
  render(){
    return(
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/games/:slug" component={GameLobbyMatcher}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    )
  }
}


ReactDOM.render(
  <HashRouter>
    <RouteMap />
  </HashRouter>,
  document.getElementById('component')
)