import hostname from "@/utils/hostname.mjs";
import SingleBlog from "@/components/blogs/SingleBlog";

const Page = async ({ params }) => {
  try {
    const p = await params;
    const slug = p.slug;
    const host = await hostname();

    const res = await fetch(
      `${host}/api/get-blog?slug=${slug}`,
{ next: { revalidate: 3600 } }
    );

    const data = await res.json();
    if (data?.status !== 200) {
      return (
        <div className="py-20 text-center text-sm text-gray-500">
          Blog not found.
        </div>
      );
    }

    return <SingleBlog blog={data?.blog} />;
  } catch {
    return (
      <div className="py-20 text-center text-sm text-red-500">
        Error loading blog. Please try again.
      </div>
    );
  }
};

export default Page;
