/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import moment from "moment";
const OrderItem = ({ order }) => {
	return (
		<div className="w-ful rounded border-2 mt-3">
			<div className="flex flex-row justify-between lg:justify-start border-b-2  p-4">
				<div className="m-2">
					<p className="font-medium tracking-tight text-gray-800">
						Order Number
					</p>
					<p className=" font-medium text-gray-500">{order.id}</p>
				</div>
				<div className="m-2">
					<p className="font-medium tracking-tight text-gray-800">
						Amount
					</p>
					<p className="font-medium text-gray-800">{order.amount}$</p>
				</div>
			</div>
			<div className="p-4">
				<p className="font-medium">{moment(order.created).format('MMMM Do YYYY, h:mm:ss a')}</p>
			</div>
			<div className="p-4">
				<div className=" flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{order.cartItems.map((item) => (
							<li key={item.id} className="py-8 flex px-5 ">
								<div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
									<img
										src={item.image}
										alt={item.name}
										className="w-full h-full object-center object-cover"
									/>
								</div>

								<div className="ml-4 flex-1 flex flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<Link
													href={`/product/${item.id}`}
												>
													<a>{item.name}</a>
												</Link>
											</h3>
											<p className="ml-4">
												{item.price}$
											</p>
										</div>
									</div>
									<div className="flex-1 flex items-end justify-between text-sm">
										<p className="text-gray-500">
											Qty {item.quantity}
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
