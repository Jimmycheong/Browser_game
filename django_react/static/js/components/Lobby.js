class Lobby extends React.Component {

	constructor(props){
		super(props)
		this.state = []

		this.joinGame = this.joinGame.bind(this)
	}

	joinGame(){
		console.log("Sending HTTP request to join game")
		console.log("Joined game successfully")
		this.props.joinGame()
	}

	render(){
		return(
			<div>
				<h3>Join a Game .. </h3>
				<p>Enter the game code to join</p>
				<div className="row">
					<div className="col s6">
					<input className="input-field" type="text"/> 
					<input className="class=waves-effect waves-light btn" type="submit" onClick={this.joinGame}/>
					</div>		
				</div>
			</div>
		)
	}

}