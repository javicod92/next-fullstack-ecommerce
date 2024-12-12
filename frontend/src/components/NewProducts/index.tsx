import ProductBox from "../ProductBox";

export default function NewProducts({
  products,
}: {
  products: Array<Record<string, string>>;
}) {
  console.log({ ...products[0] });
  return (
    <div className="flex justify-center">
      <div className="Center">
        <div className="grid grid-cols-4 gap-5 pt-5">
          {products?.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
