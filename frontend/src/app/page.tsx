import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

async function getServerSideProps() {
  const featuredProductId = "6746494304ffa42d29c9cda5";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    newProducts: JSON.parse(JSON.stringify(newProducts)),
  };
}

export default async function HomePage() {
  const productData = await getServerSideProps();
  console.log(productData.newProducts);
  return (
    <div>
      <Featured product={productData.featuredProduct} />
      <NewProducts products={productData.newProducts} />
    </div>
  );
}
