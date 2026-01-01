import BlogList from "@/components/blogs/BlogList";
import hostname from "@/utils/hostname.mjs";

const PublicBlogPage = async ({ searchParams }) => {
  try {
    const limit = parseInt(searchParams.limit) || 10;
    const page = parseInt(searchParams.page) || 1;
    const keyword = searchParams.keyword || "";

    const host = await hostname();
    const res = await fetch(
      `${host}/api/all-public-blog?limit=${limit}&page=${page}&keyword=${keyword}`,
      { cache: "no-store" }
      // or: { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (data?.status !== 200) {
      return (
        <div className="text-center text-sm text-gray-500">
          Failed to load blogs.
        </div>
      );
    }

    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Al Hikmah Blogs
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Latest articles & updates
          </p>
        </div>

        <BlogList
          blogs={data.blogs}
          pagination={data.pagination}
        />
      </main>
    );
  } catch {
    return (
      <div className="text-center text-sm text-red-500">
        Error loading blogs. Please reload.
      </div>
    );
  }
};

export default PublicBlogPage;
