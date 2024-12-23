import ProductDescription from "@/components/ProductDescription";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

async function getServerSideProps({ _id }: { _id: string }) {
  await mongooseConnect();
  const product = await Product.findById(_id);
  return JSON.parse(JSON.stringify(product));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const _id = (await params).id;
  const product = await getServerSideProps({ _id });
  return (
    <div className="flex justify-center">
      <div className="Center">
        <div className="grid grid-cols-2 gap-8 mt-10">
          <div className="bg-[#fff] rounded-md p-8 shadow-md relative">
            <ProductImages images={product.images} />
          </div>
          <div>
            {"use client"}
            <ProductDescription product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
