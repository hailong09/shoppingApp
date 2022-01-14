import React from "react";
import { StarIcon, ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "../context/Appcontext";

const ProductReview = ({ product }) => {
	const {
		addItemToCart,
		openCart,
		state: { cart },
	} = useGlobalContext();
	const addToBag = () => {
		const existItem = cart.cartItems.find((item) => item.id === product.id);
		const item = {
			id: product.id,
			name: product.name,
			image: product.image,
			price: product.price,
			quantity: existItem ? existItem.quantity + 1 : 1,
		};

		addItemToCart(item);
		openCart(true);
	};

	return (
		<div className="bg-white">
			<div className="pt-6">
				<div className="flex items-center">
					<div className="max-w-2xl px-4 space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
						<Link href={"/"}>
							<a className="mr-6 text-lg font-medium text-gray-500 hover:text-indigo-600">
								Back
							</a>
						</Link>
					</div>
				</div>
			</div>

			<div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
				<div className="lg:col-span-2 lg:border-r lg:border-gray-200 ">
					<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
						{product.name}
					</h1>
				</div>

				{/* Options */}
				<div className="mt-4 lg:mt-0 lg:row-span-3">
					<h2 className="sr-only">Product Information</h2>
					<p className="text-3xl text-gray-900">{product.price}$</p>

					{/* Reviews */}
					<div className="mt-6">
						<h3 className="sr-only">Reviews</h3>
						<div className="flex items-center">
							<p className="text-gray-500">
								Rating: {product.rating}
							</p>

							{/* <a
									href={reviews.href}
									className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
								>
									{reviews.totalCount} reviews
								</a> */}
						</div>
					</div>
					<div>
						<h3 className="sr-only">Description</h3>
						<div className="space-y-6">
							<p className="text-gray-500">
								{product.description}
							</p>
						</div>
					</div>
					<form className="mt-10">
						<button
							type="button"
							className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={addToBag}
						>
							Add to bag
						</button>
					</form>
				</div>

				<div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
					{/* Descriptions and Details */}
					<div className="mt-5 flex items-center justify-center">
						<Image
							src={product.image}
							alt={product.name}
							width={400}
							height={400}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductReview;
