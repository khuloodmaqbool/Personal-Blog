"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the TypeScript interfaces properly

interface Block {
  _type: "block";
  children: { text: string }[];
}

interface Post {
  _id: string;
  title: string;
  body: Block[]; // Block Content type
  slug: { current: string };
  mainImage: {
    asset: {
      url: string;
    };
  };
}

const CategoryPage = () => {
  const pathname = usePathname();
  const title = decodeURIComponent(pathname.split("/").pop() || "");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (title) {
      const fetchData = async () => {
        const query = `*[_type == "post" && "${title}" in categories[]->title]{
          _id,
          title,
          body,
          slug,
          mainImage { asset->{url} }
        }`;
        const data = await client.fetch(query);
        setPosts(data);
      };
      fetchData();
    }
  }, [title]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="font-black text-5xl mb-10 uppercase">{title} Blogs</h1>
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <Card className="bg-black shadow-none hover:transform hover:-translate-y-2 transition-all duration-300 rounded-lg border border-[#c6ff41]">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    className="w-full h-60 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {post.body?.[0]?.children?.[0]?.text
                      ? post.body[0].children[0].text.slice(0, 100) + "..."
                      : "No content available"}
                  </p>
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center">
                  <Button>Read More</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No blogs found for this category.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
