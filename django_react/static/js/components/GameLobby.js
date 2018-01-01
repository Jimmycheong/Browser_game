const GameLobbyMatcher = ({ match }) => ( 
 	<GameBox gameSession={match}/>
)

class GameLobby extends React.Component {
	constructor(){
		super()

		this.state = {
			ready: false
		}

		this.toggleReady = this.toggleReady.bind(this)
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

		return (
			<div>
				<p>This is the Game lobby where places can join</p>

				<div className="row">
					<div className="col s4">
						<table className="bordered">
		        <thead>
		          <tr>
		              <th>Name</th>
		          </tr>
		        </thead>

		        <tbody>
		          <tr>
		            <td>Alvin</td>
		          </tr>
		          <tr>
		            <td>Alan</td>
		          </tr>
		          <tr>
		            <td>Jonathan</td>
		          </tr>
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