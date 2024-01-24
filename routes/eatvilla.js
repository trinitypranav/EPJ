const express = require("express");
const router = express.Router();
const fetch = require("cross-fetch");

router.get("/getAllRestaurants", async (req, res) => {
  console.log(
    "called /getAllRestaurants",
    process.env.SWIGGY_GET_ALL_RESTAURANTS_URL
  );

  const data = await fetch(process.env.SWIGGY_GET_ALL_RESTAURANTS_URL, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  });
  const json = await data.json();
  //console.log(json);
  res.json(json);
});

router.get("/getRestaurants/:id", async (req, res) => {
  const id = req.params.id;
  console.log(
    "called /getRestaurants/:id",
    process.env.SWIGGY_GET_RESTAURANT_MENU_BY_ID_URL
  );

  const data = await fetch(
    process.env.SWIGGY_GET_RESTAURANT_MENU_BY_ID_URL + id,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    }
  );
  const json = await data.json();
  //console.log(json);
  res.json(json);
});

module.exports = router;
