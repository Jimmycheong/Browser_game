class Component extends React.Component {

    constructor (){
        super()
        this.state = {
            joined_game : false, 
        }
        this.joinGame = this.joinGame.bind(this)
    }

    joinGame(){
        // console.log("Joined game")
        this.setState({joined_game:true})
    }

    render() {

        var screen = null 

        if (! this.state.joined_game) {
            screen = <Lobby joinGame={this.joinGame} />
        } else {
            screen = <GameLobby />
        }

        return (
            <div>{screen}</div>
            
            // Render GameBox
            // <div>            
            //     <div>
            //     <GameBox gameSession={"game-empty"}/>
            //     </div>
            // </div>

        )
    }
}

ReactDOM.render(
    <Component />,
    document.getElementById('component')
)