import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component set up with shadcn
import { Button } from "@/components/ui/button";

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

interface Block {
  _type: "block";
  children: { text: string }[];
}

interface BlogPost {
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

const Home = async () => {
  const featuredQuery = `*[_type == "post"] | order(publishedAt desc)[0]{
    title, slug, publishedAt, mainImage,  body
  }`;
  const featuredPost: BlogPost = await client.fetch(featuredQuery);

  const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc)[1..4]{
    title, slug, publishedAt, mainImage
  }`;
  const recentPosts: BlogPost[] = await client.fetch(recentPostsQuery);

  const editorPicksQuery = `*[_type == "post"] | order(publishedAt desc)[0..3]{
    title, slug, publishedAt, mainImage,  body
  }`;
  const editorPicks: BlogPost[] = await client.fetch(editorPicksQuery);

  return (
    <div className="text-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12 bg-black">
        <h1 className="text-9xl text-center font-black tracking-wide uppercase">
          {" "}
          <span className="text-[#c6ff41] font-normal">&#123;</span>DEV
          <span className="text-[#c6ff41] font-normal">&#125;</span> BY{" "}
          <span className="text-[#c6ff41]">KHULOOD</span>
        </h1>
      </div>

      {/* Main Featured Post */}
      <div className="bg-black pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto px-4 bg-black w-11/12 mx-auto">
          {featuredPost ? (
            <div>
              <img
                src={
                  urlFor(featuredPost.mainImage).width(800).height(500).url() ||
                  "/default-image.jpg"
                }
                alt={featuredPost.title}
                className="rounded-lg object-cover"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-400 ">
                  {new Date(featuredPost.publishedAt).toLocaleDateString()}
                </p>
                <h2 className="text-3xl font-bold">{featuredPost.title}</h2>
                {
                  (featuredPost.body &&
                    featuredPost.body[0]?.children[0]?.text.slice(0, 100)) +
                    "..."}

                {/* <p className="mt-2">{featuredPost.excerpt}</p> */}
                <Link href={`/blog/${featuredPost.slug.current}`}>
                  <p className="text-[#c6ff41] border-b-2 w-fit border-[#c6ff41] mt-4 block">
                    Read More
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            <Skeleton className="h-80 w-full" />
          )}

          {/* Recent Posts */}
          <div className="space-y-6">
            {recentPosts.length > 0
              ? recentPosts.map((post) => (
                  <div
                    key={post.slug.current}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={
                        urlFor(post.mainImage).width(150).height(100).url() ||
                        "/default-image.jpg"
                      }
                      alt={post.title}
                      className="w-36 h-24 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Link href={`/blog/${post.slug.current}`}>
                        <p className="text-[#c6ff41] border-b-2 w-fit border-[#c6ff41]">
                          Read More
                        </p>
                      </Link>
                    </div>
                  </div>
                ))
              : [...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-24 w-full" />
                ))}
          </div>
        </div>
      </div>

      {/* about  */}
      <div className=" py-12 mt-12">
        <div className="container mx-auto px-4 w-11/12">
          <h2 className="text-4xl text-black font-bold mb-6">About Us</h2>
          <div className="lg:flex items-center justify-between space-x-8">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-400 mb-4">
                We are a team of passionate developers committed to delivering
                high-quality web experiences. Our goal is to create intuitive,
                user-friendly designs that help businesses and individuals
                succeed in the digital world.
              </p>
              <p className="text-lg text-gray-400 mb-4">
                With years of experience in the field, we pride ourselves on our
                ability to turn ideas into reality by using the latest
                technologies and best practices. Whether its a simple website
                or a complex web application, we bring creativity, innovation,
                and expertise to every project.
              </p>
              <Link href="/about">
                <Button className="destructive">Learn More</Button>
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/about.png" // Replace with an actual image URL
                alt="Our Team"
                className="rounded-lg object-cover w-full h-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Editor's Picks */}
      <div className="bg-black text-gray-200 mb-8 pt-3">
        <div className="container mx-auto px-4 mt-12 w-11/12 mx-auto">
          <h2 className="text-4xl font-bold text-white  my-6">MY BLOGS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorPicks.length > 0
              ? editorPicks.map((post) => (
                  <div
                    key={post.slug.current}
                    className="bg-black text-white rounded-lg shadow-none border-2 border-[#c6ff41] overflow-hidden"
                  >
                    <img
                      src={
                        urlFor(post.mainImage).width(400).height(250).url() ||
                        "/default-image.jpg"
                      }
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm  text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <p className="mt-2 text-sm  text-gray-500">
                        {
                          (post.body &&
                            post.body[0]?.children[0]?.text.slice(0, 300)) +
                            "..."}
                      </p>{" "}
                      {/* Show first 100 characters of body */}
                      <Link href={`/blog/${post.slug.current}`}>
                        <p className="text-[#c6ff41] border-b-2 border-[#c6ff41] w-fit mt-4">
                          Read More
                        </p>
                      </Link>
                    </div>
                  </div>
                ))
              : [...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-60 w-full" />
                ))}
          </div>
          <div className="flex justify-center">
            <Button className="destructive mt-6 my-6">View All</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
