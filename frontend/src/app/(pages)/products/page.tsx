import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

// type ProductsType = Array<Record<string, string>>;

async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
  const products = await getServerSideProps();
  return (
    <div className="flex justify-center mt-10">
      <div className="Center">
        <h1 className="font-semibold">All Products</h1>
        <NewProducts products={products} />
      </div>
    </div>
  );
}
