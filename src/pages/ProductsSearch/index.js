import React from "react";
import ProductCard from "../../components/ProductCard";
import { Box, Grid, Pagination } from "@mui/material";
import { searchProductAPI } from '../../api/product';
import { ListProductsContext } from '../../App';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const ProductsSearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let keyword = query.get('keyword');
  const { listProducts, setListProducts } = useContext(ListProductsContext);
  const [page, setPage] = React.useState(1);
  const [numberPage, setNumberPage] = React.useState(1);

  const fetchProductsSearch = async (page, keyword) =>{
    const params = {
      page: page,
      keyword: keyword
    }
    const response = await searchProductAPI(params);
    console.log(response);
    if (response.success) {
      setListProducts(response.productsSearch)
      setNumberPage(response.numberPage)
    }
  }

  const handleChangePagination = (event, value) => {
    setPage(value);
    // fetchProductsSearch(page, keyword);
  };

  React.useEffect(() => {
    fetchProductsSearch(page, keyword);
  }, [keyword, page])

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 2}}>
      <Typography variant="h1" sx={{fontSize: 30, margin: 5}} className='truncate-text'>
        {`Kết quả tìm kiếm cho từ khóa '${keyword}'`}
      </Typography>
      <Grid container spacing={2} sx={{padding: 2}}>
        {listProducts.length > 0 && listProducts?.map(product =>
        <Grid item xs={2}>
          <ProductCard product = {product}/>
        </Grid>)}
      </Grid>
      {listProducts.length === 0 &&
        <Typography variant="h1" sx={{fontSize: 30, margin: 5}} className='truncate-text'>
          {"Không tìm thấy kết quả nào"}
      </Typography>}
      <Pagination count={numberPage} page={page} onChange={handleChangePagination} />
    </Box>
  )
}

export default ProductsSearch;
