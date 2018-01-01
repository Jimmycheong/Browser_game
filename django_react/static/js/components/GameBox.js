class GameBox extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            players: []
        }
    }

    componentWillMount(){
        var this_ = this
        console.log("Sending off requests for players..")

        $.get('http://127.0.0.1:8000/api/games/' + this.props.gameSession, function (data, status) {
            this_.setState({players: data})
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

            <div>
                <h4>This is the gamebox</h4>

                <div className="row">
                    <div className="col s5">
                        <p>Player boxs: </p>
                        {playerBoxes}
                    </div>
                    <div className="col s7">
                        <QuestBox />
                    </div>
                </div>


            </div>
        )
    }

}