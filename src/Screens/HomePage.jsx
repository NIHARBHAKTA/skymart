import { useNavigate } from "react-router-dom";
import TopRatedProducts from "../Components/TopRatedProducts";
import NewArrivals from "../Components/NewArrivals";
import { useContext } from "react";
import { Mystore } from "../ContextApi/Context";


const HomePage = () => {

    let navigate = useNavigate()

    const { cart, totalPrice, productsData } = useContext(Mystore);

    // Calculate dynamic values
    const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

    //unique categories count
    const categoriesCount = [...new Set(productsData.map(p => p.category))].length;


    //get the first name from local storage
    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
    const fullName = loggedInUser ? loggedInUser.fullName : "Guest";
    const firstName = fullName.trim().split(" ")[0];
    const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();


    // Dynamic stats array
    const stats = [
        {
            label: totalItemsInCart.toString(),
            sub: 'Cart Items',
            detail: totalItemsInCart === 1 ? '1 item added' : `${totalItemsInCart} items added`,
            icon: '📦',
            color: 'bg-lime-500/10 text-lime-400'
        },
        {
            label: `$${totalPrice.toFixed(2)}`,
            sub: 'Cart Value',
            detail: totalPrice > 0 ? 'Ready to checkout' : 'Bag is empty',
            icon: '📈',
            color: 'bg-blue-500/10 text-blue-400'
        },
        {
            label: '5',
            sub: 'Top Products',
            detail: 'Highly rated picks',
            icon: '⭐',
            color: 'bg-orange-500/10 text-orange-400'
        },
        {
            label: categoriesCount.toString(),
            sub: 'Categories',
            detail: 'Explore varieties',
            icon: '🏷️',
            color: 'bg-purple-500/10 text-purple-400'
        },
    ];


    //  Define the categories you want to display on the Home Screen
    const displayCategories = [
        { name: 'beauty', label: 'Beauty', icon: '💄' },
        { name: 'fragrances', label: 'Perfumes', icon: '✨' },
        { name: 'furniture', label: 'Furniture', icon: '🪑' },
        { name: 'groceries', label: 'Groceries', icon: '🍎' },
        { name: 'home-decoration', label: 'Home', icon: '🏠' },
        { name: 'laptops', label: 'Electronics', icon: '💻' },
    ];

    //  Map through displayCategories and find the real counts from productsData
    const dynamicCategories = displayCategories.map(cat => {
        const count = productsData.filter(p => p.category === cat.name).length;
        return {
            ...cat,
            count: count
        };
    });

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans px-8 pt-4 pb-12">

            {/* Hero Section */}
            <header className="relative bg-[#111] border border-gray-800 rounded-[40px] p-16 flex justify-between items-center overflow-hidden mb-8">
                <div className="relative z-10">
                    <p className="text-[#d4ff00] text-xs font-bold tracking-[0.2em] mb-4 uppercase">Good Morning 👋</p>
                    <h1 className="text-6xl font-bold leading-tight mb-6">Welcome back, <br /><span className="text-[#d4ff00]">{displayName}</span></h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-md">Discover today's picks — hand-curated products across electronics, fashion, and more.</p>
                    <div className="flex gap-4">

                        <button className="bg-[#d4ff00] text-black px-8 py-3 rounded-xl font-bold hover:brightness-110 transition cursor-pointer"
                            onClick={() => navigate("/shop")}
                        >
                            Shop Now →
                        </button>

                        <button className="bg-transparent border border-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-white/5 transition cursor-pointer" onClick={() => navigate("/shop")}
                        >
                            View All Products
                        </button>

                    </div>

                </div>

                <div className="relative z-10 flex flex-col gap-4">
                    <div className="bg-[#1a1a1a]/80 border border-[#d4ff00]/20 p-8 rounded-[24px] text-center w-48">
                        <h2 className="text-4xl font-bold text-[#d4ff00]">20+</h2>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Products Available</p>
                    </div>
                    <div className="bg-[#1a1a1a]/80 border border-gray-800 p-8 rounded-[24px] text-center w-48">
                        <h2 className="text-3xl font-bold">Free</h2>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Delivery on ₹999+</p>

                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#111] border border-gray-800 p-6 rounded-[20px] flex items-center gap-4 hover:border-gray-700 transition-colors">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold leading-none">{stat.label}</div>
                            <div className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                                {stat.sub}
                            </div>
                            <div className="text-[9px] text-gray-600 uppercase font-bold">
                                {stat.detail}
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Categories */}
            <section className="mb-16">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h3 className="text-2xl font-bold">Shop by Category</h3>
                    <span
                        className="text-[#d4ff00] text-sm font-bold cursor-pointer hover:underline"
                        onClick={() => navigate("/shop")}
                    >
                        View All →
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {dynamicCategories.map((cat, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/shop?category=${cat.name}`)} // Optional: filter shop by category
                            className="group bg-white hover:bg-[#d4ff00] transition-all duration-300 p-8 rounded-[32px] flex flex-col items-center justify-center text-black cursor-pointer shadow-lg hover:shadow-[#d4ff00]/20"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                                {cat.icon}
                            </div>
                            <div className="font-black text-sm uppercase tracking-tighter">
                                {cat.label}
                            </div>
                            <div className="text-[10px] text-gray-400 group-hover:text-black/60 mt-1 font-bold">
                                {cat.count} ITEMS
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Lists */}
            <section className="grid grid-cols-2 gap-8 mb-12">

                <TopRatedProducts></TopRatedProducts>

                <NewArrivals></NewArrivals>

            </section>


            {/* Features Cards */}
            <section className="grid grid-cols-3 gap-6 mb-20">
                <FeatureCard icon="⚡" title="Fast Delivery" desc="Same-day on select items" />
                <FeatureCard icon="🛡️" title="Secure Payments" desc="100% encrypted checkout" />
                <FeatureCard icon="🏷️" title="Best Prices" desc="Price-match guarantee" />
            </section>

        </div>

    );
};

// Reusable Components to keep HomePage clean
const ProductList = ({ title, icon, accent, products }) => (
    <div className="bg-white rounded-[32px] p-8 text-black shadow-xl">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <span className={accent}>{icon}</span> {title}
            </h3>
            <span className="text-[#d4ff00] text-[10px] font-black uppercase tracking-tighter cursor-pointer border-b-2 border-[#d4ff00]">See all →</span>
        </div>
        <div className="space-y-3">
            {products.map((p, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 hover:bg-gray-50 p-2 rounded-xl transition">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl shadow-inner">{p.icon}</div>
                        <span className="font-bold text-[#d4ff00] text-xl tracking-tight">{p.price}</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-lime-50 flex items-center justify-center text-lime-600 hover:bg-lime-500 hover:text-white transition cursor-pointer">🛍️</div>
                </div>
            ))}
        </div>
    </div>
);

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-transparent border border-gray-800 p-6 rounded-[24px] flex items-center gap-5 hover:border-gray-600 transition group">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition">{icon}</div>
        <div>
            <div className="font-bold text-sm tracking-tight">{title}</div>
            <div className="text-[11px] text-gray-500 font-medium">{desc}</div>
        </div>
    </div>
);

export default HomePage;