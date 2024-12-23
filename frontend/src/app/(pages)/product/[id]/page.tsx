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
  console.log(product);
  return (
    <div className="flex justify-center">
      <div className="Center">
        <div className="grid grid-cols-2 gap-8 mt-10">
          <div className="bg-[#fff] rounded-md p-8 shadow-md relative">
            <ProductImages images={product.images} />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">{product.title}</h1>
            <p className="font-normal">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
