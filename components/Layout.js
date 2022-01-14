import React from "react";
import CartItems from "./CartItems";
import NavigationBar from "./Navigationbar";

const Layout = ({ children }) => {
	return (
		<>
			
			<NavigationBar />
			{children}
		</>
	);
};

export default Layout;
