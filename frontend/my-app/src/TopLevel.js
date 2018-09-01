import React, { Component } from 'react';

class TopLevel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            playerNameSet: false
        }
        this.confirmPlayerNameSet = this.confirmPlayerNameSet.bind(this)
    }

    confirmPlayerNameSet(){
        this.setState({playerNameSet:true})
    }

    render(){
    // if (getCookie("player_name") == undefined) {
    //     return <NewPlayer confirmPlayerNameSet={this.confirmPlayerNameSet}/>
    // } else {
    //     return <Home />
    // }
    return (<div>Hello</div>)
    }

}

export default TopLevel