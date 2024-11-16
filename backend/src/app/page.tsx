import { auth } from "@/auth";
import Image from "next/image";

export default async function page() {
  const session = await auth();

  return (
    <div className="flex justify-between items-center">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden items-center border-zinc-400 border-[1px] shadow-sm">
        {session?.user?.image && (
          <Image src={session.user.image} width={48} height={48} alt="" />
        )}
        <span className="px-2">{session?.user?.name}</span>
      </div>
    </div>
  );
}
