class NavigationBar extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
		<div>
			<nav>
	      <div className="nav-wrapper light-blue darken-1">
	      	<Link to="/">
	      		<p className="narbarTitle brand-logo">
	      			<i className="large material-icons home">home</i>
	      			A Browser Game</p>
	      	</Link>
	        <ul id="nav-mobile" className="right">
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