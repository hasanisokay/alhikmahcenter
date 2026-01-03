import BlogList from "@/components/blogs/BlogList";
import hostname from "@/utils/hostname.mjs";
import alhikmah from "@/../public/images/og-blog.jpg";

const PublicBlogPage = async ({ searchParams }) => {
  try {
    const s = await searchParams;
    const limit = parseInt(s.limit) || 10;
    const page = parseInt(s.page) || 1;
    const keyword = s.keyword || "";

    const host = await hostname();
    const res = await fetch(
      `${host}/api/all-public-blog?limit=${limit}&page=${page}&keyword=${keyword}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (data?.status !== 200) {
      return (
        <div className="text-center text-sm text-gray-500 ">
          Failed to load blogs.
        </div>
      );
    }

    return (
      <main className="mx-auto min-h-screen max-w-6xl  px-6 py-12 ">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight ">
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



export async function generateMetadata() {
  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const siteUrl = `${host}/blog`||"https://alhikmahbd.org/blog";
  const metaImage = `${siteUrl}${alhikmah.src}`;
  const title =
    "Islamic Ruqyah & Hijama Blog | Al Hikmah Center";

  const description =
    "Read authentic articles on Islamic Ruqyah, Hijama (cupping therapy), spiritual healing, and health guidance based on Qur'an and Sunnah. Trusted insights from Al Hikmah Center.";

  return {
    title,
    description,

    alternates: {
      canonical: siteUrl,
    },

    keywords: [
      "Ruqyah Blog",
      "Islamic Healing Blog",
      "Hijama Articles",
      "Islamic Health Blog",
      "Spiritual Healing Islam",
      "আল হিকমাহ ব্লগ",
      "রুকইয়াহ ইসলামিক আর্টিকেল",
      "হিজামা ইসলামিক লেখা",
    ],

    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      type: "website",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: "Islamic Ruqyah & Hijama Blog – Al Hikmah Center",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: "Al Hikmah Ruqyah & Hijama Center",
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
