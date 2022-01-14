import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
	MenuIcon,
	SearchIcon,
	ShoppingBagIcon,
	XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "../context/Appcontext";

const NavigationBar = () => {
	const [open, setOpen] = useState(true);
	const {
		state: { user, isAuthenticated, cart },
		logout,
		openCart,
	} = useGlobalContext();
	const [items, setItems] = useState(0);

	useEffect(() => {
		if (cart.cartItems.length > 0) {
			setItems(cart.cartItems.length);
		} else {
			setItems(0);
		}
	}, [items, cart.cartItems]);

	return (
		<div className="bg-white">
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 flex z-40 lg:hidden"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col  overflow-y-auto">
							<div className="px-4 pt-5 pb-2 flex">
								<button
									type="button"
									className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
									onClick={() => setOpen(false)}
								>
									<span className="sr-only">Close Menu</span>
									<XIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</button>
							</div>

							{isAuthenticated ? (
								<div className="border-t border-gray-200 py-6 px-4 space-y-6">
									<div>
										<p className="text-sm font-medium text-gray-600 hover:text-gray-800">
											{
												user[
													"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
												]
											}
										</p>
									</div>
									<div>
										<Link href="/order/order-history">
											<a className="text-sm font-medium text-gray-600 hover:text-gray-800">
												Order history
											</a>
										</Link>
									</div>
									<div>
										<button
											className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
											onClick={() => logout()}
										>
											Log out
										</button>
									</div>
								</div>
							) : (
								<div className="border-t border-gray-200 py-6 px-4 space-y-6">
									<div className="flow-root">
										<Link href="/login">
											<a className="-m-2 p-2 block font-medium text-gray-900">
												Sign in
											</a>
										</Link>
									</div>
									<div className="flow-root">
										<Link href="/register">
											<a className="-m-2 p-2 block font-medium text-gray-900">
												Create account
											</a>
										</Link>
									</div>
								</div>
							)}
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>

			<header className="relative bg-white">
				<p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
					Happy Shopping!
				</p>
				<nav
					aria-label="Top"
					className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				>
					<div className="border-b border-gray-200">
						<div className="h-16 flex items-center">
							<button
								type="button"
								className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
								onClick={() => setOpen(true)}
							>
								<span className="sr-only">Open menu</span>
								<MenuIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>
							{/* Logo */}
							<div className="ml-4 flex lg:ml-0 ">
								<Link href="/">
									<a>
										<span className="sr-only">
											Work flow
										</span>
										<Image
											src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
											alt="logo"
											width={30}
											height={30}
										/>
									</a>
								</Link>
							</div>
							<div className="ml-auto flex items-center">
								{isAuthenticated ? (
									<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
										<div>
											<Popover className="relative">
												{({ open }) => (
													<>
														<Popover.Button>
															<span className="text-sm font-medium text-gray-600 hover:text-gray-800">
																{
																	user[
																		"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
																	]
																}
															</span>
														</Popover.Button>

														<Transition
															as={Fragment}
															enter="transition ease-out duration-200"
															enterFrom="opacity-0 translate-y-1"
															enterTo="opacity-100 translate-y-0"
															leave="transition ease-in duration-150"
															leaveFrom="opacity-100 translate-y-0"
															leaveTo="opacity-0 translate-y-1"
														>
															<Popover.Panel className="absolute  w-screen max-w-sm  z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 ">
																<div className="overflow-hidden  rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
																	<div className="relative grid gap-8 bg-white p-7 grid-cols-2">
																		<Link href="/order/order-history">
																			<a className="text-sm font-medium text-gray-600 hover:text-gray-800">
																				Order history
																			</a>
																		</Link>
																	</div>
																</div>
															</Popover.Panel>
														</Transition>
													</>
												)}
											</Popover>
										</div>
										<div>
											<button
												className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
												onClick={() => logout()}
											>
												Log out
											</button>
										</div>
									</div>
								) : (
									<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
										<Link href="/login">
											<a className="text-sm font-medium text-gray-600 hover:text-gray-800">
												Sign in
											</a>
										</Link>

										<Link href="/register">
											<a className="text-sm font-medium text-gray-600 hover:text-gray-800">
												Create account
											</a>
										</Link>
									</div>
								)}
							</div>

							{/* Search */}
							<div className="flex lg:ml-6">
								<a
									href="#"
									className="p-2 text-gray-400 hover:text-gray-500"
								>
									<span className="sr-only">Search</span>
									<SearchIcon
										className="w-6 h-6"
										aria-hidden="true"
									/>
								</a>
							</div>

							{/* Cart */}
							<div className="ml-4 flow-root lg:ml-6">
								<div
									className="group -m-2 p-2 flex items-center hover:cursor-pointer"
									onClick={() => openCart(true)}
								>
									<ShoppingBagIcon
										className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>

									<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
										{items}
									</span>
									<span className="sr-only">
										items in cart, view bag
									</span>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
};

export default NavigationBar;
