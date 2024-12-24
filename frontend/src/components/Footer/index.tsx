import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#393b38] w-full text-zinc-300 font-light py-8 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 text-sm mt-24">
        <div className="Center flex flex-col">
          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row justify-between gap-24">
            {/* LEFT */}
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8 grow">
              <Link href="/">
                <div className="text-2xl tracking-wide text-white font-semibold">
                  Ecommerce-Shop
                </div>
              </Link>
              <p>
                3252 Winding Way, Central Plaza, Willowbrook, CP 3500,
                Resistencia Chaco, Argentina
              </p>
              <span className="font-semibold">hello@ecommerce.com</span>
              <span className="font-semibold">+1 234 5678912</span>
              <div className="flex gap-6">
                <Image src="/facebook.png" alt="" width={16} height={16} />
                <Image src="/instagram.png" alt="" width={16} height={16} />
                <Image src="/youtube.png" alt="" width={16} height={16} />
                <Image src="/pinterest.png" alt="" width={16} height={16} />
                <Image src="/x.png" alt="" width={16} height={16} />
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8 grow">
              <h1 className="text-lg text-white font-semibold">SUBSCRIBE</h1>
              <p>
                Be the first to get the latest news about trends, promotions and
                much more!
              </p>
              <div className="flex rounded-sm overflow-hidden">
                <input
                  type="text"
                  placeholder="Email address"
                  className="p-4 w-3/4"
                />
                <button className="w-1/4 bg-[#F35C7A] text-white">JOIN</button>
              </div>
              <span className="font-semibold">Secure Payments</span>
              <div className="flex justify-between">
                <Image src="/discover.png" alt="" width={40} height={20} />
                <Image src="/skrill.png" alt="" width={40} height={20} />
                <Image src="/paypal.png" alt="" width={40} height={20} />
                <Image src="/mastercard.png" alt="" width={40} height={20} />
                <Image src="/visa.png" alt="" width={40} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM SECTION */}
      <div className="bg-zinc-900 flex justify-center p-2 flex-col md:flex-row items-center gap-8 text-zinc-300">
        <div className="Center flex justify-between flex-wrap">
          <div className="">© 2024 Ecommerce</div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="font-medium">United States | English</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="font-medium">$ USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
