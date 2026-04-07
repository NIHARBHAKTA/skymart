import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { Mystore } from '../ContextApi/Context';


const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null); // Changed to null for single object
    const [isLiked, setIsLiked] = useState(false)

    const { addToCart } = useContext(Mystore);

    const getProductData = async () => {
        try {
            // Corrected URL: just /products/id
            const fetchData = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await fetchData.json();
            setProduct(data); // Set the whole object
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        getProductData();
    }, [id]);

    // Show a loader while data is fetching
    if (!product) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#d4ff00]">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-10 px-8 pb-20 font-sans">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center gap-2 text-sm text-zinc-500 font-medium">
                <span onClick={() => navigate('/shop')} className="hover:text-zinc-300 cursor-pointer flex items-center gap-2">
                    <span className="text-xs">←</span> Products
                </span>
                <span>/</span>
                <span className="hover:text-zinc-300 cursor-pointer capitalize">{product.category}</span>
                <span>/</span>
                <span className="text-zinc-100">{product.title}</span>
            </div>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left Side: Product Image Wrapper */}
                <div className="bg-white rounded-[40px] aspect-square flex items-center justify-center p-16 shadow-2xl overflow-hidden">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Right Side: Product Info */}
                <div className="flex flex-col justify-center">
                    <span className="bg-[#d4ff00] text-black text-[10px] font-black px-3 py-1 rounded-full w-fit mb-6 uppercase tracking-widest">
                        {product.category}
                    </span>

                    <h1 className="text-5xl font-bold mb-4 tracking-tight leading-tight">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex text-[#d4ff00] text-lg">
                            {"★".repeat(Math.round(product.rating))}
                            <span className="text-zinc-700">{"★".repeat(5 - Math.round(product.rating))}</span>
                        </div>
                        <span className="text-zinc-400 text-sm font-bold">{product.rating}</span>
                        <span className="text-zinc-600 text-sm font-medium">({product.stock} in stock)</span>
                    </div>

                    <div className="text-6xl font-black text-[#d4ff00] mb-8 tracking-tighter italic">
                        ${product.price}
                    </div>

                    <div className="h-[2px] w-full bg-zinc-900 mb-8"></div>

                    <p className="text-zinc-500 leading-relaxed mb-10 text-lg max-w-lg font-medium">
                        {product.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-10">
                        <button className="flex-grow bg-[#d4ff00] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all text-lg shadow-[0_10px_40px_rgba(212,255,0,0.15)] uppercase italic cursor-pointer" onClick={() => addToCart(product)}>
                            🛒 Add to Cart
                        </button>

                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`w-16 h-16 border-2 rounded-2xl transition-all text-xl cursor-pointer flex items-center justify-center shrink-0
                            ${isLiked
                                    ? "border-red-500 bg-red-500/10 text-red-500"
                                    : "border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-white"
                                }`}
                        >
                            {/* Wrap in a span to control the font size specifically */}
                            <span className="leading-none select-none">
                                {isLiked ? "❤️" : "♡"}
                            </span>
                        </button>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-12">
                        <div className="bg-[#111] border border-zinc-900 p-4 rounded-3xl text-center">
                            <div className="text-xl mb-1">🚚</div>
                            <div className="text-[10px] font-bold">Free Delivery</div>
                        </div>
                        <div className="bg-[#111] border border-zinc-900 p-4 rounded-3xl text-center">
                            <div className="text-xl mb-1">🛡️</div>
                            <div className="text-[10px] font-bold">Secure Pay</div>
                        </div>
                        <div className="bg-[#111] border border-zinc-900 p-4 rounded-3xl text-center">
                            <div className="text-xl mb-1">🔄</div>
                            <div className="text-[10px] font-bold">Easy Returns</div>
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate(`/productDetails/${Number(id) - 1}`)}
                            disabled={Number(id) <= 1}
                            className="flex-1 bg-zinc-900/50 border border-zinc-800 py-5 rounded-2xl text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-white transition flex items-center justify-center gap-2 disabled:opacity-20 cursor-pointer"
                        >
                            Previous
                        </button>

                        <button
                            onClick={() => navigate(`/productDetails/${Number(id) + 1}`)}
                            className="flex-1 bg-[#d4ff00] text-black py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Next

                        </button>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;