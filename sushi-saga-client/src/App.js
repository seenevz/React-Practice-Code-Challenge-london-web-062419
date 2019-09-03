import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    sushis: [],
    sushiSliceIndex: 0,
    eatenSushis: [],
    budget: 100
  };

  getSushis = () => {
    return fetch(API).then(resp => resp.json());
  };

  componentDidMount() {
    this.getSushis().then(sushis => this.setState({ sushis }));
  }

  getFourSushis = () => {
    const slicedSushis = this.state.sushis.slice(
      this.state.sushiSliceIndex,
      this.state.sushiSliceIndex + 4
    );
    return slicedSushis;
  };

  eatSushi = sushi => {
    const remainingBudget = this.state.budget - sushi.price;
    if (remainingBudget >= 0) {
      this.setState({
        eatenSushis: [...this.state.eatenSushis, sushi],
        budget: remainingBudget
      });
    } else {
      alert("YOU'RE BROKE MATE! TIME TO FIND A FRIEND TO EAT MORE SUSHI");
    }
  };

  getFourMore = () => {
    this.setState({ sushiSliceIndex: this.state.sushiSliceIndex + 4 });
  };

  render() {
    return (
      <div className="app">
        <SushiContainer
          sliceOfSushis={this.getFourSushis()}
          handleEatSushi={this.eatSushi}
          eatenSushis={this.state.eatenSushis}
          getFourMore={this.getFourMore}
        />
        <Table
          eatenSushis={this.state.eatenSushis}
          budget={this.state.budget}
        />
      </div>
    );
  }
}

export default App;
