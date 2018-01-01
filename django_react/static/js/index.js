class Component extends React.Component {

    constructor (){
        super()
        this.state = {
            tv_shows : []
        }
    }

    componentWillMount(){
        var this_ = this

        $.get('http://127.0.0.1:8000/api/tv_show', function (data, status) {
            this_.setState({tv_shows: data})
        })
    }

    render() {

        var imgStyle = {
            height: "400px",
            width: "100%",
        }

        var cardStyle = {
            padding:"5px",
        }

        var data = this.state.tv_shows
        var dataList = data.map(function (object, index) {
            return ( 
            <div className="col s12 m6" key={index.toString()} style={cardStyle}>
              <div className="card">
                <div className="card-image">
                  <img src={object.logo} style={imgStyle}/>
                  <span className="card-title">{object.title}</span>
                </div>
                <div className="card-content">
                <p>Missing description</p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
            )
        })

        return (
        <div className="row">
            <div>{dataList}</div>
        </div>
        )

    }
}

ReactDOM.render(
    <Component />,
    document.getElementById('component')
)