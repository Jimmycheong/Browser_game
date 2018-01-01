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

		// Operability of ready game button
		var readyButton = null
		if (!this.state.ready) {
			readyButton = <button className="btn" onClick={this.toggleReady}>Ready!</button>
		} else {
			readyButton = <button className="btn grey" onClick={this.toggleReady}>Click when Ready</button>
		}

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
				<h4>Welcome to session: {this.props.title}</h4>
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