import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import { popularProducts } from '../data';
import Product from './Product';
import axios from 'axios';
import { useState } from 'react';

const Container = styled.div`
 padding: 20px;
 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;
 `

const Products = ({cat,filters,sort}) => {
  const [products,setProducts] = useState([]);
  const [filteredProducts,setfilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async () =>{
      try {
        const res = await axios.get(
          cat 
          ? `http://localhost:5001/api/products?category=${cat}`
          : "http://localhost:5001/api/products"
          );
          setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts();
  },[cat]);

  useEffect(()=>{
    cat &&  setfilteredProducts(
      products.filter(item=> 
        Object.entries(filters).every(([key,value])=>
          item[key].includes(value)
          )
          )
    )
  },[products,cat,filters]);

  return (
    <Container>
        {products.map((item)=>(
            <Product item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Products