import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mystore } from '../ContextApi/Context';

const ProductsCard = ({ data }) => {

  const navigate = useNavigate();
  const { addToCart, cart } = useContext(Mystore)
  const { title, category, price, rating, thumbnail, stock, id } = data;

  // To check if this specific product is already in the cart
  const isAdded = cart.some((item) => item.id === id);

  return (
    <div
      className="group bg-[#141414] rounded-[2.5rem] overflow-hidden flex flex-col border border-gray-900 hover:border-gray-700 hover:translate-y-[-4px] transition-all duration-300 shadow-xl cursor-pointer"
      onClick={() => navigate(`/productDetails/${id}`)}
    >
      {/* Image Section */}
      <div className="relative bg-white aspect-[4/3] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <span className="absolute top-4 left-4 z-10 bg-[#4a4a4a]/90 text-white text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-widest backdrop-blur-sm">
          {category}
        </span>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain p-4 drop-shadow-2xl"
        />
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-gray-500 text-[11px] mb-1 font-bold uppercase tracking-[0.15em]">
          {category}
        </span>

        <h3 className="font-bold text-lg leading-tight mb-3 min-h-[3.5rem] line-clamp-2 text-gray-100">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 mb-8">
          <div className="flex text-[#FFB800] text-sm">
            {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
          </div>
          <span className="text-gray-500 text-xs font-bold">({stock} in stock)</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-2xl font-black text-[#bfff00] tracking-tighter">
            ${price}
          </span>

          {/* 3. Conditional Button Styling and Text */}
          <button
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase flex items-center gap-2 transition-all shadow-lg active:scale-95 
    ${isAdded
                ? "bg-green-500 text-white shadow-green-500/20" // Green background for 'Added'
                : "bg-[#bfff00] text-black hover:bg-white shadow-[#bfff00]/10" // Original Lime for 'Add'
              }`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(data);
            }}
          >
            {isAdded ? (
              // Checkmark Icon
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              // Plus Icon
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
            {isAdded ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;