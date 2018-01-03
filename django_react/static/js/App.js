var HashRouter = ReactRouterDOM.HashRouter;
var Route = ReactRouterDOM.Route;
var Link = ReactRouterDOM.Link;
var Switch = ReactRouterDOM.Switch;
var IndexRoute = ReactRouter.IndexRoute;

class RouteMap extends React.Component {
  render(){
    return(
      <div>
       <NavigationBar />
        <br /><br />
        <Switch>
          <Route exact path="/" component={TopLevel} />
          <Route path="/lobby/:title" component={LobbyMatcher}/>
          <Route path="/game/:title" component={GameMatcher}/>
          <Route path="/settings" component={Settings}/>
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