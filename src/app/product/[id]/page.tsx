"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Sun, ChevronRight } from "lucide-react";
import { products, Product as ProductType } from "../../../constants/products";
import Navigation from "../../components/Navigation";

interface Product extends ProductType {
  images?: string[];
  description?: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const { id } = use(params);
  const product = products.find((p) => p.id === parseInt(id)) as Product;

  // Олон зураг удирдах State
  const allImages = product?.images || [product?.image];
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#FFC107] selection:text-black">
      <Navigation socialLinks={[{ name: "IG", icon: <Sun size={18} />, url: "#" }]} />

      <main className="max-w-[1400px] mx-auto px-6 pt-32 pb-20">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gray-500 hover:text-[#FFC107] transition-all mb-12"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: THUMBNAILS (1/12 column) --- */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-3">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImg(index)}
                className={`aspect-[3/4] overflow-hidden border transition-all ${
                  activeImg === index ? "border-[#FFC107]" : "border-white/5 opacity-40 hover:opacity-100"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* --- CENTER: MAIN IMAGE (6/12 column) --- */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[3/4] bg-[#0A0A0A] overflow-hidden max-h-[650px] mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={allImages[activeImg]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            
            {/* Mobile Thumbnails */}
            <div className="flex lg:hidden gap-3 mt-4 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveImg(index)}
                  className={`min-w-[80px] aspect-[3/4] border ${activeImg === index ? "border-[#FFC107]" : "border-white/5"}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: INFO (5/12 column) --- */}
          <div className="lg:col-span-5 lg:pl-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-[#FFC107] text-[10px] uppercase tracking-[0.4em] mb-6">
                <span>{product.category}</span>
                <ChevronRight size={10} />
                <span className="text-gray-500">290 Legacy</span>
              </div>

              <h1 className="text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
                {product.name}
              </h1>

              <p className="text-2xl font-mono italic text-white/90 mb-10">{product.price}</p>

              <div className="space-y-12">
                {/* Description */}
                <div className="max-w-md">
                  <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">The Narrative</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {product.description || "Designed for the bold. Featuring signature 290 sunflower motifs and a tailored silhouette."}
                  </p>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Select Size</h3>
                  <div className="flex gap-3">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 flex items-center justify-center text-[11px] font-bold transition-all ${
                          selectedSize === size
                            ? "bg-[#FFC107] text-black"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black py-6 font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#FFC107] transition-colors"
                >
                  <ShoppingBag size={18} />
                  Add to Bag
                </motion.button>

                <div className="pt-10 border-t border-white/5 space-y-4">
                  <details className="group cursor-pointer">
                    <summary className="list-none text-[10px] uppercase tracking-widest flex justify-between items-center text-gray-400 group-hover:text-white">
                      Details & Composition <PlusIcon />
                    </summary>
                    <p className="pt-4 text-xs text-gray-500 leading-relaxed">100% Heavyweight Cotton. Screen-printed in Ulaanbaatar. Dry clean only.</p>
                  </details>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 group-open:rotate-45 transition-transform">
    <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default ProductDetailPage;