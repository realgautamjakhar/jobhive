import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import LinkIcon from "../button/LinkIcon";
import SecondaryButton from "../button/SecondaryButton";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className=" py-4">
      <nav className=" mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className=" group flex items-center gap-2 rounded-full  text-gray-500 transition-all duration-300 ease-in-out hover:text-accent-400"
        >
          <Image
            loading="lazy"
            src="/assets/logo/brandLogo.svg"
            alt="brand logo"
            width={40}
            height={50}
            className="aspect-square object-contain"
          />
          <div className=" relative flex">
            <h2 className=" relative text-xl font-medium  tracking-wide">
              JOB HiVE
            </h2>
            <Image
              loading="lazy"
              src="/assets/logo/hexagon.svg"
              alt="brand logo"
              width={15}
              height={15}
              className="absolute -top-2 -right-4 aspect-square object-contain duration-300 ease-in-out group-hover:rotate-180"
            />
          </div>
        </Link>
        <ul className=" flex items-center gap-2">
          {session?.user ? (
            <>
              <li className="  hidden items-center gap-2 md:flex">
                <Image
                  src={session?.user?.image || ""}
                  alt="user avatar"
                  width={25}
                  height={25}
                  className=" rounded-full"
                />
                <p className=" hidden text-xs  hover:text-accent-500 md:block">
                  {session?.user?.name}
                </p>
              </li>
              {session?.user.isAdmin && (
                <li className=" flex items-center gap-2">
                  <Link href="/admin">Admin</Link>
                </li>
              )}
              {!session?.user.isAdmin && (
                <LinkIcon
                  title="List Job"
                  icon={BiAddToQueue}
                  href="/list/job"
                />
              )}
              <li>
                <SecondaryButton
                  className=" text-gray-700"
                  onClick={() => void signOut()}
                >
                  Log Out
                </SecondaryButton>
              </li>
            </>
          ) : (
            <li>
              <SecondaryButton
                className=" rounded-full  bg-accentGradient py-2 px-4 text-white shadow-xl shadow-accent-500/20"
                onClick={() => void signIn("google")}
              >
                Sign In
              </SecondaryButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
