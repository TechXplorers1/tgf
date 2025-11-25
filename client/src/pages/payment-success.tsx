// client/src/pages/payment-success.tsx

import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="max-w-md w-full bg-background border rounded-lg p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
        <p className="text-muted-foreground">
          Thank you for your support. Your payment has been processed
          successfully.
        </p>

        <div className="flex gap-3 justify-center mt-4">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/programs">
            <Button variant="outline">View Programs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
