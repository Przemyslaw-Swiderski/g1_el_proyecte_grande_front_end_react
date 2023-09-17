import React, {Component} from 'react'
import Profile from './Profile'
class FetchApi extends Component {
    constructor(props) {
        super()
        
        this.state = {
            data : null
        }

    }

    loadProfiles()
    {
        fetch('http://localhost:39635/Profile')
        .then(response => response.json())
        .then(data => this.setState({data : data}))
    }

    componentDidMount()
    {
        this.loadProfiles()
    }
    render() {
        console.log(this.state)
        return (
            <div>
                {this.state.data != null ? <Profile user={this.state.data} /> : null}
                {/* <h1>Hi!</h1>
                <h1>Name: {this.state.data != null ? this.state.data.name : null}</h1>
                <h1>Age: {this.state.data != null ? this.state.data.age : null}</h1>
                <img src= {this.state.data != null ? this.state.data.image: null} /> */}
            </div>
        )
    }
}
export default FetchApi;
