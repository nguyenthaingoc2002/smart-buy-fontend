import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
import { Box, Collapse } from "@mui/material";
import { getProductAPI, getSimilarProductAPI } from "../../api/product";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { useState } from "react";
import parse from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import logo_shopee from "../../utils/logo_shopee.png";
import logo_lazada from "../../utils/logo_lazada.png";
import logo_tiki from "../../utils/logo_tiki.png";
import logo_sendo from "../../utils/logo_sendo.png";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [productDetailData, setProductDetailData] = React.useState(null);
  const [listSimilarProducts, setListSimilarProducts] = React.useState(null);
  const [listSimilarProductsRender, setListSimilarProductsRender] =
    React.useState(null);
  const params = useParams();

  const fetchProductDetail = async () => {
    const responseProduct = await getProductAPI(params.id);
    setProductDetailData(responseProduct.product);

    const responseSimilarProduct = await getSimilarProductAPI(
      responseProduct.product?.id
    );
    setListSimilarProducts(responseSimilarProduct?.listProducts);
    setListSimilarProductsRender(responseSimilarProduct?.listProducts);
  };

  const setLowToHigh = () => {
    const sortedListProductsRender = listSimilarProductsRender.sort(
      (a, b) => a.price - b.price
    );
    const sortedListProducts = listSimilarProducts.sort(
      (a, b) => a.price - b.price
    );
    setListSimilarProducts([...sortedListProducts]);
    setListSimilarProductsRender([...sortedListProductsRender]);
  };
  const setHighToLow = () => {
    const sortedListProductsRender = listSimilarProductsRender.sort(
      (a, b) => b.price - a.price
    );
    const sortedListProducts = listSimilarProducts.sort(
      (a, b) => b.price - a.price
    );
    setListSimilarProducts([...sortedListProducts]);
    setListSimilarProductsRender([...sortedListProductsRender]);
  };

  const filter_e_commerce = (name) => {
    const filter_e_commerce = listSimilarProducts.filter(
      (product) => product.e_commerce === name
    );
    setListSimilarProductsRender([...filter_e_commerce]);
  };

  const sorting = (value) => {
    value === "descending" ? setLowToHigh() : setHighToLow();
  };

  React.useEffect(() => {
    fetchProductDetail();
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        margin: 10,
      }}
    >
      <Grid item xs={12} md={6} sx={{ width: "90%" }}>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              width: "40%",
              height: "450px",
              // display: { xs: "none", sm: "block" },
            }}
            image={productDetailData?.url_thumbnail}
            alt={"post.imageLabel"}
          />
          <CardContent sx={{ flex: 1, flexDirection: "column" }}>
            <Typography
              style={{
                marginBottom: 20,
              }}
              component="h2"
              variant="h5"
            >
              {productDetailData?.name}
            </Typography>
            <Typography
              style={{
                marginTop: 20,
                marginBottom: 20,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              {productDetailData?.price.toLocaleString("vi-VN", {
                currency: "VND",
                style: "currency",
              })}
            </Typography>
            <div>
              {(() => {
                switch (productDetailData?.e_commerce) {
                  case "Shopee":
                    return (
                      <img
                        width={100}
                        height={100}
                        src={logo_shopee}
                        alt="Logo"
                      />
                    );
                  case "Lazada":
                    return (
                      <img
                        width={100}
                        height={100}
                        src={logo_lazada}
                        alt="Logo"
                      />
                    );
                  case "Tiki":
                    return (
                      <img
                        width={100}
                        height={100}
                        src={logo_tiki}
                        alt="Logo"
                      />
                    );
                  case "Sendo":
                    return (
                      <img
                        width={100}
                        height={100}
                        src={logo_sendo}
                        alt="Logo"
                      />
                    );
                  default:
                    return;
                }
              })()}
            </div>

            <Button
              target="_blank"
              variant="outlined"
              href={productDetailData?.url_product}
            >
              Đến nơi bán
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} sx={{ width: "90%" }}>
        <Typography
          style={{
            backgroundColor: "#F0EBE3",
            padding: 10,
            size: 20,
            fontWeight: "bold",
          }}
        >
          MÔ TẢ SẢN PHẨM
        </Typography>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {parse(productDetailData?.description || "")}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} sx={{ width: "90%" }}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#F0EBE3",
          }}
        >
          <Typography
            style={{
              padding: 10,
              size: 20,
              fontWeight: "bold",
            }}
          >
            SẢN PHẨM TƯƠNG TỰ
          </Typography>
          <div>
            <select
              style={{ height: "100%" }}
              defaultValue={"DEFAULT"}
              onChange={(e) => filter_e_commerce(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Nơi bán
              </option>
              <option value="Shopee">SHOPPE</option>
              <option value="Tiki">TIKI</option>
              <option value="Lazada">LAZADA</option>
              <option value="Sendo">SENDO</option>
            </select>
            <select
              style={{ height: "100%", backgroundColor: "white" }}
              defaultValue={"DEFAULT"}
              onChange={(e) => sorting(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Giá cả
              </option>
              <option value="descending">Giá cả (từ thấp đến cao)</option>
              <option value="ascending">Giá cả (từ cao đến thấp)</option>
            </select>
          </div>
        </Grid>

        {listSimilarProductsRender?.map((product) => (
          <div
            onClick={() => {
              navigate(`/products/${product._id}`);
            }}
            className="hover-pointer"
          >
            <Card sx={{ display: "flex", width: "100%" }}>
              <CardMedia
                component="img"
                sx={{
                  width: "100px",
                  height: "100px",
                  display: { xs: "none", sm: "block" },
                }}
                image={product.url_thumbnail}
                alt={"post.imageLabel"}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {product?.name}
                </Typography>

                <div>
                  {(() => {
                    switch (product?.e_commerce) {
                      case "Shopee":
                        return (
                          <img
                            width={50}
                            height={50}
                            src={logo_shopee}
                            alt="Logo"
                          />
                        );
                      case "Lazada":
                        return (
                          <img
                            width={50}
                            height={50}
                            src={logo_lazada}
                            alt="Logo"
                          />
                        );
                      case "Tiki":
                        return (
                          <img
                            width={50}
                            height={50}
                            src={logo_tiki}
                            alt="Logo"
                          />
                        );
                      case "Sendo":
                        return (
                          <img
                            width={50}
                            height={50}
                            src={logo_sendo}
                            alt="Logo"
                          />
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
        ))}

        {listSimilarProductsRender?.length === 0 && (
          <p>Không có sản phẩm nào</p>
        )}
      </Grid>
    </Box>
  );
};

export default ProductDetail;
