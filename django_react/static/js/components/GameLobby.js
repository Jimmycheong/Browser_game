const GameLobbyMatcher = ({ match }) => ( 
 	// <GameBox gameSession={match}/>
 	<div>
	 	<GameLobby title={match.params.title}/>
 	</div>
)

class GameLobby extends React.Component {
	constructor(){
		super()

		this.state = {
			ready: false,
			players: []
		}
		this.toggleReady = this.toggleReady.bind(this)
	}

	componentWillMount(){
		var this_ = this
        $.get('http://127.0.0.1:8000/api/games/'+this.props.title, function (data, status) {
            this_.setState({players: data})
        })
	}

	toggleReady(){
		this.setState({ready: !this.state.ready})
	}

	render(){

		var readyButton = null
		if (!this.state.ready) {
			readyButton = <button className="btn" onClick={this.toggleReady}>Ready!</button>
		} else {
			readyButton = <button className="btn grey" onClick={this.toggleReady}>Not ready yet</button>
		}

		var playerList = null

        if (this.state.players.length > 0) {
			var playerList = this.state.players.map(function (object, index){
			var playerRow = null

			if (object.status == "in_lobby") {
				playerRow = (
					<tr style={standbyStatus} key={index}>
						<td>{object.name}</td>
						<td>Standby</td>
					</tr>
				)
			} else {
				playerRow = (
					<tr style={readyStatus} key={index}>
						<td>{object.name}</td>
						<td>Ready!</td>
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
				<h3>Welcome to session: {this.props.title}</h3>
				<p>This is the Game lobby where places can join</p>
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

				<div className="col s8">
					{readyButton}
				</div>
			</div>

			</div>
		)
	}

}