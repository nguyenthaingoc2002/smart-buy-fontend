import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Link, useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({product}) {
  const navigate = useNavigate()

  return (
      <div onClick={() => {navigate(`/products/${product._id}`)}} className='hover-pointer'>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="194"
            image = {product.url_thumbnail}
            alt="Product Image"
          />
          <CardContent>
            <Typography variant="h3" sx={{fontSize: 16}} className='truncate-text'>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.price}
            </Typography>
          </CardContent>
        </Card>
      </div>
  );
}
