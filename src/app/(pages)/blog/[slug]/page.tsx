"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation"; // ✅ Import useParams
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useEffect, useState } from "react";

// Image URL builder for Sanity
const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

interface Block {
  _type: "block";
  children: { text: string }[];
}

interface Post {
  _id: string;
  title: string;
  authorName: string;
  publishedAt: string;
  categories: string[];
  body: Block[]; // Block Content type
  slug: { current: string };
  mainImage: SanityImageSource; // Use SanityImageSource type here
}

type RecentPost = {
  title: string;
  slug: { current: string };
  mainImage: SanityImageSource; // Use SanityImageSource type here
};

async function getPost(slug: string): Promise<{ post: Post; recentPosts: RecentPost[] } | null> {
  if (!slug) return null;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "authorName": author->name,
    publishedAt,
    "categories": categories[]->title,
    body,
    mainImage
  }`;
  const post = await client.fetch(query, { slug });

  if (!post) return null;

  const recentQuery = `*[_type == "post"] | order(publishedAt desc) [0..3]{
    title,
    slug,
    mainImage
  }`;
  const recentPosts = await client.fetch(recentQuery);

  return { post, recentPosts };
}

const SingleBlog = () => {
  const { slug } = useParams(); // ✅ Get slug from useParams
  const [data, setData] = useState<{ post: Post; recentPosts: RecentPost[] } | null>(null);

  useEffect(() => {
    if (slug) {
      getPost(slug as string).then(setData);
    }
  }, [slug]);

  if (!data) {
    notFound();
  }

  const { post, recentPosts } = data;

  return (
    <div className="w-11/12 mx-auto">
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage)?.width(800)?.height(500)?.url() || "/default-image.jpg"}
          alt={post.title}
          className="w-full h-96 object-cover mb-12 rounded-lg mt-6 shadow-lg"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-none rounded-xl overflow-hidden bg-white">
            <CardContent>
              <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
              <p className="text-gray-600">By: {post.authorName}</p>
              <p className="text-gray-500 mb-4">
                Published on: {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <PortableText value={post.body} />
              {post.categories?.length > 0 && (
                <p className="mt-4 text-sm text-blue-500">{post.categories.join(", ")}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-8 space-y-8 bg-black text-gray-200 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
          {recentPosts.map((recentPost) => (
            <Card
              key={recentPost.slug.current}
              className="shadow-none rounded-lg flex items-center bg-black text-gray-200 border border-[#c6ff41]"
            >
              {recentPost.mainImage && (
                <img
                  src={urlFor(recentPost.mainImage)?.width(150)?.height(150)?.url() || "/default-image.jpg"}
                  alt={recentPost.title}
                  className="w-36 h-36 object-cover rounded-l-lg"
                />
              )}
              <CardContent className="p-4">
                <CardTitle className="my-2">{recentPost.title}</CardTitle>
                <CardFooter className="p-0">
                  <a
                    href={`/blog/${recentPost.slug.current}`}
                    className="text-[#c6ff41] border-b-2 border-[#c6ff41] p-0"
                  >
                    Read More
                  </a>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
