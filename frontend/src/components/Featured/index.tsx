import Image from "next/image";

export default function Featured() {
  return (
    <div className="flex justify-center bg-zinc-800 text-white py-[50px]">
      {/* The div below is the component center */}
      <div className="Center">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h1>Pro anywhere</h1>
            <p className="text-[#aaa] mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
              tenetur eaque nam, sint necessitatibus eius quia sapiente.
              Sapiente id voluptates qui ipsam, voluptatibus quibusdam porro
              iste quisquam cum eligendi illum.
            </p>
            <div className="mt-6 gap-2 flex">
              <button className="OutlineBtn">Read more</button>
              <button className="PrimaryBtn inline-flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 shrink-0"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src="/D_NQ_NP_830299-MLA79635564046_102024-O.webp"
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
