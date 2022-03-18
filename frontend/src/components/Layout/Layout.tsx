import React from "react";
import Header from "../Header/Header";

export default function Layout(props: {children: React.ReactNode}) {
	return (
		<section>
			<Header />
			{props.children}
		</section>
	);
}
