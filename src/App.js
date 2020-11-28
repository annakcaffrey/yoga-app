import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("in constructor");
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
    this.state = {
      apiData: [],
      apiDataBeginner: [],
      apiDataIntermediate: [],
      isFetched: false,
      errorMsg: null
    };
  }
  // componentDidMount() is invoked immediately after a
  // component is mounted (inserted into the tree)

  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/jphoulihan/yoga-app/main/yoga.json"; //Needs to be updated
      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);
      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();

      // update the state variables correctly.
      this.setState({ apiDataBeginner: jsonResult.Beginner });
      this.setState({ apiDataIntermediate: jsonResult.Intermediate }); //This may need to change
      this.setState({ isFetched: true });
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  // Remember our three state variables.
  // PAY ATTENTION to the JSON returned. We need to be able to
  // access specific properties from the JSON returned.
  // Notice that this time we have three possible returns for our
  // render. This is conditional rendering based on some conditions
  render() {
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h1>An error has occured in the API call</h1>
        </div>
      ); // end of return.
    } else if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>We are loading your API request</h1>
        </div>
      ); // end of return
    } else {
      // we have no errors and we have data
      return (
        <div className="App">
        {/*dropdown button select starts*/}
        <div classNAme="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            SELECT BODY PART
          </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">HIPS</button>
            <button className="dropdown-item" type="button">ARMS</button>
            <button className="dropdown-item" type="button">BACK</button>
            </div>
        </div>
        {/*dropdown button select ends*/}

        {/*card container starts*/}
        <div className="row">
          <div className="col-sm-6">
          <div className="card">
                {this.state.apiDataBeginner.map((person, index) => (
                  <div className="card-body">
                  <img className="card-img-top" alt="yogapic" src={person.imgURL} key={index}/>

                    <h3 className="card-title">{person.body_part}</h3>
                    <h5 className="car-title">{person.Position}</h5>
                    <p className="card-text">{person.Description}</p>
                    
                    <audio controls autoplay>
                    <source src={person.Audio}/>
                    </audio>                                    
                  </div>
                ))}
          </div>
          </div>
        </div>
        {/*container ends*/}
      </div>
      ); // end of return
    } // end of the else statement.
  } // end of render()
} // end of App class
export default App;
