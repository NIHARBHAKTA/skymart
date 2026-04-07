import { useContext, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsCard from "../Components/ProductsCard";
import { Mystore } from "../ContextApi/Context";

const Shop = () => {
  const { productsData } = useContext(Mystore);
  const [searchParams, setSearchParams] = useSearchParams();

  // States for local filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");

  // 1. Category from URL 
  const categoryFilter = searchParams.get("category") || "All Categories";

  // 2. Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    // Filter by Category
    if (categoryFilter !== "All Categories") {
      list = list.filter((p) => p.category === categoryFilter);
    }

    // Filter by Search 
    if (searchTerm) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort Logic
    if (sortBy === "Price: Low to High") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [productsData, categoryFilter, searchTerm, sortBy]);

  // categories for the dropdown
  const categories = ["All Categories", ...new Set(productsData.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#bfff00] selection:text-black">

      {/* --- Title Section --- */}
      <header className="max-w-[1600px] mx-auto px-10 mt-14 mb-10">
        <h1 className="text-5xl font-extrabold mb-3 tracking-tight capitalize">
          {categoryFilter === "All Categories" ? "All Products" : categoryFilter}
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          {filteredProducts.length} products found
        </p>
      </header>

      {/* --- Filter Bar --- */}
      <section className="max-w-[1600px] mx-auto px-10 mb-12">
        <div className="flex flex-col md:flex-row gap-4 bg-[#141414] p-5 rounded-2xl border border-gray-800/50 shadow-2xl">

          {/* Search Input */}
          <div className="relative flex-grow">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#bfff00] transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setSearchParams({ category: e.target.value })}
              className="appearance-none bg-[#0a0a0a] border border-gray-800 rounded-xl py-3.5 pl-5 pr-12 focus:outline-none focus:border-[#bfff00] cursor-pointer min-w-[180px] capitalize"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#0a0a0a] border border-gray-800 rounded-xl py-3.5 pl-5 pr-12 focus:outline-none focus:border-[#bfff00] cursor-pointer min-w-[180px]"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
          </div>

        </div>
      </section>

      {/* --- Product Grid --- */}
      <main className="max-w-[1600px] mx-auto px-10 pb-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7">
            {filteredProducts.map((elem) => (
              <ProductsCard data={elem} key={elem.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-600 font-bold italic">No products found matching your criteria.</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;