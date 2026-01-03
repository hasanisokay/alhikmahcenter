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

import getBlogBySlug from "@/utils/getBlogBySlug"; 
// ⬆️ replace with your actual data function

export async function generateMetadata({ params }) {
  const { slug } = params;

  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const baseUrl = "https://alhikmahbd.org";

  // Fetch blog data
  const blog = await getBlogBySlug(slug);

  // Fallback (important for SEO safety)
  if (!blog) {
    return {
      title: "Blog Not Found | Al Hikmah Center",
      description:
        "Read authentic Islamic articles on Ruqyah, Hijama, and spiritual healing at Al Hikmah Center.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = blog.seoTitle || blog.title;
  const description =
    blog.seoDescription ||
    blog.excerpt ||
    "Authentic Islamic guidance based on Qur'an and Sunnah from Al Hikmah Center.";

  const url = `${baseUrl}/blog/${slug}`;
  const image =
    blog.ogImage || blog.coverImage || `${baseUrl}/og-blog.jpg`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    keywords: blog.keywords || [
      "Islamic Ruqyah",
      "Hijama",
      "Islamic Healing",
      "Al Hikmah Blog",
    ],

    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: ["Al Hikmah Center"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
