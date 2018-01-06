const LobbyMatcher = ({ match }) => ( 
 	<div>
	 	<Lobby title={match.params.title}/>
 	</div>
)

class Lobby extends React.Component {

	constructor(){
		super()

		this.state = {
			ready: false,
			players: [],
			joined: false,
			player_session_id: null,
			player_name: null,
			game_session_id: null
		}
		this.toggleReady = this.toggleReady.bind(this)
		this.toggleJoin = this.toggleJoin.bind(this)
	}

	componentWillMount(){
		var this_ = this
		var player_session_id = getCookie("player_session_id")
		var request_url = 'http://127.0.0.1:8000/api/games/'+this.props.title+"?player_session_id="+player_session_id

    $.get(request_url, function (data, status) {
    	var json_data = JSON.parse(data)
    	console.log(json_data)
      this_.setState({
      	players: json_data['players'],
      	joined: json_data['joined'],
      	game_session_id: json_data['game_session_id'],
      })

      // If browser player has joined, their status from the json data. 
      if (json_data['joined']) {
      	console.log("layer 1")
      	if (json_data['playerStatus'] == 'ready'){
      		console.log("layer 2")
	      	this_.setState({ready:true})    		
      	}
      }

      updateGameReadyStatus(this_, json_data['players'])
    })

    this.setState({ 
    	player_session_id : player_session_id,
    	player_name:getCookie("player_name")
    })

	}

	componentDidMount(){
		var this_ = this
		var socket = new WebSocket("ws://" + window.location.host + "/player/")

		if (socket.readyState == WebSocket.OPEN) {
			console.log("Websocket connection for lobby has been created")
    }

		socket.onmessage = function message(event){
			var raw_data = JSON.parse(event.data)
			if (raw_data['game_session_id'] == this_.state.game_session_id){
				this_.setState({players:raw_data['players']})

				updateGameReadyStatus(this_, raw_data['players'])
			}			
		}

	}

	toggleJoin(){

		this.setState({joined:!this.state.joined})
    axios.post('http://127.0.0.1:8000/api/games/'+this.props.title, {
    	action: (!this.state.joined) ? "join" : "leave", 
    	player_session_id: this.state.player_session_id,
    	player_name: this.state.player_name
    })
    .then(function(response){
    	console.log(response)
    })

    // Change component's ready state to false if player has left the game.
    if (!this.state.joined) {
    	this.setState({ready:false})
    }
	}

	toggleReady(){		
		var put_url = 'http://127.0.0.1:8000/api/games/'+this.props.title+"?player_session_id="+getCookie("player_session_id")			
		this.setState({ready: !this.state.ready})
		if (this.state.joined) {
			axios.put(put_url, {
				isReady: this.state.ready
			})
			.then(function(response){
				console.log("Successful PUT request")
				console.log(response)
			})
		} 
	}

	render(){

		// Buttons
		var readyButton = null
		var startGameButton = null
		var joinLeaveButton = createJoinLeaveButton(this)

		// Display ready and startGame buttons only if a player has joined
		if (this.state.joined) {
			var readyButton = createReadyButton(this)
			var startGameButton = createStartGameButton(this)
		}

		return (
			<div className="container">
				<Link to="/">
					<button className="btn light-blue darken-1">&lt; Home</button>
				</Link>
				<div className="row">
					<div className="col s10">
						<h4>Welcome to session: {this.props.title}</h4>				
					</div>
					<div className="col s2">
						<h5>Players: {this.state.players.length}/6</h5>
					</div>
				</div>
				<p>This is the Game lobby where places can join</p>
				{joinLeaveButton}
				<div className="row">
					<div className="col s4">
						<PlayerTable players={this.state.players}/>
					</div>

				<div className="col s8">
					{readyButton}
					{startGameButton}
					<br/><br/>
					<div style={chatBox} className="card-panel">
						<p>Text box for client chat</p>
					</div>
					<br/><br/>
					<div className="row">
						<div className="col s8">					
							<input type="text" />
						</div>
						<div className="col s4">					
							<input type="submit" className="btn light-blue darken-1"/>
						</div>
					</div>
				</div>
			</div>

			</div>
		)
	}

}