import React from "react";
import ProductTableTitle from "./ProductTableTitle";
import ProductTableItem from "./ProductTableItem";

class ProductTable extends React.Component {
  render() {
    const items = [];
    const { product, stockChecked, searchText } = this.props;
    const types = {};
    product.forEach((item) => {
      const { category } = item;
      if (!types[category]) {
        types[category] = [];
      }
      types[category].push(item);
    });

    for (let key in types) {
      const tempArr = [];
      const typeProducts = types[key];
      typeProducts.forEach((productItem) => {
        if (
          ((stockChecked && productItem.stocked === stockChecked) ||
            !stockChecked) &&
          (!searchText || productItem.name.includes(searchText))
        ) {
          tempArr.push(
            <ProductTableItem
              name={productItem.name}
              price={productItem.price}
              key={productItem.name}
            ></ProductTableItem>
          );
        }
      });
      if (tempArr.length) {
        items.push(<ProductTableTitle title={key} key={key} />, ...tempArr);
      }
    }

    return (
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    );
  }
}
export default ProductTable;
