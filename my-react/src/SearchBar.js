import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.checkedChangeHandler = this.checkedChangeHandler.bind(this);
    this.searchTextChangeHandler = this.searchTextChangeHandler.bind(this);
  }
  checkedChangeHandler(e) {
    this.props.onCheckedChange(e);
  }
  searchTextChangeHandler(e) {
    this.props.onSearchTextChange(e);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          placeholder="输入要查询的文字"
          onChange={this.searchTextChangeHandler}
          value={this.props.searchText}
        />
        <p>
          <input
            type="checkbox"
            onChange={this.checkedChangeHandler}
            checked={this.props.stockChecked}
          />
          <span>Only show products in stock</span>
        </p>
      </div>
    );
  }
}
export default SearchBar;
