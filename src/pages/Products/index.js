import React from "react";
import ProductCard from "../../components/ProductCard";
import { Box, Grid, Pagination } from "@mui/material";
import { getAllProductAPI } from "../../api/product";
import { ListProductsContext } from "../../App";
import { useContext } from "react";
import Typography from '@mui/material/Typography';
const Products = () => {
  const { listProducts, setListProducts } = useContext(ListProductsContext);
  const [page, setPage] = React.useState(1);
  const [numberPage, setNumberPage] = React.useState(1);
  const handleChangePagination = (event, value) => {
    setPage(value);
    fetchProducts(page);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    fetchProducts(page);
  }, [listProducts]);

  const fetchProducts = async (page) => {
    const params = {
      page: page,
    };
    const response = await getAllProductAPI(params);
    console.log(response);
    if (response.success) {
      setListProducts(response.allProducts);
      setNumberPage(response.numberPage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: 30, margin: 5 }}
        className="truncate-text"
      >
        {"Danh sách sản phẩm"}
      </Typography>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {listProducts?.map((product) => (
          <Grid item xs={2}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={numberPage}
        page={page}
        onChange={handleChangePagination}
      />
    </Box>
  );
};

export default Products;
