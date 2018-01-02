var HashRouter = ReactRouterDOM.HashRouter;
var Route = ReactRouterDOM.Route;
var Link = ReactRouterDOM.Link;
var Switch = ReactRouterDOM.Switch;
var IndexRoute = ReactRouter.IndexRoute;

class RouteMap extends React.Component {
  render(){
    return(
      <div>
        <Switch>
          <Route exact path="/" component={TopLevel} />
          <Route path="/lobby/:title" component={LobbyMatcher}/>
          <Route path="/game/:title" component={GameMatcher}/>
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