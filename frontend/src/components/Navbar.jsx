import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className='container mx-auto px-4 py-3 flex justify-between items-center'>
				<Link to='/' className='text-2xl font-bold text-emerald-400 flex items-center space-x-2'>
					E-Commerce
				</Link>

				{/* Hamburger menu button for mobile */}
				<button onClick={toggleMenu} className='text-emerald-400 md:hidden'>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				{/* Navigation for large screens */}
				<nav className='hidden md:flex md:items-center md:space-x-4'>
					<Link
						to={"/"}
						className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
					>
						Home
					</Link>
					{user && (
						<Link
							to={"/cart"}
							className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
						>
							<ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
							<span className='hidden sm:inline'>Cart</span>
							{cart.length > 0 && (
								<span className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>
									{cart.length}
								</span>
							)}
						</Link>
					)}
					{isAdmin && (
						<Link
							className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center'
							to={"/secret-dashboard"}
						>
							<Lock className='inline-block mr-1' size={18} />
							<span className='hidden sm:inline'>Dashboard</span>
						</Link>
					)}

					{user ? (
						<button
							className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
							onClick={logout}
						>
							<LogOut size={18} />
							<span className='hidden sm:inline ml-2'>Log Out</span>
						</button>
					) : (
						<>
							<Link
								to={"/signup"}
								className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
							>
								<UserPlus className='mr-2' size={18} />
								Sign Up
							</Link>
							<Link
								to={"/login"}
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
							>
								<LogIn className='mr-2' size={18} />
								Login
							</Link>
						</>
					)}
				</nav>

				{/* Mobile menu */}
				<div
					className={`fixed inset-y-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg z-50 w-64 transform ${
						isMenuOpen ?  "translate-x-0" : "translate-x-full"
					} transition-transform duration-300 ease-in-out md:hidden`}
				>
					{/* Close button */}
					<button onClick={closeMenu} className='absolute top-4 right-4 text-white'>
						<X size={24} />
					</button>

					<nav className='mt-10 space-y-4'>
						<Link
							to={"/"}
							className='block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out'
							onClick={closeMenu}
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out relative'
								onClick={closeMenu}
							>
								<ShoppingCart className='inline-block mr-2' size={20} />
								Cart
								{cart.length > 0 && (
									<span
										className='absolute top-1 left-14 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='block px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white transition duration-300 ease-in-out'
								to={"/secret-dashboard"}
								onClick={closeMenu}
							>
								<Lock className='inline-block mr-2' size={20} />
								Dashboard
							</Link>
						)}

						{user ? (
							<button
								className='block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white transition duration-300 ease-in-out'
								onClick={() => {
									logout();
									closeMenu();
								}}
							>
								<LogOut className='inline-block mr-2' size={20} />
								Log Out
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white transition duration-300 ease-in-out'
									onClick={closeMenu}
								>
									<UserPlus className='inline-block mr-2' size={20} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white transition duration-300 ease-in-out'
									onClick={closeMenu}
								>
									<LogIn className='inline-block mr-2' size={20} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>

				{/* Overlay when the menu is open */}
				{isMenuOpen && (
					<div
						className='fixed right-0 top-0 bg-black bg-opacity-50 z-40 md:hidden'
						onClick={closeMenu}
					></div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
