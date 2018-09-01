class SingleQuest extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        var singleQuest = {
            textAlign: "center",
            border: "1px solid grey",
            height: "150px",
            width: "150px"
        }

        var questColorSchema = null

        if (this.props.played){
            questColorSchema = {
                backgroundColor: "blue",
                color: "white",
                height: "90%"
            }
        } else {
            questColorSchema = {
                backgroundColor: "red",
                color: "white",
                height: "90%"
            }
        }
 
        return (
            <div style={singleQuest}>
                <div style={questColorSchema}>
                    <p>Individual Box</p>
                    <p>{this.props.questers} players</p>
                </div>
            </div>
        )
    }
}