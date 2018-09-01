class QuestBox extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        var questBox = {
            border: "1px solid",
            height: "600px",
            width: "100%"
        }
        return(
            <div style={questBox}>
                <p>This is the quest box</p>
                <div className="row">
                    <div className="col s2">
                        <SingleQuest 
                            played={true}
                            questers={2}
                        />
                    </div>
                    <div className="col s2">
                        <SingleQuest 
                            played={true}
                            questers={3}
                        />
                    </div>
                    <div className="col s2">
                        <SingleQuest 
                            played={false}
                            questers={4}
                        />
                    </div>
                    <div className="col s2">
                        <SingleQuest 
                            played={false}
                            questers={3}
                        />
                    </div>
                    <div className="col s2">
                        <SingleQuest 
                            played={false}
                            questers={4}
                        />
                    </div>
                </div>
            </div>
        )
    }
}