import React, { useContext, useEffect, useState } from 'react';
import { Mystore } from '../ContextApi/Context';
import { useNavigate } from 'react-router-dom';

const NewArrivals = () => {
    const { productsData,addToCart } = useContext(Mystore);
    const [arrivals, setArrivals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        if (productsData.length > 0) {
            let latest = [...productsData].reverse().slice(0, 5);
            setArrivals(latest);
        }
    }, [productsData]);

    return (
        <div className="bg-white rounded-[32px] p-8 text-black shadow-xl h-full border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-lime-500">⚡</span> New Arrivals
                </h3>
                <span
                    onClick={() => navigate('/shop')}
                    className="text-[#d4ff00] text-[10px] font-black uppercase tracking-tighter cursor-pointer border-b-2 border-[#d4ff00]"
                >
                    Explore all →
                </span>
            </div>

            <div className="space-y-3">
                {arrivals.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => navigate(`/productDetails/${p.id}`)}
                        className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 hover:bg-lime-50/50 p-2 rounded-xl transition cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner p-1 group-hover:scale-110 transition-transform">
                                <img src={p.thumbnail} alt={p.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 font-bold uppercase truncate w-24">
                                    {p.category}
                                </span>
                                <span className="font-bold text-[#d4ff00] text-lg tracking-tight group-hover:text-lime-600 transition-colors">
                                    ${p.price}
                                </span>
                            </div>
                        </div>

                        {/* Grouped Actions: New Badge and Cart Logo side-by-side */}
                        <div className="flex items-center gap-2">
                            {/* New Badge */}
                            <div className="bg-lime-500 text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-sm shadow-lime-200">
                                New
                            </div>

                            {/* Cart Logo */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(p); 
                                }}
                                className="flex items-center justify-center bg-[#d4ff00]/10 hover:bg-[#d4ff00] p-1.5 rounded-lg transition-colors group/cart cursor-pointer border border-[#d4ff00]/20"
                            >
                                <span className="text-[10px] group-hover/cart:scale-110 transition-transform">
                                    🛒
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading State */}
                {arrivals.length === 0 && (
                    <div className="space-y-4 py-4">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-14 bg-gray-100 animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewArrivals;