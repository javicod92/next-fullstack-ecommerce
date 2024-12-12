import ProductBox from "../ProductBox";

export default function NewProducts({
  products,
}: {
  products: Array<Record<string, string>>;
}) {
  return (
    <div className="flex justify-center">
      <div className="Center">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 pt-5">
          {products?.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
