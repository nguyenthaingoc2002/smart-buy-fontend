import React from "react";
import ProductCard from "../../components/ProductCard";
import { Box, Grid, Pagination } from "@mui/material";
import { getAllProductAPI } from '../../api/product';
import { ListProductsContext } from '../../App';
import { useContext } from 'react';
const Products = () => {

  const { listProducts, setListProducts } = useContext(ListProductsContext);
  const [page, setPage] = React.useState(1);
  const [numberPage, setNumberPage] = React.useState(1);
  const handleChangePagination = (event, value) => {
    setPage(value);
    fetchProducts(page);
  };


  React.useEffect(() => {
    fetchProducts(page);
  }, [])

  const fetchProducts = async (page) =>{
    const params = {
      page: page
    }
    const response = await getAllProductAPI(params);
    console.log(response);
    if (response.success) {
      console.log(response.allProducts);
      setListProducts(response.allProducts)
      setNumberPage(response.numberPage)
    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 2}}>
      <Grid container spacing={2} sx={{padding: 2}}>
        {listProducts?.map(product =>  <Grid item xs={2}>
          <ProductCard product = {product}/>
        </Grid>)}
      </Grid>
      <Pagination count={numberPage} page={page} onChange={handleChangePagination} />
    </Box>
  )
};

export default Products;
