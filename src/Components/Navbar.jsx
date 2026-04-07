import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Mystore } from '../ContextApi/Context';



const Navbar = () => {

    let navigate = useNavigate()

    const { setIsCartOpen, cart } = useContext(Mystore);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (

        <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">

            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2 text-xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
                    <div className="w-8 h-8 bg-[#d4ff00] rounded-full flex items-center justify-center text-black">S</div>
                    <span className="text-white">SkyMart</span>
                </div>

                {/* Nav Links */}
                <div className="flex gap-8 text-gray-400 font-medium text-sm">
                    <NavLink to={"/home"}
                        className={({ isActive }) =>
                            isActive ? "text-[#d4ff00]" : ""
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink to={"/shop"} className={({ isActive }) =>
                        isActive ? "text-[#d4ff00]" : ""
                    }>
                        Shop
                    </NavLink>

                    <NavLink to={"/about"} className={({ isActive }) =>
                        isActive ? "text-[#d4ff00]" : ""
                    }>
                        About
                    </NavLink>



                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4">

                    <div className="bg-[#1a1a1a] px-4 py-1.5 rounded-full flex items-center gap-2 border border-gray-800">

                        <span className="bg-[#d4ff00] text-black text-[10px] font-bold px-1.5 rounded-sm text-center">N</span>

                        <span className="text-sm text-white">Nihar bhakta</span>

                    </div>

                    <button
                        className="relative p-2 bg-[#1a1a1a] rounded-lg border border-gray-800 text-gray-400 hover:text-white transition cursor-pointer group"
                        onClick={() => setIsCartOpen(true)}
                    >
                        🛒
                        {/*  show badge if there are items in the cart */}
                        {totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-[#d4ff00] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0a] group-hover:scale-110 transition-transform">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <button className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-800 text-gray-400 hover:text-white transition cursor-pointer"
                        onClick={() => navigate("/login")}
                    >🚪
                    </button>

                </div>

            </div>

        </nav>


    );
};

export default Navbar