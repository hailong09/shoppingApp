import "../styles/globals.css";
import AppProvider from "../context/Appcontext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartItems from "../components/CartItems";
const stripePromise = loadStripe(
	"pk_test_51IooATLxdtk9PSl2j645MbK63q89Ys95tQzOhbaE6aoKQNxwyz78J4JRyDRtudsqI5vJvbNSWDRaGw44UUoOSQfV00ZVmJukH0"
);
function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<Elements stripe={stripePromise}>
				<CartItems />
				<Component {...pageProps} />
			</Elements>
		</AppProvider>
	);
}

export default MyApp;
