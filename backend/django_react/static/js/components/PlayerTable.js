/* PlayerTable

Table for display player names and respective statuses in the lobby

*/

class PlayerTable extends React.Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	render(){

		var playerList = null
      
    if (this.props.players.length > 0) {
			var playerList = this.props.players.map(function (object, index) {
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
							<td>In Game</td>
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
		)
	}

}