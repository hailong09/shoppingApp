/* eslint-disable @next/next/no-img-element */
import { LockClosedIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGlobalContext } from "../context/Appcontext";

const Login = () => {
	const router = useRouter();
	const initialValues = { email: "", password: "" };
	const { state, authenticate } = useGlobalContext();

	useEffect(() => {
		if (state.isAuthenticated) {
			router.push("/");
		}
	}, [state.isAuthenticated, router]);

	return (
		<>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Register to your account
						</h2>
					</div>
					<Formik
						initialValues={initialValues}
						onSubmit={(values) =>
							authenticate(values, "/user/login")
						}
					>
						{({
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							values,
						}) => (
							<Form
								className="mt-8 space-y-6"
								onSubmit={handleSubmit}
							>
								<div className="rounded-md shadow-sm -space-y-px">
									<div>
										<label
											htmlFor="email-address"
											className="sr-only"
										>
											Email address
										</label>
										<input
											id="email-address"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
											placeholder="Email address"
											onChange={handleChange}
											value={values.email}
											onBlur={handleBlur}
										/>
									</div>
									<div>
										<label
											htmlFor="password"
											className="sr-only"
										>
											Password
										</label>
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
											placeholder="Password"
											onChange={handleChange}
											value={values.password}
											onBlur={handleBlur}
										/>
									</div>
								</div>

								<div className="flex items-center justify-end">
									<div className="text-sm">
										<Link href="/register">
											<a className="font-medium text-indigo-600 hover:text-indigo-500">
												Don&apos;t have account.
												Register here!
											</a>
										</Link>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										disabled={isSubmitting}
									>
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
											<LockClosedIcon
												className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
												aria-hidden="true"
											/>
										</span>
										Sign in
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Login;
