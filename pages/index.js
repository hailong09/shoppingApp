import Head from "next/head";
import Image from "next/image";
import axiosInstance from "../axiosInstance";
import Layout from "../components/Layout";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";

export default function Home(props) {
	const {success, products} = props;
	return (
		<>
			<Layout>
				{ success && <ProductList products={products}/>}
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	const res = await axiosInstance.get("/product");
	if (!res.data) {
		return {
			props: {
				success: false,
			},
		};
	}

	return {
		props: {
			success: true,
			products: res.data,
		},
	};
}
