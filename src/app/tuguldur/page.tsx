export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;      // Үндсэн зураг (Main thumbnail)
  images?: string[];   // Олон зургууд (Gallery)
  description?: string;
}

export const products: Product[] = [
  { 
    id: 1, 
    name: "Нар Мину / Black", 
    category: "clothes", 
    price: "90,000₮", 
    image: "https://i.pinimg.com/736x/e5/b4/57/e5b45706562a6e13245ee26f94f92f59.jpg",
    images: [
      "https://i.pinimg.com/736x/e5/b4/57/e5b45706562a6e13245ee26f94f92f59.jpg", // Урд тал
      "https://i.pinimg.com/736x/3d/e6/84/3de6845e0f7f2f1bc53674d76ce30750.jpg", // Ар тал
    ],
    description: "290 Studio-ийн 'Legacy' цуглуулгын нэг хэсэг. Наранцэцэг болон минималист хэв маягийг хослуулсан, heavyweight cotton материалтай өндөр зэрэглэлийн фудволк."
  },
  { 
    id: 2, 
    name: "Нар Мину / White", 
    category: "clothes", 
    price: "90,000₮", 
    image: "https://i.pinimg.com/736x/3d/e6/84/3de6845e0f7f2f1bc53674d76ce30750.jpg",
    images: [
      "https://i.pinimg.com/736x/3d/e6/84/3de6845e0f7f2f1bc53674d76ce30750.jpg",
      "https://i.pinimg.com/736x/e5/b4/57/e5b45706562a6e13245ee26f94f92f59.jpg",
    ],
    description: "Signature 290 graphics on premium white fabric. Designed for a relaxed fit and long-lasting durability. Part of the 2026 spring drop."
  }
];