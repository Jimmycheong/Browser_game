class Settings extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			player_name: null,
			player_session_id: null,
			editMode: false
		}
		this.toggleEditMode = this.toggleEditMode.bind(this)
		this.changeName = this.changeName.bind(this)
	}

	componentWillMount(){
		this.setState({
			player_name: getCookie("player_name"),
			player_session_id: getCookie("player_session_id")
		})
	}

	toggleEditMode(){
		this.setState({editMode: !this.state.editMode})
	}

	changeName(){

		if (this.textInput.value.length > 0) {
			var this_ = this
			var player_session_id = getCookie("player_session_id")
			var request_url = 'http://127.0.0.1:8000/api/playerInfo?player_session_id='+player_session_id
			
			axios.put(request_url, {
				new_name: this.textInput.value
			})
			.then(function(response){
		 		setCookie("player_name", this_.textInput.value, 1)
		 		this_.setState({player_name:this_.textInput.value})
		 		this_.toggleEditMode()
			})
		} else {
			this.toggleEditMode()
		}

	}

	render(){

		var namePanel = null
		if (!this.state.editMode) {
			namePanel = (
				<div className="row">
							<div className="col s10">
								<p>Name : <strong className="nameOnCard">{this.state.player_name}</strong></p>
							</div>
							<div className="col s2">
								<button className="btn light-blue darken-1" onClick={this.toggleEditMode}>Edit</button>
							</div>
						</div>
			)
		} else {
			namePanel = (
				<div>
					<p>Edit mode</p>
					<input className="input-field" type="text" ref={(input) => {this.textInput=input}}/> 
					<button className="btn light-blue darken-1" onClick={this.changeName}>Confirm Change</button>
					<button className="btn red darken-2" onClick={this.toggleEditMode}>Cancel</button>
				</div>
				)
		}

		return(
			<div className="container">
				<Link to="/">
					<button className="btn light-blue darken-1">&lt; Home</button>
				</Link>
				<h3>Player Info</h3>
				<p>Session ID : {this.state.player_session_id}</p>
				<div className="settingsInfo">	
					<div className="card-panel">
						{namePanel}
					</div>			
				</div>

			</div>
		)
	}
}