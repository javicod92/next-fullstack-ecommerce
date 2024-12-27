import Image from "next/image";

export default function Offers() {
  return (
    <div className="hidden md:block">
      <Image
        src="/OfferCard.webp"
        width={1920}
        height={256}
        alt="Offers"
        className="w-full"
        priority={true}
      />
    </div>
  );
}
