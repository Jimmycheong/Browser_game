class Home extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			games: []
		}
		this.joinGame = this.joinGame.bind(this)
	}

	componentWillMount(){
		var this_ = this 
        $.get('http://127.0.0.1:8000/api/games', function (data, status) {
            this_.setState({games: data})
        })
	}

	joinGame(){
		console.log("Sending HTTP request to join game")
		console.log("Joined game successfully")
	}

	render(){

		var existingGames = this.state.games.map(function(object, index){

			// var reference = "/lobby/" + object.title
			var reference = (object.status == "standby") ? "/lobby/"+object.title: "/game/"+object.title

			var gameStatus = (object.status == "standby") ? "Awaiting players" : "Game in progress";

			return(
				<tr key={index}>										
					<td><Link to={reference}>{object.title}</Link></td>					
					<td>{gameStatus}</td>					
				</tr>
			)
		})

		return(
			<div>
				<div className="row">
					<div className="col s4">
						<h3>Join a Game .. </h3>
						<p>Enter the game code to join</p>
						<input className="input-field" type="text"/> 
						<input className="class=waves-effect waves-light btn" type="submit" onClick={this.joinGame}/>
					</div>	
					<div className="col s6">
						<h3>Existing games</h3>
						<table className="striped">
					        <thead>
					          <tr>
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