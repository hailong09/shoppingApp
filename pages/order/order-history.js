import moment from "moment";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import OrderItem from "../../components/OrderItem";
import { useGlobalContext } from "../../context/Appcontext";

const OrderHistory = () => {
	const { state, loadOrderHistory } = useGlobalContext();
	useEffect(() => {
		loadOrderHistory();
	}, []);

	
	return (
		<>
			<Layout>
				{state.orderHistory.length > 0 && (
					<div className="pt-6">
						<div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-6">
							<div>
								<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
									Order History
								</h1>
							</div>
							<div className="mt-2">
								{state.orderHistory
									.sort((a, b) => moment(b.created) - moment(a.created))
									.map((order) => (
										<OrderItem
											order={order}
											key={order.id}
										/>
									))}
							</div>
						</div>
					</div>
				)}
			</Layout>
		</>
	);
};

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
