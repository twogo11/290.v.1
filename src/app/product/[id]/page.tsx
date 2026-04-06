"use client";
import React, { use, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Sun, ChevronRight, Plus, Minus, Share2, ShieldCheck, Truck, ArrowRight } from "lucide-react";
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

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allImages = product?.images || [product?.image];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FFC107] selection:text-black font-sans">
      <Navigation socialLinks={[{ name: "IG", icon: <Sun size={18} />, url: "#" }]} />

      <main className="max-w-[1400px] mx-auto px-6 pt-32 pb-32">
        {/* Дээд хэсэг: Буцах товч */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gray-500 hover:text-[#FFC107] transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Буцах
          </button>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-600">
            Нүүр / Цуглуулга / <span className="text-[#FFC107] italic">Дэлгэрэнгүй</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* --- ЗҮҮН ТАЛ: ХӨНДЛӨН СЛАЙДЕР (Зургийн хэмжээг багасгасан) --- */}
          <div className="relative group">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 scroll-smooth"
              style={{ scrollbarWidth: 'none' }}
            >
              {allImages.map((img, index) => (
                <div key={index} className="min-w-full snap-center aspect-[4/5] overflow-hidden bg-[#0A0A0A] relative">
                  <motion.img
                    src={img}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full object-cover"
                    alt={`Бүтээгдэхүүн ${index + 1}`}
                  />
                  {/* Sunflower Overlay Detail */}
                  <div className="absolute bottom-6 right-6 mix-blend-difference opacity-50">
                    <Sun className="text-[#FFC107] animate-spin-slow" size={30} strokeWidth={1} />
                  </div>
                </div>
              ))}
            </div>

            {/* Слайдерын удирдлага */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
              <button 
                onClick={() => scroll("left")}
                className="w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/10 pointer-events-auto hover:bg-[#FFC107] hover:text-black transition-all"
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/10 pointer-events-auto hover:bg-[#FFC107] hover:text-black transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            
            {/* Слайдерын индикатор */}
            <div className="flex justify-center gap-2 mt-6">
              {allImages.map((_, i) => (
                <div key={i} className="w-12 h-[1px] bg-white/10 overflow-hidden">
                   <div className="h-full bg-[#FFC107] w-0 group-hover:w-full transition-all duration-1000" />
                </div>
              ))}
            </div>
          </div>

          {/* --- БАРУУН ТАЛ: МЭДЭЭЛЭЛ --- */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#FFC107] text-[10px] font-bold uppercase tracking-[0.4em]">Шинэ цуглуулга</span>
                <div className="h-[1px] w-10 bg-[#FFC107]/30"></div>
              </div>
              
              <h1 className="text-5xl font-light tracking-tighter uppercase leading-none">
                {product.name}
              </h1>
              <p className="text-2xl font-mono text-white/90 tracking-tight italic">
                {product.price}
              </p>
            </div>

            {/* Сонголтууд */}
            <div className="space-y-8">
              {/* Хэмжээ сонгох */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
                  <span>Хэмжээ сонгох</span>
                  <button className="underline hover:text-[#FFC107]">Хэмжээний заавар</button>
                </div>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center text-[11px] transition-all duration-500 ${
                        selectedSize === size
                          ? "bg-[#FFC107] text-black font-bold shadow-[0_0_20px_rgba(255,193,7,0.3)]"
                          : "border border-white/5 hover:border-[#FFC107]/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Тоо ширхэг */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Тоо ширхэг</span>
                <div className="flex items-center w-32 border border-white/10">
                    <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="flex-1 h-12 flex items-center justify-center hover:text-[#FFC107]"><Minus size={14}/></button>
                    <span className="flex-1 text-center text-xs font-mono">{quantity}</span>
                    <button onClick={() => setQuantity(quantity+1)} className="flex-1 h-12 flex items-center justify-center hover:text-[#FFC107]"><Plus size={14}/></button>
                </div>
              </div>
            </div>

            {/* Үндсэн товчлуурууд */}
            <div className="space-y-3 pt-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black py-6 font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#FFC107] transition-colors"
              >
                <ShoppingBag size={18} />
                Сагсанд хийх
              </motion.button>
              
              <button className="w-full border border-white/10 py-6 font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
                <Share2 size={16} />
                Хуваалцах
              </button>
            </div>

            {/* Дэлгэрэнгүй мэдээлэл (Accordions) */}
            <div className="pt-10 border-t border-white/5 space-y-2">
               <DetailItem title="Бүтээгдэхүүний түүх">
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    {product.description || "290 брэндийн энэхүү загвар нь эрх чөлөө, бүтээлч байдлыг бэлэгдэнэ. Наранцэцэг бүхий гар хийцийн хээ нь загвар бүрийг цор ганц болгодог. Улаанбаатар хотод тусгайлан урлав."}
                  </p>
               </DetailItem>
               
               <DetailItem title="Материал & Арчилгаа">
                  <p className="text-gray-400 text-xs leading-relaxed">
                    • 100% Хүнд жингийн даавуу (400GSM)<br/>
                    • Байгальд ээлтэй будаг ашигласан<br/>
                    • Зөвхөн хими цэвэрлэгээ эсвэл гараар угаана
                  </p>
               </DetailItem>

               <DetailItem title="Хүргэлт & Буцаалт">
                  <div className="flex flex-col gap-3 pt-2 text-gray-500 text-[11px]">
                    <div className="flex items-center gap-3">
                        <Truck size={14} className="text-[#FFC107]" />
                        <span>24-48 цагийн дотор хүргэгдэнэ</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={14} className="text-[#FFC107]" />
                        <span>14 хоногийн дотор буцаалт хийх боломжтой</span>
                    </div>
                  </div>
               </DetailItem>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const DetailItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 last:border-0 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-300 hover:text-white transition-colors"
            >
                {title}
                <Plus size={12} className={`transition-transform duration-500 ${isOpen ? "rotate-45 text-[#FFC107]" : ""}`} />
            </button>
            <motion.div 
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <div className="pb-6">{children}</div>
            </motion.div>
        </div>
    )
}

export default ProductDetailPage;