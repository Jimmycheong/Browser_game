class NewGame extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			error: null
		}

		this.createNewGame = this.createNewGame.bind(this)
	}

	createNewGame(){
		var this_ = this
		if (this.textInput.value && this.textInput.value.length > 0) {
	
			axios.post("http://"+window.location.host+"/api/games/new", {
				"gameName": this.textInput.value
			})			
			.then(function(response){
				this_.props.history.push("/")
			})
			.catch(function(error){
				this_.setState({error: error.response.data})
			})
		} else {
			this.setState({error: "Please enter a name for this game"})
		}
	}

	render(){

		var inputErrorMsg = <label className="inputError" htmlFor="gameNameInput">{this.state.error}</label>

		return (
			<div className="container">
				<br />
				<Link to="/">
					<button className="btn light-blue darken-1">&lt; Home</button>
				</Link>
				<br/>
				<h4>Create a New game</h4>
				<p>Players: 6</p>
				{inputErrorMsg}
				<input id="gameNameInput" placeholder="Enter a new for the game"className="input-field" type="text" ref={(input) => {this.textInput=input}}/> 
				<button className="class=waves-effect waves-light btn green darken-1" onClick={this.createNewGame}>Create</button>

			</div>
		)
	}

}