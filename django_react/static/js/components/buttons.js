// Button to join and leave a game

function createJoinLeaveButton(component){
	if (component.state.players.length > 5 && !component.state.joined) {
		return <button className="btn gray lighten-1" disabled>Game Full</button>
	} else if (!component.state.joined) {
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

function createStartGameButton(component) {
			if (!component.state.everyoneReady) {
			return <button className="btn disabled">Start Game</button>
		} else {
			return <button className="btn"> Start Game</button>
		}
}

function createNewGameButton(component){
	return <button className="btn orange lighten-2" >New Game +</button>
}