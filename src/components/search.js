import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  render() {
    return (
      <div className="searchbar">
        <input
          className="btn waves-effect waves-light search"
          placeholder="search"
        />
      </div>
    );
  }
}

export default SearchBar;
