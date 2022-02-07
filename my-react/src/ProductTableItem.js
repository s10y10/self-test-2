import React from "react";

class ProductTableItem extends React.Component {
  render() {
    return (
      <tr className="product-table-item">
        <td>{this.props.name}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
}
export default ProductTableItem;
