const express = require("express");
const router = express.Router();
const fetch = require("cross-fetch");
const Stripe = require("stripe")(process.env.stripe_key);
//http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=

router.post("/make-payment", async (req, res) => {
  try {
    const { amount } = req.body;
    // console.log(token);

    const paymentIntent = await Stripe.paymentIntents.create({
      amount,
      currency: "INR",
    });

    const transactionId = paymentIntent.client_secret;

    res.send({
      success: true,
      message: "Payment successful",
      data: transactionId,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/getSuggestions/:id", async (req, res) => {
  console.log(
    "called /getSuggestions",
    "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
  );

  console.log(req.params.id);
  const URL =
    "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
    req.params.id;

  const data = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  });
  const json = await data.json();
  console.log(json);
  res.send(json[1]);
});

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
