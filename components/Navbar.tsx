import { navLinks } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <Image
          src="/assets/images/apple.svg"
          alt="Apple-Logo"
          width={15}
          height={15}
        />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLinks.map((link, idx) => (
            <Link
              href="/"
              key={idx}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {link}
            </Link>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image
            src="/assets/images/search.svg"
            alt="Search"
            width={20}
            height={20}
          />
          <Image
            src="/assets/images/bag.svg"
            alt="Bag"
            width={20}
            height={20}
          />
        </div>
      </nav>
    </header>
  );
};
