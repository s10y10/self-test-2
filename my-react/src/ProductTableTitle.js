import React from "react";

class ProductTableTitle extends React.Component {
  render() {
    return (
      <tr className="product-table-title">
        <th>{this.props.title}</th>
      </tr>
    );
  }
}
export default ProductTableTitle;
