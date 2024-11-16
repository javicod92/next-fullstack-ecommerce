import { auth } from "@/auth";
import { LoginButton } from "@/components/AuthButtons";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return (
      <div className="bg-zinc-900 w-screen h-screen flex items-center justify-center">
        <LoginButton />
      </div>
    );
  }

  return <div className="">Logged in</div>;
}
