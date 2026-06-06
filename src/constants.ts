import type { Category } from "./types";

import fruitsVegImg from "./assets/images/fruits-veg.jpg";
import dairyImg from "./assets/images/dairy.jpg";
import meatImg from "./assets/images/meat.jpg";
import bakeryImg from "./assets/images/bakery.jpg";
import beveragesImg from "./assets/images/beverages.jpg";

export const CATEGORIES: (Category & { defaultImage: string })[] = [
  {
    id: "fruits-veg",
    title: "Fruits & Vegetables",
    defaultImage: fruitsVegImg,
  },
  { id: "dairy", title: "Dairy Products", defaultImage: dairyImg },
  { id: "meat", title: "Meat & Poultry", defaultImage: meatImg },
  { id: "bakery", title: "Bakery & Sweets", defaultImage: bakeryImg },
  { id: "beverages", title: "Beverages", defaultImage: beveragesImg },
];

export const PRODUCT_IMAGE_PLACEHOLDER =
  "https://imgx.parapuan.co/crop/0x0:0x0/945x630/photo/2026/03/30/misterijpg-20260330113158.jpg";
