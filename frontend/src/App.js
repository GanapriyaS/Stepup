import logo from './logo.svg';
import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    componentDidMount() {
      var url="http://localhost:4000/data";
      if(process.env.NODE_ENV === "production"){
        url="https://stepup--demo.herokuapp.com/data"
      }
      fetch(url)
            .then((res) => res.json())
            .then((json) => {
              console.log(json)
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;
   
        return (
          <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        <div className = "App">
            <h1>Hi Everyone</h1>
            <h1> Fetch data from an api in react app and display </h1>  {
                items.map((item) => ( 
                <ol key = { item.id } >
                    Id: { item.id }, 
                    Name: { item.name }
                    </ol>
                ))
            }
        </div>
        </div>
    );
}
}

export default App;
