import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import Layout from "../components/Layout";
import { USER_TOKEN } from "../constant";

const Checkout = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!localStorage.getItem(USER_TOKEN)) {
			router.replace("/login");
			return;
		}

		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="flex items-center justify-center ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-24 h-24 text-indigo-600 animate-spin"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>
				</div>
			</div>
		);
	}

	return (
		<Layout>
			<div>
				<CheckoutForm />
			</div>
		</Layout>
	);
};

export default Checkout;
