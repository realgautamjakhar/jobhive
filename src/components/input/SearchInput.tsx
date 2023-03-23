"use client";
import { useEffect, useState } from "react";

const SearchInput = ({
  onChange,
  value,
}: {
  onChange: (string) => void;
  value: string;
}) => {
  const [input, setInput] = useState(value ?? "");

  //Debounce in react using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(input);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [input, onChange]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Job Title / Company"
        className={`w-full rounded-md  bg-white py-2 pl-4 text-sm font-normal text-gray-900 ring-1 ring-gray-500 ring-opacity-25 placeholder:text-sm placeholder:text-gray-400  hover:ring-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 dark:text-gray-50 dark:ring-opacity-50`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
