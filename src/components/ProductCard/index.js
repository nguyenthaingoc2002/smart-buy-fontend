import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Link, useNavigate } from "react-router-dom";
import logo_shopee from "../../utils/logo_shopee.png";
import logo_lazada from "../../utils/logo_lazada.png";
import logo_tiki from "../../utils/logo_tiki.png";
import logo_sendo from "../../utils/logo_sendo.png";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/products/${product._id}`);
      }}
      className="hover-pointer"
    >
      <Card sx={{ maxWidth: 340, height: 320 }}>
        <CardMedia
          component="img"
          height="160"
          image={product.url_thumbnail}
          alt="Product Image"
        />
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontSize: 16 }}
            className="truncate-text"
          >
            {product.name}
          </Typography>
          <div>
            {(() => {
              switch (product?.e_commerce) {
                case "Shopee":
                  return (
                    <img width={50} height={50} src={logo_shopee} alt="Logo" />
                  );
                case "Lazada":
                  return (
                    <img width={50} height={50} src={logo_lazada} alt="Logo" />
                  );
                case "Tiki":
                  return (
                    <img width={50} height={50} src={logo_tiki} alt="Logo" />
                  );
                case "Sendo":
                  return (
                    <img width={50} height={50} src={logo_sendo} alt="Logo" />
                  );
                default:
                  return;
              }
            })()}
          </div>
          <Typography
            style={{ marginTop: 5, fontSize: 15, fontWeight: "bold" }}
          >
            {product.price.toLocaleString("vi-VN", {
              currency: "VND",
              style: "currency",
            })}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
