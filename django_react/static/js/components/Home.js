class Home extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			games: [],
			player_name: null
		}
		this.joinGame = this.joinGame.bind(this)
	}

	componentWillMount() {

		var this_ = this 
   	var player_name = getCookie("player_name")

    $.get('http://127.0.0.1:8000/api/games', function (data, status) {
        this_.setState({games: data})
    })

   	if (getCookie("player_name") == undefined) {
   		setCookie("player_name", "spaceboys", 1)
   	}
   	
		this.setState({player_name: getCookie("player_name")})	
	}

	componentDidMount() {
		var this_ = this

		var socket = new WebSocket("ws://" + window.location.host + "/games/")

		socket.onopen = function open(){
			console.log("Websocket connection for games has been created")
		}

		socket.onmessage = function message(event){
			var raw_data = JSON.parse(event.data)
			this_.setState({games:raw_data})
		}

		if (socket.readyState == WebSocket.OPEN) {
        socket.onopen();
        console.log("StreamInfo websocket connection created")
    }

	}

	startNewGame() {
		console.log("Starting new game, switch components")
	}

	joinGame() {
		console.log("Sending HTTP request to join game")
		console.log("Joined game successfully")
	}

	render() {

		var newGameButton = createNewGameButton()

		var existingGames = this.state.games.map(function(object, index){
			// var reference = "/lobby/" + object.title
			var reference = (object.status == "standby") ? "/lobby/"+object.title: "/game/"+object.title

			var gameStatus = (object.status == "standby") ? "Awaiting players" : "Game in progress";

			return(
				<tr key={index}>
					<td>{object.id}</td>										
					<td><Link to={reference}>{object.title}</Link></td>					
					<td>{gameStatus}</td>					
				</tr>
			)
		})

		return(
			<div className="container">
				<div className="row">
					<div className="col s8">
						<p className="homePlayerName">Welcome:{this.state.player_name}</p>
					</div>
					<div className="col s4">
						<Link to="/new_game">
							{newGameButton}
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col s4">
						<h3>Join a Game</h3>
						<p>Enter the game code to join</p>
						<input className="input-field" type="text"/> 
						<input className="class=waves-effect waves-light btn light-blue darken-1" type="submit" onClick={this.joinGame}/>
					</div>	
					<div className="col s6">
						<h3>Existing games</h3>
						<table className="striped">
					        <thead>
					          <tr>
					          		<th>ID</th>
					              <th>Name</th>
					              <th>Status</th>
					          </tr>
					        </thead>
					        <tbody>
							{existingGames}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}

}