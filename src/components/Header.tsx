"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"; // Shadcn button component
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Sanity client

interface Category {
  title: string;
}

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{title}`;  // Query directly without using groq
      const categoryData: Category[] = await client.fetch(query);
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const linkClass = (path: string) =>
    `text-gray-700 hover:text-black ${
      pathname === path ? "border-b-2 border-[#c6ff41]" : ""
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/blogs" className={linkClass("/blogs")}>My Blogs</Link>

          <div className="relative">
            <button
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(true)}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              Categories
            </button>
            {dropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {categories.map((category) => (
                  <Link
                    key={category.title}
                    href={`/categories/${category.title}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about-us" className={linkClass("/about-us")}>About</Link>
          <Link href="/contact-us" className={linkClass("/contact-us")}>Contact</Link>
        </div>
        <Button className="md:hidden">Menu</Button>
      </div>
    </nav>
  );
};

export default Header;
