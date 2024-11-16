import Link from "next/link";

export default function Products() {
  return (
    <div className="">
      <Link
        href="/products/new"
        className="flex gap-1 bg-zinc-400 w-max py-1 px-2 rounded-md shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Add new product
      </Link>
    </div>
  );
}
