const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
const S3_TEMP_BUCKET = import.meta.env.VITE_S3_TEMP_BUCKET;
const REGION = import.meta.env.VITE_REGION;
const AWS_IDENTITY_POOL_ID = import.meta.env.VITE_AWS_IDENTITY_POOL_ID;
const SELF_URL = "https://fixfoto-frontend-production.up.railway.app";
const BASE_URL = "https://fixfoto-backend-production-6e13.up.railway.app";

export {
	STRIPE_PUBLISHABLE_KEY,
	CLIENT_SECRET,
	S3_BUCKET,
	S3_TEMP_BUCKET,
	REGION,
	AWS_IDENTITY_POOL_ID,
	SELF_URL,
	BASE_URL,
};
