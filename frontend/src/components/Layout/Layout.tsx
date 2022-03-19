import React from "react";
import Header from "../Header/Header";

export default function Layout(props: {children: React.ReactNode}) {
	return (
		<section className="flex flex-col h-full">
			<Header />

			<section className="h-full overflow-hidden overflow-y-scroll">{props.children}</section>
		</section>
	);
}
