import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import "firebase/firestore";
import { database } from "../config/firebase";
import Products from "../components/Product/Product";
import AddProductForm from "../components/Form/AddForm";

function Dashboard() {
  const [productData, setProductData] = useState([]);
  const databaseRef = collection(database, "products");
  const handleFetchingData = () => {
    getDocs(databaseRef)
      .then((Response) => {
        const data = Response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        });
        setProductData(data as any);
      })
      .catch(() => alert("error while fetching"));
  };
  useEffect(() => {
    handleFetchingData();
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <AddProductForm handleFetchingData={handleFetchingData} />

      <Products productData={productData} />
    </>
  );
}

export default Dashboard;
