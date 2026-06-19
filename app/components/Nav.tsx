import Link from "next/link";
import { AnimatedThemeToggler } from "@/app/components/AnimatedThemeToggler";

const Nav = () => {
  return (
    <nav className="flex justify-between w-full">
      <Link href="/">
        <h2 className="font-bold">AI Text Editor</h2>
      </Link>
      <section className="">
        <ul className="flex gap-2 items-center justify-center text-center cursor-pointer ">
          <li className="hover:opacity-80">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:opacity-80">
            <Link href="/terms">Terms</Link>
          </li>
          <li className="hover:opacity-80">
            <Link href="/privacy">Privacy</Link>
          </li>
          <AnimatedThemeToggler className="hover:opacity-80 cursor-pointer" />
        </ul>
      </section>
    </nav>
  );
};

export default Nav;
