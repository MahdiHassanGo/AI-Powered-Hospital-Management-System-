import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black bg-white text-black">
      <div className="mx-auto max-w-[1280px] px-6 py-12 sm:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.12em] uppercase text-black"
          >
            Bangladesh Specialized Hospital
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-xs tracking-[0.12em] uppercase text-black/70">
            <Link
              href="/doctors"
              className="transition-colors hover:text-black"
            >
              Consultants
            </Link>
            <Link
              href="/about-us"
              className="transition-colors hover:text-black"
            >
              About
            </Link>
            <a href="tel:10633" className="transition-colors hover:text-black">
              Hotline 10633
            </a>
            <Link
              href="/about-us"
              className="transition-colors hover:text-black"
            >
              Terms &amp; Support
            </Link>
            <Link
              href="/about-us"
              className="transition-colors hover:text-black"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-6 text-[10px] tracking-[0.12em] uppercase text-black/50">
          &copy; {new Date().getFullYear()} Bangladesh Specialized Hospital. 21
          Shyamoli, Mirpur Road, Dhaka-1207. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
