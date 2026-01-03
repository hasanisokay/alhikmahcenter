import alhikmah from "@/../public/images/og-blog.jpg";
import SingleBlog from "@/components/blogs/SingleBlog";
import getBlogBySlug from "@/utils/getBlogBySlug.mjs";
import { getExcerpt } from "@/components/blogs/BlogList";
import hostname from "@/utils/hostname.mjs";

const Page = async ({ params }) => {
  try {
    const p = await params;
    const slug = p.slug;
    const data = await getBlogBySlug(slug);
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

export async function generateMetadata({ params }) {
  const p = await params;
  const slug = p.slug;

  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const host = await hostname();
  const baseUrl = host || "https://alhikmahbd.org";
  const metaImage = `${baseUrl}${alhikmah.src}`;

  const b = await getBlogBySlug(slug);
  const blog = b?.blog;
  if (!blog) {
    return {
      title: "Blog Not Found | Al Hikmah Center",
      description:
        "Read authentic Islamic articles on Ruqyah, Hijama, and spiritual healing based on Qur'an and Sunnah.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* ---------------------------
     Extract image from content
  ---------------------------- */
  let seoImage = metaImage;

  if (blog.content) {
    const imgMatch = blog.content.match(/<img[^>]+src=["']([^"']+)["']/i);

    if (imgMatch?.[1]) {
      seoImage = imgMatch[1].startsWith("http")
        ? imgMatch[1]
        : `${baseUrl}${imgMatch[1]}`;
    }
  }

  /* ---------------------------
     SEO fields
  ---------------------------- */
  const title = blog.title || blog.seo?.ogTitle ;
  const description =
    blog.seo?.description ||
    blog.seo?.ogDescription || getExcerpt(blog?.content) || 
    "Authentic Islamic guidance on Ruqyah, Hijama, and spiritual healing based on Qur'an and Sunnah.";

  const canonicalUrl = blog.seo?.canonicalUrl || `${baseUrl}/blog/${slug}`;

  const keywords =
    blog.seo?.tags?.length > 0
      ? blog.seo.tags
      : ["ruqyah", "hijama", "রুকইয়া ব্লগ", "আল হিকমাহ ব্লগ"];

  /* ---------------------------
     Metadata return
  ---------------------------- */
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords,
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName,
      publishedTime: blog.date,
      modifiedTime: blog.lastUpdated || new Date().toISOString(),
      authors: ["Al Hikmah BD"],
      images: [
        {
          url: seoImage,
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
      images: [
        {
          url: seoImage,
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
