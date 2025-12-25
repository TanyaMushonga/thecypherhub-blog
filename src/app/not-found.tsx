import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have this component based on previous context

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
      <div className="flex flex-col items-center max-w-md w-full space-y-6">
        {/* Icon with a subtle glow effect */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 mb-4">
          <TriangleAlert className="text-5xl text-destructive" />
          <div className="absolute inset-0 rounded-full bg-destructive/20 blur-xl"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-slate-200">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn&apos;t find the resource you were looking for. It might
            have been removed or renamed.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link href="/" prefetch={false}>
            <Button size="lg" className="font-semibold px-8">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
