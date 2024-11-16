import { signOut } from "@/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="bg-white p-2 px-4 rounded-lg">
        Sign Out
      </button>
    </form>
  );
}
