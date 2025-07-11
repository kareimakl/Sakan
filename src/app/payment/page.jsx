import { Suspense } from "react";
import PaymentContent from "./_PaymentContent";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading payment page...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
