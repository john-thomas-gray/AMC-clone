const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const movieTicketPriceCents = {
  adult: 1749,
  child: 1449,
  senior: 1599,
  fee: 219,
  adultImax: 2799,
  childImax: 2499,
  seniorImax: 2649,
  feeImax: 269
};

const concessionPriceCents = {
  comboPopcornTwoDrinks: 2737
};

const products = {
  adult_ticket_standard:
    movieTicketPriceCents.adult + movieTicketPriceCents.fee,
  child_ticket_standard:
    movieTicketPriceCents.child + movieTicketPriceCents.fee,
  senior_ticket_standard:
    movieTicketPriceCents.senior + movieTicketPriceCents.fee,
  adult_ticket_imax:
    movieTicketPriceCents.adultImax + movieTicketPriceCents.feeImax,
  child_ticket_imax:
    movieTicketPriceCents.childImax + movieTicketPriceCents.feeImax,
  senior_ticket_imax:
    movieTicketPriceCents.seniorImax + movieTicketPriceCents.feeImax,
  combo_popcorn_two_drinks: concessionPriceCents.comboPopcornTwoDrinks
};

const app = express();
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items, email } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid items array." });
    }

    let amount = 0;
    for (const item of items) {
      if (!products[item.sku]) {
        return res.status(400).json({ error: `Invalid SKU: ${item.sku}` });
      }
      if (typeof item.quantity !== "number" || item.quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity." });
      }
      amount += products[item.sku] * item.quantity;
    }

    // Create PaymentIntent on Stripe with calculated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card", "apple_pay", "google_pay"],
      receipt_email: email,
      metadata: {
        // Optional: store info about order for reconciliation
        order: JSON.stringify(items)
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount
    });
  } catch (error) {
    console.error("PaymentIntent creation failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
