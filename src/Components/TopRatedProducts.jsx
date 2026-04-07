import { useContext, useEffect, useState } from 'react';
import { Mystore } from '../ContextApi/Context';
import { useNavigate } from 'react-router-dom';

const TopRatedProducts = () => {

    const { productsData, addToCart } = useContext(Mystore);
    const [ratedProducts, setRatedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (productsData.length > 0) {
            let highRated = productsData.filter((product) => product.rating > 4.6);
            setRatedProducts(highRated.slice(0, 5));
        }
    }, [productsData]);


    return (
        <div className="bg-white rounded-[32px] p-8 text-black shadow-xl h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-yellow-400">⭐</span> Top Rated
                </h3>
                <span
                    onClick={() => navigate('/shop')}
                    className="text-[#d4ff00] text-[10px] font-black uppercase tracking-tighter cursor-pointer border-b-2 border-[#d4ff00]"
                >
                    See all →
                </span>
            </div>

            <div className="space-y-3">
                {ratedProducts.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => navigate(`/productDetails/${p.id}`)}
                        className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 hover:bg-gray-50 p-2 rounded-xl transition cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner p-1">
                                <img src={p.thumbnail} alt={p.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 font-bold uppercase truncate w-24">
                                    {p.title}
                                </span>
                                <span className="font-bold text-[#d4ff00] text-xl tracking-tight">
                                    ${p.price}
                                </span>
                            </div>
                        </div>


                        <div className="flex items-center gap-2">

                            {/* Rating Badge */}
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                <span className="text-yellow-600 text-[10px] font-bold">{p.rating}</span>
                                <span className="text-yellow-500 text-[8px]">★</span>
                            </div>

                            {/* Cart Icon */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(p);
                                }}
                                className="flex items-center justify-center bg-[#d4ff00]/10 hover:bg-[#d4ff00] p-1.5 rounded-lg transition-colors group/cart cursor-pointer border border-[#d4ff00]/20"
                            >
                                <span className="text-[10px] group-hover/cart:scale-110 transition-transform">🛒</span>

                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopRatedProducts;