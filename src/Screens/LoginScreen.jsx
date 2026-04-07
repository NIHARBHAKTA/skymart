
import LoginForm from '../Components/LoginForm';

const LoginScreen = ({ setIsLoginOpen }) => {
    return (
        <div className="fixed inset-0 z-[150] flex flex-col lg:flex-row w-full h-screen bg-[#0a0a0a] overflow-hidden font-sans">

            {/* --- LEFT SECTION --- */}
            <div className="w-full lg:w-1/2 h-full p-12 md:p-20 flex flex-col justify-between relative">

                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[#d4ff00] rounded-full flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-white text-2xl font-bold tracking-tight">SkyMart</span>
                </div>

                {/* Hero Content */}
                <div className="max-w-xl">
                    <p className="text-[#d4ff00] text-[11px] font-bold tracking-[0.25em] mb-6 uppercase">
                        Welcome Back
                    </p>
                    <h1 className="text-6xl md:text-[80px] font-bold leading-[1.1] text-white mb-8 tracking-tighter">
                        Shop the future. <br />
                        <span className="text-[#d4ff00]">Today.</span>
                    </h1>
                    <p className="text-zinc-500 text-lg mb-12 max-w-sm font-medium">
                        Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
                    </p>

                    {/* Stats Grid */}
                    <div className="flex gap-4">
                        <div className="flex-1 bg-transparent border border-zinc-800 py-7 px-4 rounded-[20px] text-center">
                            <h3 className="text-2xl font-bold text-white tracking-tighter">20k+</h3>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2 font-bold">Products</p>
                        </div>
                        <div className="flex-1 bg-transparent border border-zinc-800 py-7 px-4 rounded-[20px] text-center">
                            <h3 className="text-2xl font-bold text-white tracking-tighter">50k+</h3>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2 font-bold">Users</p>
                        </div>
                        <div className="flex-1 bg-transparent border border-zinc-800 py-7 px-4 rounded-[20px] text-center">
                            <h3 className="text-2xl font-bold text-[#d4ff00] tracking-tighter">4.9★</h3>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2 font-bold">Rating</p>
                        </div>
                    </div>
                </div>

                {/* Invisible spacer for justify-between */}
                <div className="h-4"></div>
            </div>

            {/* --- RIGHT SECTION (Wider & Transparent) --- */}
            <div className="w-full lg:w-[58%] h-full flex items-center justify-center relative bg-transparent">

                {/* The Vertical Line separator - Made visible with zinc-800 */}
                <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-800/50 to-transparent"></div>

                <LoginForm setIsLoginOpen={setIsLoginOpen} />

                {/* Optional: Subtle radial glow to make the form pop against the transparent bg */}
            
            </div>


        </div>
    );
};

export default LoginScreen;