import React from "react";
import { CircularProgress } from "@chakra-ui/react";
import CardTodo from "./ProductCard";
interface Props {
  productData: any;
}

function Products(props: Props) {
  const { productData } = props;
  console.log(productData, "from products");
  return (
    <div>
      <div className="grid grid-cols-6 gap-2  ">
        {productData.map((product: any, index: any) => (
          <>
            {!product ? (
              <CircularProgress value={59} size="100px" thickness="4px" />
            ) : (
              <CardTodo key={index} {...product} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
export default Products;
