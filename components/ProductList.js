import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductList = ({ products }) => {
	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<div key={product.id} className="group relative">
							<div className="border-2 w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
								{/* <Image/> */}

								<Image
									alt={product.name}
									src={product.image}
									layout="responsive"
									height={350}
									width={300}
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<Link href={`/product/${product.id}`}>
											<a>
												<span
													aria-hidden="true"
													className="absolute inset-0"
												/>
												{product.name}
											</a>
										</Link>
									</h3>
									<p className="mt-1 text-sm text-gray-500">
										Rating: {product.rating}
									</p>
								</div>
								<p className="text-sm font-medium text-gray-900">
									{product.price}$
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
