class NewPlayer extends React.Component {
	constructor(props){
		super(props)
		this.confirmName = this.confirmName.bind(this)
	}

	confirmName(){
 		setCookie("player_name", this.textInput.value, 1)
		this.props.confirmPlayerNameSet()
	}

	render(){
		return(
			<div>
				<div className="container">			
					<div>Welcome to Jimmy's board game</div>
					<br /><br/><br/>
					<h3>Enter a name to get started</h3>
					 
					<input className="input-field" type="text" ref={(input) => {this.textInput=input}}/> 
					<button className="class=waves-effect waves-light btn" onClick={this.confirmName}>Let's Play</button>
				</div>
			</div>

		)
	}

}