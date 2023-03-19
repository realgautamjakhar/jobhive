import Link from "next/link";
import React from "react";
import type { IconType } from "react-icons";

const LinkIcon = ({
  title,
  icon: Icon,
  href,
}: {
  title: string;
  icon?: IconType;
  href: string;
}) => {
  return (
    <Link
      className=" flex items-center gap-2 rounded-full bg-dark-500 py-2 px-4 text-center text-white"
      title={title}
      href={href}
    >
      <Icon />
      {title}
    </Link>
  );
};

export default LinkIcon;
