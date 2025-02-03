import { client } from "@/sanity/lib/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  mainImage: {
    asset: {
      url: string;
    };
  };
}


const Blogs = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    "authorName": author->name,
    publishedAt,
    "categories": categories[]->title,
    body,
    mainImage,
    description
  }`;

  const posts: Post[] = await client.fetch(query);

  const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0..3]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage
  }`;
  const recentPosts: Post[] = await client.fetch(recentPostsQuery);

  const categoryQuery = `*[_type == "category"]{
    _id,
    title
  }`;

  const categories: { _id: string; title: string }[] =
    await client.fetch(categoryQuery);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 w-11/12 mx-auto">
      {/* Main Blog Content */}
      <div className="col-span-1 md:col-span-2 space-y-8">
        {posts.map((blog) => (
        <Link    key={blog._id} href={`/categories/${encodeURIComponent(blog.title)}`}
         >
          <Card
          
            className="mb-10 rounded-xl overflow-hidden border border-[#c6ff41] shadow-none"
          >
            <Image
              className="w-full h-auto object-cover"
              src={
                urlFor(blog.mainImage).width(800).height(500).url() ||
                "/default-image.jpg"
              }
              alt={blog.title}
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="text-lg font-bold mt-4">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {blog.body && blog.body[0]?.children[0]?.text.slice(0, 100)}...
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${blog.slug.current}`}>
                <Button className="mt-4">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </Link>
        ))}
      </div>

      {/* Sidebar Content */}
      <div className="text-black space-y-8">
        <div className="bg-black p-4 rounded-lg border border-[#c6ff41] ">
          <h4 className="text-white text-xl font-semibold mb-4">Categories</h4>
          <div className="flex flex-col space-y-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${encodeURIComponent(category.title)}`}
              >
                <p className="text-gray-400 hover:text-[#c6ff41] transition-colors cursor-pointer">
                  {category.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-black p-4 rounded-lg border border-[#c6ff41] ">
          <h4 className="text-white text-xl font-semibold mb-4">Recent Posts</h4>
          <div className="space-y-4">
            {recentPosts.map((recentPost) => (
          <Link  href={`/blog/${recentPost.slug.current}`}
          key={recentPost.slug.current} >
              <Card
                className="flex my-8 rounded-lg overflow-hidden border border-[#c6ff41] bg-black text-gray-200 h-fit"
              >
                <Image
                  src={
                    urlFor(recentPost.mainImage).width(150).height(150).url() ||
                    "/default-image.jpg"
                  }
                  alt={recentPost.title}
                  width={150}
                  height={150}
                  className="w-36 h-40 object-cover"
                />
                <CardContent className="px-4 pt-4 pb-0">
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(recentPost.publishedAt).toLocaleDateString()}
                  </p>
                  <CardTitle className="text-sm font-semibold mb-1">
                    {recentPost.title}
                  </CardTitle>
                  <CardFooter className="p-0 pt-3" >
                    <Link
                      href={`/blog/${recentPost.slug.current}`}
                      className="text-[#c6ff41] transition-colors border-b border-[#c6ff41]"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </CardContent>
              </Card>
          </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
