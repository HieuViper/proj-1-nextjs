import { ProductCard } from "@/app/components/ProductCard";
import axios from "axios";
import Link from "next/link";
async function loadProduct() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}

async function ProductsPage() {
  const products = await loadProduct();
  console.log("🚀 ~ file: page.js:11 ~ ProductsPage ~ products:", products);

  if (products.length === 0) return <h1 className="text-white">No Products</h1>;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      <Link href="/admin/products/add">add new</Link>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;
