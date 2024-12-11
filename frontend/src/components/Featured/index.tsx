import Image from "next/image";
import Link from "next/link";

export default function Featured({
  product,
}: {
  product: Record<string, string>;
}) {
  return (
    <div className="flex justify-center bg-zinc-900 text-white py-[50px]">
      {/* The div below is the component center */}
      <div className="Center">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h1>{product?.title}</h1>
            <p className="text-[#aaa] mt-4">{product?.description}</p>
            <div className="mt-6 gap-2 flex">
              <Link href={"/products/" + product._id} className="OutlineBtn">
                Read more
              </Link>
              <Link
                href={"/"}
                className="PrimaryBtn inline-flex gap-1 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 shrink-0"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                Add to cart
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src={product?.images[7]}
              alt="Product"
              width={500}
              height={500}
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
TODO: In this page, i can show different featured products from my database.
To do this, i should create another page in my backend and add more products,
then, create an carousel that contains all my products like Mercado Libre.
*/
