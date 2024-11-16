import { signIn } from "@/auth";

export function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" className="bg-white p-2 px-4 rounded-lg">
        Login with Google
      </button>
    </form>
  );
}
