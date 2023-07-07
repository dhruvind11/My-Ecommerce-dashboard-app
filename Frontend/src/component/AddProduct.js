import React, { useState } from 'react'
import axios from 'axios';

function AddProduct() {
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState("");
  const [company,setCompany]=useState("");
  const [error,setError]=useState(false);

  const AddProduct=()=>{

 
    if(!name || !price || !category || !company){
      setError(true);
      return false;
    }
    console.log(name,price,category,company);
    const userId=JSON.parse(localStorage.getItem('user'))._id;
     console.log(userId);
    let data=axios.post("http://localhost:5000/addProduct",{
      name,price,category,company,userId},
    );
    data.then((res)=>console.log(res));
    
    
    
  }
  return (
    <div className='product'>
      <h1>Add product</h1>
      <input type="text" placeholder='Enter product name' value={name} onChange={(e)=>setName(e.target.value)}/><br/>
     {error && !name && <span className='invalid-input'>please enter valid name</span>} <br />
    <input type="text" placeholder='Enter product price'value={price} onChange={(e)=>setPrice(e.target.value)}/><br />
    {error && !price && <span className='invalid-input'>please enter valid price</span>} <br />
      <input type="text" placeholder='enter product category' value={category} onChange={(e)=>setCategory(e.target.value)}/><br />
      {error && !category && <span className='invalid-input'>please enter valid category</span>} <br />
      <input type="text" placeholder='enter product company' value={company} onChange={(e)=>setCompany(e.target.value)}/><br />
      {error && !company && <span className='invalid-input'>please enter valid company</span>} <br /><br />
      <button onClick={AddProduct}>Add Product</button>
    </div>
  )
}

export default AddProduct
