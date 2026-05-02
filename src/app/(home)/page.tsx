import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

function OrbitIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        transform="rotate(-35 50 50)"
      />
      <circle cx="14" cy="37" r="6" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <h1 className="mb-4 flex items-center justify-center gap-2 text-4xl font-bold sm:gap-3 sm:text-5xl md:text-6xl">
        <span className="bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
          Space
        </span>
        <OrbitIcon className="h-10 w-10 text-neutral-300 sm:h-12 sm:w-12 md:h-14 md:w-14" />
      </h1>

      <p className="mx-auto mb-8 max-w-xs px-2 text-lg text-neutral-400 sm:max-w-md sm:text-xl md:text-2xl">
        Secure, fast and easy file storage for the modern web
      </p>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a href="https://amusing-tarpon-96.accounts.dev/sign-in">
          <Button
            size="lg"
            className="w-44 border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700 sm:w-40"
          >
            Get Started
          </Button>
        </a>

        <form
          action={async () => {
            "use server";
            return redirect("/drive");
          }}
        >
          <Button
            size="lg"
            type="submit"
            className="w-44 border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700 sm:w-40"
          >
            Try it Now
          </Button>
        </form>
      </div>

      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} Space. All rights reserved.
      </footer>
    </>
  );
}
