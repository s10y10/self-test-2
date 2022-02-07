import React from "react";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChecked: false,
      searchText: "",
    };

    this.checkedChangeHandler = this.checkedChangeHandler.bind(this);
    this.searchTextChangeHandler = this.searchTextChangeHandler.bind(this);
  }

  checkedChangeHandler(e) {
    this.setState({
      stockChecked: e.target.checked,
    });
  }
  searchTextChangeHandler(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  render() {
    return (
      <div className="filterable-product-table">
        <SearchBar
          onCheckedChange={this.checkedChangeHandler}
          onSearchTextChange={this.searchTextChangeHandler}
          stockChecked={this.state.stockChecked}
          searchText={this.state.searchText}
        />
        <ProductTable
          product={this.props.products}
          stockChecked={this.state.stockChecked}
          searchText={this.state.searchText}
        />
      </div>
    );
  }
}
export default FilterableProductTable;
