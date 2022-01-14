import axiosInstance from "../../axiosInstance";
import Layout from "../../components/Layout";
import ProductReview from "../../components/ProductReview";

const Product = (props) => {
	const { product } = props;
	return (
		<>
			<Layout>
				<ProductReview product={product} />
			</Layout>
		</>
	);
};

export const getStaticPaths = async () => {
	const res = await axiosInstance.get("/product");
	const paths = res.data.map((product) => {
		return {
			params: { id: product.id },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async (context) => {
	const id = context.params.id;
	const res = await axiosInstance.get(`/product/${id}`);

	return {
		props: {
			product: res.data,
		},
	};
};

export default Product;
