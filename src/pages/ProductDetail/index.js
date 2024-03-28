import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useParams } from 'react-router-dom';
import { Box, Collapse } from '@mui/material';
import { getProductAPI } from '../../api/product';
import Header from '../../components/Header';
import { useState } from 'react';
import parse from 'html-react-parser';

const ProductDetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const [productDetailData, setProductDetailData] = React.useState(null)

  const params = useParams();

  React.useEffect(() => {
    fetchProductDetail();
  }, [])

  const fetchProductDetail = async () =>{
    const response = await getProductAPI(params.id)
    setProductDetailData(response.product)
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, margin: 4}}>
      <Grid item xs={12} md={6} sx={{width: '90%'}}>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: '40%', height: '400px', display: { xs: 'none', sm: 'block' } }}
            image={productDetailData?.url_thumbnail}
            alt={'post.imageLabel'}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {productDetailData?.name}
            </Typography>
            {/* <Typography variant="subtitle1" color="text.secondary">
              {productDetailData?.price}
            </Typography> */}
            {/* {productDetailData?.price && (
              <Typography variant="body2" className="salePrice">
                {productDetailData?.price}
              </Typography>
            )}
            <Typography variant="body1" className="price">
            {productDetailData?.price}
            </Typography> */}
            <Typography variant="subtitle1" paragraph>
              {/* {productDetailData?.description} */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} sx={{width: '90%'}}>
      <Typography style={{ backgroundColor: "#dbdbd7", padding: 10, size: 20, fontWeight: "bold" }}>
        MÔ TẢ SẢN PHẨM
      </Typography>
        <Card>
          <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {parse(productDetailData?.description || "")}
            {/* <Typography variant="body1">
              {productDetailData?.description.substring(0, 100)}
              {productDetailData?.description.length > 100 && (
                <span>
                  ...{" "}
                  <a onClick={handleExpandClick}>
                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                  </a>
                </span>
              )}
            </Typography>
            <Collapse in={isExpanded}>
              <Typography variant="body1">{productDetailData?.description.substring(100)}</Typography>
            </Collapse> */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} sx={{width: '90%'}}>
        <Typography style={{ backgroundColor: "#dbdbd7", padding: 10, size: 20, fontWeight: "bold" }}>
          SẢN PHẨM TƯƠNG TỰ
        </Typography>
        <Card sx={{ display: 'flex',width: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ width: '100px', height: '100px', display: { xs: 'none', sm: 'block' } }}
                  image={'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'}
                  alt={'post.imageLabel'}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {productDetailData?.title}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {/* {productDetailData?.description} */}
                  </Typography>
                </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}

export default ProductDetail