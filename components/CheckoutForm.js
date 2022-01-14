/* eslint-disable @next/next/no-img-element */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Appcontext";
import { countriesList, countTotal, countTotalItems } from "../utils/helpers";
import { Form, Formik } from "formik";
import Modals from "./Modals";
import * as Yup from "yup";
import axiosInstance from "../axiosInstance";

const paymentSchema = Yup.object().shape({
	emailAddress: Yup.string().email("Invalid email").required("Required"),
	fullName: Yup.string().required("Required"),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	country: Yup.string().required("Required"),
	stateOrProvince: Yup.string().required("Required"),
	postalCode: Yup.string().required("Required"),
});

const CheckoutForm = () => {
	const [haveItems, setHaveItems] = useState(true);
	const stripe = useStripe();
	const element = useElements();

	const [checkOutSuccess, setCheckOutSuccess] = useState({
		success: false,
	});
	const [payment, setPayment] = useState({ error: null });
	const {
		state: { cart, user },
		removeItemCart,
		checkOut,
	} = useGlobalContext();

	const initialValues = {
		emailAddress: "",
		fullName: "",
		address: "",
		city: "",
		country: "",
		stateOrProvince: "",
		postalCode: "",
	};

	const handleChangePayment = (e) => {
		setPayment({
			error: e.error ? e.error.message : "",
		});
	};

	const handlePayment = async (values) => {
		const total = countTotal(cart.cartItems);

		try {
			const res = await axiosInstance.post(
				"/payment/create-payment-content",
				{
					amount: total * 100,
				}
			);

			if (!res.data.clientSecret) {
				return;
			}

			const payload = await stripe.confirmCardPayment(
				res.data.clientSecret,
				{
					payment_method: {
						card: element.getElement(CardElement),
					},
				}
			);

			if (!payload.paymentIntent) return;

			const orderRequest = {
				id: payload.paymentIntent.id,
				userId: user.Id,
				cartItems: cart.cartItems,
				customerInfo: values,
				amount: payload.paymentIntent.amount / 100,
			};

			const orderId = await checkOut(orderRequest);
			if (orderId) {
				setCheckOutSuccess({
					...checkOut,
					success: true,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (cart.cartItems.length === 0) {
			setHaveItems(false);
		}
	}, [cart.cartItems]);

	if (!haveItems) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<p>Nothing here!</p>
				<Link href="/">
					<a className="text-indigo-500 hover:text-indigo-800">
						Back to main page.
					</a>
				</Link>
			</div>
		);
	}

	return (
		<>
			{checkOutSuccess.success && (
				<Modals
					isOpen={true}
					message={
						"Your order was successful. Thank you for shopping!"
					}
					type={"success"}
					orderId={checkOutSuccess.orderId}
				/>
			)}
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => handlePayment(values)}
				validationSchema={paymentSchema}
			>
				{({
					isSubmitting,
					handleChange,
					handleBlur,
					handleSubmit,
					errors,
					values,
					touched,
				}) => (
					<Form onSubmit={handleSubmit}>
						<div className="pt-6 bg-gray-50">
							<div className=" mx-4 px-4 grid grid-cols-1 lg:grid-cols-2">
								<div className="lg:pr-10">
									<div className="border-b-2">
										<div className="mb-7 ">
											<h3 className="text-xl font-medium tracking-tight text-gray-800">
												Contact Information
											</h3>
											<div className="my-3">
												<label>
													<p className="text-gray-500 font-medium">
														Email address:
													</p>
													<input
														disabled={isSubmitting}
														onChange={handleChange}
														onBlur={handleBlur}
														value={
															values.emailAddress
														}
														name="emailAddress"
														type="email"
														autoComplete="emailAddress"
														className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														required
													/>
													{errors.emailAddress &&
														touched.emailAddress && (
															<div className="text-red-500">
																{
																	errors.emailAddress
																}
															</div>
														)}
												</label>
											</div>
										</div>
									</div>
									<div className="border-b-2">
										<div className="my-7">
											<h3 className="text-xl font-medium tracking-tight text-gray-800 ">
												Billing Information
											</h3>
											<div className="mt-3 mb-6">
												<label>
													<p className="text-gray-500 font-medium">
														Full Name:
													</p>
													<input
														name="fullName"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.fullName}
														type="text"
														autoComplete="fullName"
														className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														required
														disabled={isSubmitting}
													/>
													{errors.fullName &&
														touched.fullName && (
															<div className="text-red-500">
																{
																	errors.fullName
																}
															</div>
														)}
												</label>
											</div>

											<div className="mt-3 mb-6">
												<label>
													<p className="text-gray-500 font-medium">
														Address:
													</p>
													<input
														name="address"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.address}
														type="text"
														autoComplete="address"
														className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														required
														disabled={isSubmitting}
													/>
													{errors.address &&
														touched.address && (
															<div className="text-red-500">
																{errors.address}
															</div>
														)}
												</label>
											</div>

											<div className="mt-3 mb-6">
												<label>
													<p className="text-gray-500 font-medium">
														City:
													</p>
													<input
														name="city"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.city}
														type="text"
														autoComplete="city"
														className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														required
														disabled={isSubmitting}
													/>
												</label>
												{errors.city &&
													touched.city && (
														<div className="text-red-500">
															{errors.city}
														</div>
													)}
											</div>

											<div className="mt-3 mb-6">
												<label>
													<p className="text-gray-500 font-medium">
														Country:
													</p>
													<select
														disabled={isSubmitting}
														name="country"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.country}
														className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
													>
														{countriesList.map(
															(country) => (
																<option
																	key={
																		country
																	}
																	value={
																		country
																	}
																	className="text-gray-600 font-medium"
																>
																	{country}
																</option>
															)
														)}
													</select>
												</label>
												{errors.country &&
													touched.country && (
														<div className="text-red-500">
															{errors.country}
														</div>
													)}
											</div>

											<div className="mt-3 mb-6">
												<label>
													<p className="text-gray-500 font-medium">
														State/Province:
													</p>
													<input
														disabled={isSubmitting}
														name="stateOrProvince"
														onChange={handleChange}
														onBlur={handleBlur}
														value={
															values.stateOrProvince
														}
														type="text"
														autoComplete="stateOrProvince"
														className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														required
													/>
												</label>
												{errors.stateOrProvince &&
													touched.stateOrProvince && (
														<div className="text-red-500">
															{
																errors.stateOrProvince
															}
														</div>
													)}
											</div>

											<div className="mt-3 mb-6">
												<label>
													<p className="text-gray-500 font-medium">
														Postal Code:
													</p>
													<input
														disabled={isSubmitting}
														name="postalCode"
														type="text"
														autoComplete="postalCode"
														className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														required
														value={
															values.postalCode
														}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</label>
												{errors.postalCode &&
													touched.postalCode && (
														<div className="text-red-500">
															{errors.postalCode}
														</div>
													)}
											</div>
										</div>
									</div>
									<div className="my-7">
										<h3 className="text-xl font-medium tracking-tight text-gray-800">
											Payment
										</h3>
										<div className="mt-3 mb-6">
											<label>
												<p className="text-gray-500 font-medium">
													Card:
												</p>
												<CardElement
													onChange={
														handleChangePayment
													}
													required
													className=" shadow w-full px-3 py-2 rounded border-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
												/>
											</label>
										</div>
									</div>
								</div>
								<div className="mb-5 lg:mb-0">
									<h3 className="text-xl font-medium tracking-tight text-gray-800">
										Order Summery
									</h3>
									<div className="rounded border-2 mx-auto flex flex-col mt-3 bg-white">
										<div className=" flow-root">
											<ul
												role="list"
												className="-my-6 divide-y divide-gray-200"
											>
												{cart.cartItems.map((item) => (
													<li
														key={item.id}
														className="py-8 flex px-5 "
													>
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
																		disabled={
																			isSubmitting
																		}
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
												))}
											</ul>
										</div>

										<div className="mt-5 border-t-2">
											<div className=" px-5 py-8 flex justify-between text-base font-medium text-gray-900">
												<h3>
													Total &#40;
													{countTotalItems(
														cart.cartItems
													)}{" "}
													items&#41;
												</h3>
												<p className="ml-4">
													{countTotal(cart.cartItems)}
													$
												</p>
											</div>
										</div>
										<div className="flex justify-center items-center w-full my-3">
											<button
												disabled={isSubmitting}
												type="submit"
												className=" w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
											>
												Pay
											</button>
										</div>
										{payment.error && (
											<Modals
												isOpen={true}
												message={payment.error}
												type={"error"}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default CheckoutForm;
