import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { ListProductsContext } from '../../App';
import { useContext } from 'react';
import { searchProductAPI } from '../../api/product';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const { listProducts, setListProducts } = useContext(ListProductsContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const fetchSearchProduct = async (keyword) => {
    const response = await searchProductAPI(keyword);
    if (response.success) {
      setListProducts(response.products)
      console.log(listProducts);
    }
  }

  const handleSubmitSearch = (event, value) => {
    event.preventDefault();
    if (searchQuery.trim().length !== 0) {
      navigate(`/products/search?keyword=${searchQuery}`)
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="hover-pointer"
          //sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          onClick={()=> {navigate("/products");}}
        >
          SMART BUY
        </Typography>
        <form onSubmit={handleSubmitSearch}>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            variant="outlined"
            placeholder="Tìm kiếm sản phẩm"
            size="small"
            style={{ backgroundColor: "white" }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "white" }} />
          </IconButton>
        </form >
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header
