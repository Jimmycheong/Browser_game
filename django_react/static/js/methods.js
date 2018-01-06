function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/*
Counts the number of players that are ready
*/
function countReadyPlayers(playerArray){
	return playerArray.map(function(object, index){
			return (object.status == "ready") ? 1 : 0;
		}).reduce((a, b) => a + b, 0)
}

/*
Check if everyone in the lobby is ready
*/
function checkEveryoneIsReady(players) {
  return (countReadyPlayers(players) > 5) ? true : false
}

/*
Updates all players when its possible to start the game or not
*/
function updateGameReadyStatus(component, data_players){
  if (checkEveryoneIsReady(data_players) && data_players.length > 5) {
    component.setState({everyoneReady:true})
  } else {
    component.setState({everyoneReady:false})
  }
}