class Lobby extends React.Component {

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
		this.props.joinGame()
	}

	render(){

		var existingGames = this.state.games.map(function(object, index){

			var reference = "http://127.0.0.1:8000/api/games/" + object.title

			return(
				<div key={index}>				
					<ul>
						<li><a href={reference}>{object.title}</a></li>					
					</ul>
				</div>
			)
		})

		return(
			<div>
				<h3>Join a Game .. </h3>
				<p>Enter the game code to join</p>
				<div className="row">
					<div className="col s4">
						<input className="input-field" type="text"/> 
						<input className="class=waves-effect waves-light btn" type="submit" onClick={this.joinGame}/>
					</div>	
					<div className="col s6">
						<h3>Existing games</h3>
						{existingGames}
					</div>
				</div>
			</div>
		)
	}

}