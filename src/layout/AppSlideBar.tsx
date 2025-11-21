import { Link, useLocation } from "react-router-dom"
import { ChevronDownIcon, GridIcon, HorizontaLDots, ListIcon, PlusIcon, UserCircleIcon } from "../icon"
import { useState } from "react";

const navItems = [
    {
        icon: <GridIcon />,
        name: "Dashboard",
        subItems: [{ name: "Ecomercer", path: "/" }]
    },

    {
        icon: <ListIcon />,
        name: "Product Management",
        subItems: [
            { name: "List Product", path: "/list-product" },
            { name: "Product", path: "/product" },
            { name: "Category", path: "/category" }
        ]
    },

    {
        icon: <UserCircleIcon />,
        name: "User Profile",
        path: "/profile"
    },

    {
        icon: <PlusIcon />,
        name: "Authentication",
        subItems: [
            { name: "Sign In", path: "/signin" },
        ]
    }
]

const AppSlideBar = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (name: string) => {
        console.log(name, 'name');

        setOpenMenu((prev) => (prev === name ? null : name));
    };

    const location = useLocation();

    return (
        <aside className="sidebar-scroll fixed top-0 left-0 w-[290px] h-screen bg-white shadow-md">
            {/* Logo */}
            <div className="lg:flex justify-start py-8 px-5 sm:hidden">
                <Link to="/">
                    {/* <img src="/images/logo/logo.svg" alt="Logo" width={150} height={40} /> */}
                    Logo
                </Link>
            </div>

            {/* Menu */}
            <div className="flex flex-col px-5 lg:py-0 sm:py-22">
                <nav className="mb-6">
                    <div className="flex flex-col gap-6">
                        {/* Main Menu */}
                        <div>
                            <h2 className="mb-3 text-xs uppercase text-gray-400 flex items-center gap-2">
                                <HorizontaLDots className="w-4 h-4" />
                                Menu
                            </h2>
                            <ul className="flex flex-col gap-3">
                                {navItems.map((nav) => (
                                    <li key={nav.name}>
                                        <div
                                            onClick={() => nav.subItems && toggleMenu(nav.name)}
                                            className="flex items-center gap-3 text-gray-600 hover:text-gray-950 cursor-pointer">
                                            <span className="w-5 h-5">{nav.icon}</span>
                                            <span className="font-medium">{nav.name}</span>
                                            {nav.subItems && (
                                                <ChevronDownIcon className={`w-4 h-4 ml-auto transition-transform duration-200 
                                                    ${openMenu === nav.name ? "rotate-180" : ""}`} />
                                            )}
                                        </div>

                                        {nav.subItems && (
                                            <ul className={`ml-9 mt-2 space-y-1 overflow-hidden transition-all duration-300
                                                ${openMenu === nav.name
                                                ? "max-h-40 opacity-100"
                                                : "max-h-0 opacity-0"}`}>
                                                {nav.subItems.map((sub) => (
                                                    <li key={sub.name}>
                                                        <Link
                                                            to={sub.path}
                                                            className={`text-sm font-semibold text-gray-500 hover:text-gray-900 transition 
                                                                ${location.pathname === sub.path 
                                                                    ? "text-gray-900"
                                                                    : ""}`}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}

export default AppSlideBar