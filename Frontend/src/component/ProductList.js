import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await axios.get("http://localhost:5000/product",{
      headers:{
        Authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    setProducts(result.data);
  };
  console.log(products);

  const deleteProduct = async (id) => {
    console.log(id);
    const result = await axios.delete(`http://localhost:5000/product/${id}`,{
      headers:{
        Authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    if (result) {
      getProducts();
    }
  };

  const searchHandle=async(e)=>{
     console.log(e.target.value);
     let result=await fetch(`http://localhost:5000/search/${e.target.value}`);
     result=await result.json();
     if(result){
        setProducts(result);
    }else{
        getProducts();
    }
       
  };
  
  return (
    <div className="product-list">
      <h1> product list </h1>
      <input type="text" placeholder="search product" className="search-product" onChange={searchHandle}/>
      <ul>
        <li> S.No </li> <li> Name </li> <li> Price </li> <li> Category </li>
        <li> operation </li>
      </ul>
      {
   products.length>0?products.map((item, index) => 
        <ul key={item._id}>
          <li> {index + 1} </li> 
          <li> {item.name} </li> 
          <li> {item.price} </li>
          <li> {item.category} </li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>delete product</button>
            <Link to={`/update/${item._id}`}> Update </Link>
          </li>
        </ul>
      ):<h1>no result found</h1>
     }
    </div>
  );
    }

export default ProductList;
