import axios from "axios";
import https from "https";
const baseURL = "https://localhost:7185";
const agent = new https.Agent({
	rejectUnauthorized: false,
});

export default axios.create({
	baseURL,
	httpsAgent: agent,
});
