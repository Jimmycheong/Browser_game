const GameMatcher = ({ match }) => ( 
    <div>
        <Game session={match.params.title}/>
    </div>
)

class Game extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            players: []
        }
    }

    componentWillMount(){
        var this_ = this
        console.log("Sending off requests for players..")

        $.get('http://127.0.0.1:8000/api/games/' + this.props.session, function (data, status) {
            console.log("response: ", data)            
            var json_data = JSON.parse(data)
            this_.setState({players: json_data['players']})
        })
    }

    render(){

        var this_ = this
        var playerBoxes = null
        
        if (this.state.players.length > 0) {
            playerBoxes = this.state.players.map(function(object, index){
                return (
                    <div style={playerBox} key={index}>
                        {this_.state.players[index]["name"]}
                    </div>
                )
            })
        } else {
            playerBoxes =  <div style={playerBox}>Awaiting players to join..</div>           
        }


        return(

            <div className="gameContainer container">
                <Link to="/">
                    <button className="btn">&lt; Home</button>
                </Link>
                <h4>This is the gamebox</h4>
                <div className="row">
                    <div className="col s3">
                        <p>Player boxs: </p>
                        <PlayerTable players={this.state.players}/>
                    </div>
                    <div className="col s9">
                        <p>QuestBox:</p>
                        <QuestBox />
                    </div>
                    <div className="col s2">
                    </div>
                </div>


            </div>
        )
    }

}