// Button to join and leave a game

function createJoinLeaveButton(component){
	if (!component.state.joined) {
		return <button className="btn green lighten-1" onClick={component.toggleJoin}>Join</button>
	} else {
		return <button className="btn red lighten-1" onClick={component.toggleJoin}>Leave</button>
	}
}

// Button to start a game when all players are ready
function createReadyButton(component){
		if (!component.state.ready) {
			return <button className="btn grey" onClick={component.toggleReady}>Click when Ready</button>
		} else {
			return <button className="btn" onClick={component.toggleReady}>Ready!</button>
		}
}

function createStartGameButton(readyCount, playerCount) {
			if (readyCount != playerCount) {
			return <button className="btn disabled">Start Game</button>
		} else {
			return <button className="btn"> Start Game</button>
		}
}