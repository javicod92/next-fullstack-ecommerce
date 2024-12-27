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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-youtube"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-at-sign"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                </svg>
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6 grow">
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
                <Image src="/discover.webp" alt="" width={40} height={20} />
                <Image src="/skrill.webp" alt="" width={40} height={20} />
                <Image src="/paypal.webp" alt="" width={40} height={20} />
                <Image src="/mastercard.webp" alt="" width={40} height={20} />
                <Image src="/visa.webp" alt="" width={40} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM SECTION */}
      <div className="bg-zinc-900 text-sm flex justify-center flex-col md:flex-row items-center gap-8 text-zinc-300">
        <div className="Center flex justify-between flex-wrap">
          <div className="">© 2024 Ecommerce</div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="">United States | English</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="">$ USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
