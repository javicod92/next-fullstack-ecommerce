import ProductBox from "../ProductBox";

type ProductsType = {
  products: Array<Record<string, string>>;
  title?: string;
  titleStyles?: string | "black";
};

export default function NewProducts({
  products,
  title,
  titleStyles,
}: ProductsType) {
  return (
    <div className="flex justify-center">
      <div className="Center">
        <h2 className={titleStyles}>{title}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 pt-5">
          {products?.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
