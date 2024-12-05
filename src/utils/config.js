import dotenv from "dotenv";
dotenv.config();

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export { STRIPE_PUBLISHABLE_KEY, CLIENT_SECRET };
