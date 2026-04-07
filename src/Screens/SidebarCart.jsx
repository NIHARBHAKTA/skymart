import { useContext } from "react";
import { Mystore } from "../ContextApi/Context";

const SidebarCart = ({ setShowToast }) => {


  const { setIsCartOpen, cart, removeFromCart, addToCart, decrementQuantity, totalPrice, clearCart } = useContext(Mystore);


  const handleCheckout = () => {
    if (cart.length > 0) {
      clearCart();           // 1. Empty the bag
      setIsCartOpen(false);  // 2. Close the drawer
      setShowToast(true);    // 3. Shows the "Order Placed" toaster
    }
  };


  return (

    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Dark Overlay/Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Cart Sidebar Panel */}
      <div className="relative w-full max-w-[400px] h-full bg-[#0a0a0a] border-l border-zinc-800 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#d4ff00]/10 rounded-lg">
              <span className="text-[#d4ff00] text-xl">👜</span>
            </div>
            <h2 className="text-xl font-bold text-white">Cart</h2>
            <span className="bg-[#d4ff00]/20 text-[#d4ff00] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {cart.length} Items
            </span>
          </div>
          <button className="text-zinc-500 hover:text-white transition-colors text-2xl font-light" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="bg-[#111] border border-zinc-800 rounded-[24px] p-4 flex gap-4 hover:border-zinc-700 transition-all">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-2 shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-zinc-100 mb-1 line-clamp-1">{item.title}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[#d4ff00] font-black text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                    <span className="text-[10px] text-zinc-600 font-bold">${item.price} each</span>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-black border border-zinc-800 rounded-lg px-2 py-1 gap-4">

                      {/* addToCart logic / create a decrement logic in context */}

                      <button className="text-zinc-500 hover:text-[#d4ff00] font-bold text-lg"
                        onClick={() => decrementQuantity(item.id)}>
                        -
                      </button>

                      <span className="text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="text-zinc-500 hover:text-[#d4ff00] font-bold text-lg"
                      >
                        +
                      </button>

                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-700 hover:text-red-500 transition-colors p-1"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
              <span className="text-6xl italic opacity-20">SkyMart</span>
              <p className="text-sm font-medium uppercase tracking-widest">Your bag is empty</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#111]/50 border-t border-zinc-900 space-y-6">

          <div className="flex items-center justify-between">
            <span className="text-zinc-500 font-medium uppercase text-xs tracking-widest">Total</span>
            <span className="text-white text-3xl font-black tracking-tighter">
              ${totalPrice}</span>
          </div>

          <button className="w-full bg-[#d4ff00] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(212,255,0,0.15)] italic cursor-pointer"
            onClick={handleCheckout}
          >
            Checkout 
          </button>

          <button className="w-full text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            onClick={() => {
              clearCart()
              
            }}
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default SidebarCart;