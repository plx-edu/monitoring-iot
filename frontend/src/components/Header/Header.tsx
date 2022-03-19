import {link} from "fs";
import React from "react";
import {NavLink} from "react-router-dom";
import {getNavLinks} from "../../utilities/methods";

export default function Header() {
	return (
		<header className="flex flex-row bg-zinc-900 h-12">
			{getNavLinks().map((link) => (
				<NavLink
					key={link.page}
					to={link.path}
					className="w-full h-full text-white hover:bg-zinc-800 hover:border-stone-500 hover:border-b-4 active:bg-indigo-900"
				>
					<p>{link.page}</p>
				</NavLink>
			))}
		</header>
	);
}
