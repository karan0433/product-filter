import React, { useEffect, useState } from "react";
import ProductData from "../../../Products.json";
import CateogryData from "../../../Category.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProductList = () => {
  const [selectedcategory, setselectedCategory] = useState("");
  const [selectedprice, setselectedPrice] = useState("");
  const [selectedRating, setselectedRating] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handlecategorychange = (e) => {
    setselectedCategory(e.target.value);
  };
  const handlepricecahnge = (e) => {
    setselectedPrice(e.target.value);
  };

  const handleRatingChange = (e) => {
    setselectedRating(e.target.value);
  };

  useEffect(() => {
    const filtered = ProductData.products.filter((item) => {
      const categoryMatch =
        selectedcategory === "" || item.category === selectedcategory;
      const priceMatch =
        selectedprice === "" || item.price <= parseInt(selectedprice);
      const ratingmatch =
        selectedRating === "" || item.rating <= parseInt(selectedRating);
      return categoryMatch && priceMatch && ratingmatch;
    });

    setFilteredProducts(filtered);
  }, [selectedcategory, selectedprice, selectedRating]);

  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "16px",
          justifyContent: "center",
        }}
      >
        <select value={selectedcategory} onChange={handlecategorychange}>
          <option value="">Categories</option>
          {CateogryData.map((item) => (
            <option key={item.id} value={item.category}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={selectedprice}
          onChange={handlepricecahnge}
          style={{ marginLeft: "8px" }}
        >
          <option value="">Price</option>
          <option value="100">Below 100</option>
          <option value="500">100-500</option>
          <option value="1000">500-1000</option>
          <option value="1200">1000-1200</option>
        </select>
        <select
          value={selectedRating}
          onChange={handleRatingChange}
          style={{ marginLeft: "8px" }}
        >
          <option value="">Rating</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>

      {/* message if no matching products */}
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          No products match the selected criteria.
        </div>
      )}

      {/* cards data start from here */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredProducts.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345, flex: "1 0 20%" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={item.thumbnail}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Name: {item.title}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Category : {item.category}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Price : {item.price}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Rating : {item.rating}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Brand : {item.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description : {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductList;
