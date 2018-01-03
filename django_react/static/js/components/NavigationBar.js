class NavigationBar extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
		<div>
			<nav>
	      <div className="nav-wrapper light-blue darken-1">
	        <a href="#" className="brand-logo">A Browser Game</a>
	        <ul id="nav-mobile" className="right hide-on-med-and-down">
	          <Link to="/settings">
	          <li>Settings</li>
	          </Link>
	        </ul>
    		</div>
	    </nav>
		</div>
		)
	}

}