import { ProductPage } from "@/components/features/products/product-page";
import { PRODUCT_MAP } from "@/lib/products-data";

export default function Aelock() {
  return <ProductPage product={PRODUCT_MAP.aelock} />;
}