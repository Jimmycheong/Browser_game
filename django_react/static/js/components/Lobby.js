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
			player_name: null
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
        })
    })

    this.setState({ player_session_id : player_session_id })
    this.setState({player_name:getCookie("player_name")})

	}

	componentDidMount(){
		var this_ = this
		var socket = new WebSocket("ws://" + window.location.host + "/player/")

		if (socket.readyState == WebSocket.OPEN) {
			console.log("Websocket connection for lobby has been created")
    }

		socket.onmessage = function message(event){
			var raw_data = JSON.parse(event.data)
			this_.setState({players:raw_data})
		}


	}


	toggleReady(){
		this.setState({ready: !this.state.ready})
	}

	toggleJoin(){
		this.setState({joined:!this.state.joined})

		if(!this.state.joined){
        axios.post('http://127.0.0.1:8000/api/games/'+this.props.title, {
        	action: "join",
        	player_session_id: this.state.player_session_id,
        	player_name: this.state.player_name
        })
        .then(function(response){
        	console.log(response)
        })
		} else {
			axios.post('http://127.0.0.1:8000/api/games/'+this.props.title, {
					action: "leave",
        	player_session_id: this.state.player_session_id,
        	player_name: this.state.player_name
        })
        .then(function(response){
        	console.log(response)
        })
		}

	}

	render(){

		var joinLeaveButton = createJoinLeaveButton(this)
		var readyButton = createReadyButton(this)

		// Operability of start game button
		var startGameButton = null
		var count = this.state.players.map(function(object, index){
			return (object.status == "ready") ? 1 : 0;
		}).reduce((a, b) => a + b, 0)

		if (count != this.state.players.length) {
			startGameButton = <button className="btn disabled">Start Game</button>
		} else {
			startGameButton = <button className="btn"> Start Game</button>
		}

		// Table of player and their respective statuses 
		var playerList = null
        if (this.state.players.length > 0) {
			var playerList = this.state.players.map(function (object, index){
			var playerRow = null

			if (object.status == "standby") {
				playerRow = (
					<tr style={standbyStatus} key={index}>
						<td>{object.name}</td>
						<td>Standby</td>
					</tr>
				)
			} else if (object.status == "ready") {
				playerRow = (
					<tr style={readyStatus} key={index}>
						<td>{object.name}</td>
						<td>Ready!</td>
					</tr>
				)
			} else {
				playerRow = (
					<tr key={index}>
						<td>{object.name}</td>
						<td>Unknown</td>
					</tr>
				)
			}

			return playerRow
			
			})

        } else {
            playerList = (
            	<tr>
            		<td>Awaiting players to join..</td>
            		<td></td>
            	</tr> 
            )          
        }

		return (
			<div>
				<Link to="/">
				<p>&lt; Back to Lobby</p>
				</Link>
				<h4>Welcome to session: {this.props.title}</h4>
				<p>This is the Game lobby where places can join</p>
				{joinLeaveButton}
				<div className="row">
					<div className="col s4">
						<table className="bordered">
					        <thead>
					          <tr>
					              <th>Name</th>
					              <th>Status</th>
					          </tr>
					        </thead>

					        <tbody>
					          {playerList}
					        </tbody>
					     </table>
					</div>

				<div className="col s6">
					{readyButton}
					{startGameButton}
					<br/><br/>
					<div style={chatBox}>
						<p>Text box for client chat</p>
					</div>
					<br/><br/>
					<div className="row">
						<div className="col s8">					
							<input type="text" />
						</div>
						<div className="col s4">					
							<input type="submit" className="btn"/>
						</div>
					</div>
				</div>
			</div>

			</div>
		)
	}

}