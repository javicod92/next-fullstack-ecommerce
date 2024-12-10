import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function HomePage() {
  const productData = await getServerSideProps();
  return (
    <div>
      <Featured product={productData} />
    </div>
  );
}

async function getServerSideProps() {
  const featuredProduct = "6746494304ffa42d29c9cda5";
  await mongooseConnect();
  const product = await Product.findById(featuredProduct);
  return product;
}
