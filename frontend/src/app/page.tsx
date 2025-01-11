import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

async function getServerSideProps() {
  const featuredProductsId = [
    "6746494304ffa42d29c9cda5",
    "67464a7504ffa42d29c9cddd",
    "677012e17867d0ee0abdb35c",
  ];
  await mongooseConnect();
  const featuredProducts = await Product.find({
    _id: { $in: featuredProductsId },
  });
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 16,
  });
  return {
    featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
    newProducts: JSON.parse(JSON.stringify(newProducts)),
  };
}

export default async function HomePage() {
  const productData = await getServerSideProps();
  return (
    <div>
      <div className="absolute top-[64px] left-0 right-0">
        <Featured products={productData.featuredProducts} />
      </div>
      <div className="w-full h-[580px] md:h-[380px]"></div>
      <div>
        <NewProducts
          products={productData.newProducts}
          title="New Arrivals"
          titleStyles="text-white"
        />
      </div>
    </div>
  );
}
