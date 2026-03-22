const stripeApiKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock";
const isMockKey = stripeApiKey.includes("mock") || stripeApiKey.includes("YOUR_STRIPE");

let stripe;
if (!isMockKey) {
    stripe = require("stripe")(stripeApiKey);
}

const User = require("../models/User");

exports.createCheckoutSession = async (req, res) => {
    try {
        if (isMockKey) {
            // Bypass Stripe and pretend we generated a checkout session
            console.log("Using Mock Stripe Key. Simulating Checkout...");
            // Automatically upgrade the user in the mock database
            await User.findByIdAndUpdate(req.user.id, { isPremium: true });

            // Redirect straight to success URL
            return res.json({
                url: `${process.env.CLIENT_URL || "http://localhost:3000"}/dashboard?success=true`
            });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: req.user.email,
            client_reference_id: req.user.id, // Pass user ID to associate payment
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "BloomCycle Premium Membership",
                            description: "Unlock advanced insights and unrestricted calendar data.",
                        },
                        unit_amount: 999, // $9.99
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/dashboard?success=true`,
            cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/membership?canceled=true`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.handleWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle successful checkout
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.client_reference_id;

        if (userId) {
            await User.findByIdAndUpdate(userId, { isPremium: true });
            console.log(`User ${userId} successfully upgraded to Premium.`);
        }
    }

    res.json({ received: true });
};
