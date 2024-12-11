export default function NewProducts({
  products,
}: {
  products: Array<Record<string, string>>;
}) {
  return (
    <div className="flex justify-center">
      <div className="Center">
        <div className="grid grid-cols-3">
          {products?.map((product) => (
            <div key={product._id}>{product.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
