/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, Fragment } from "react";
import { useGlobalContext } from "../context/Appcontext";
import { countTotal, countTotalItems } from "../utils/helpers";

const CartItems = () => {
	const router = useRouter();
	const {
		state: { cart },
		openCart,
		removeItemCart,
	} = useGlobalContext();

	return (
		<Transition.Root as={Fragment} show={cart.open}>
			<Dialog
				as="div"
				className="fixed inset-0 overflow-hidden"
				onClose={openCart}
			>
				<div className="absolute inset-0 overflow-hidden">
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="w-screen max-w-md">
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
									<div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
										<div className="flex items-start justify-between">
											<Dialog.Title className="text-lg front-medium text-gray-900">
												Shopping Cart
											</Dialog.Title>
											<div className="ml-3 h-7 flex items-center">
												<button
													type="button"
													className="-m-2 p-2 text-gray-400 hover:text-gray-500"
													onClick={() =>
														openCart(false)
													}
												>
													<span className="sr-only">
														Close panel
													</span>
													<XIcon
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</button>
											</div>
										</div>

										<div className="mt-8">
											<div className="flow-root">
												{cart.cartItems.length === 0 ? (
													<div className="flex items-center justify-center">
														<p>Nothing Here</p>
													</div>
												) : (
													<ul
														role="list"
														className="-my-6 divide-y divide-gray-200"
													>
														{cart.cartItems.map(
															(item) => (
																<li
																	key={
																		item.id
																	}
																	className="py-6 flex"
																>
																	<div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
																		<img
																			src={
																				item.image
																			}
																			alt={
																				item.name
																			}
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
																						<a>
																							{
																								item.name
																							}
																						</a>
																					</Link>
																				</h3>
																				<p className="ml-4">
																					{
																						item.price
																					}

																					$
																				</p>
																			</div>
																		</div>
																		<div className="flex-1 flex items-end justify-between text-sm">
																			<p className="text-gray-500">
																				Qty{" "}
																				{
																					item.quantity
																				}
																			</p>
																			<div className="flex">
																				<button
																					className="font-medium text-indigo-600 hover:text-indigo-500"
																					type="button"
																					onClick={() =>
																						removeItemCart(
																							item.id
																						)
																					}
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															)
														)}
													</ul>
												)}
											</div>
										</div>
									</div>
									{cart.cartItems.length > 0 && (
										<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>
													Subtotal &#40;
													{countTotalItems(
														cart.cartItems
													)}{" "}
													items &#41;
												</p>
												<p>
													{countTotal(cart.cartItems)}
													$
												</p>
											</div>
											<div
												className="mt-6"
												onClick={() => openCart(false)}
											>
												<button
													onClick={() =>
														router.push("/checkout")
													}
													className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
												>
													Checkout
												</button>
											</div>
											<div className="mt-6 flex justify-center text-sm text-center text-gray-500">
												<p>
													or{" "}
													<button
														type="button"
														className="text-indigo-600 font-medium hover:text-indigo-500"
														onClick={() =>
															openCart(false)
														}
													>
														Continue Shopping
														<span aria-hidden="true">
															{" "}
															&rarr;
														</span>
													</button>
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default CartItems;
