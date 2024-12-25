import Image from "next/image";

export default function Ofers() {
  return (
    <div className="bg-[#e1ff00] flex justify-center backdrop:blur-md">
      {/* CAMPAIGN */}
      <div className="Center hidden px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700 text-center">
            Grab up to 50% off on
            <br />
            Selected Product
          </h1>
          <button className="rounded-3xl bg-[#F35C7A] text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3 ">
          <Image
            src="/woman.png"
            alt="Product Image"
            width={255}
            height={255}
            className="max-w-full max-h-full object-contain "
          />
        </div>
      </div>
    </div>
  );
}
