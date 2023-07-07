import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(params);
        getProduct();
    }, []);

    const getProduct = async() => {
        const result = await axios.get(`http://localhost:5000/product/${params.id}`);
        console.log(result.data);
        setName(result.data.name);
        setPrice(result.data.price);
        setCategory(result.data.category);
        setCompany(result.data.company);
    }
    const UpdateProduct = async() => {
        console.log(name, price, category, company)
        const result1 = await axios.put(`http://localhost:5000/product/${params.id}`, {
            name,
            price,
            category,
            company
        });
        console.log(result1);
        navigate('/product');
    }
    return ( <
        div className = 'product' >
        <
        h1 > Update product < /h1> <
        input type = "text"
        placeholder = 'Enter product name'
        value = { name }
        onChange = {
            (e) => setName(e.target.value) }
        /><br/ >

        <
        input type = "text"
        placeholder = 'Enter product price'
        value = { price }
        onChange = {
            (e) => setPrice(e.target.value) }
        /><br / >

        <
        input type = "text"
        placeholder = 'enter product category'
        value = { category }
        onChange = {
            (e) => setCategory(e.target.value) }
        /><br / >

        <
        input type = "text"
        placeholder = 'enter product company'
        value = { company }
        onChange = {
            (e) => setCompany(e.target.value) }
        /><br / >

        <
        button onClick = { UpdateProduct } > Update Product < /button> <
        /div>
    )
}

export default UpdateProduct