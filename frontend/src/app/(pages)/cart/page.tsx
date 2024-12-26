import { Suspense } from "react";
import ClientPage from "./ClientPage";

export default function CartPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ClientPage />
    </Suspense>
  );
}
