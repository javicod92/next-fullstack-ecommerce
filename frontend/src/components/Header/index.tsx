import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-zinc-800 text-white flex justify-center">
      <div className="max-w-[800px] grow">
        <div className="flex justify-between p-5">
          <Link href={"/"}>Ecommerce</Link>
          <nav className="text-gray-300 flex gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>All products</Link>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/account"}>Account</Link>
            <Link href={"/cart"}>Cart (0)</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
