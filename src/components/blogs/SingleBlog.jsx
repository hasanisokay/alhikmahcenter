"use client";

/**
 * Strip HTML tags
 */
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

/**
 * Read time (200 words/min)
 */
const getReadTime = (html) => {
  const text = stripHtml(html);
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const SingleBlog = ({ blog }) => {
  if (!blog) {
    return (
      <div className="text-center text-sm text-gray-500">
        Blog not found.
      </div>
    );
  }

  // const publishedDate = new Date(
  //   blog.lastUpdated || blog.date
  // ).toLocaleDateString();

  const publishedDate = new Date(
    blog.lastUpdated || blog.date
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Title */}
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span>{publishedDate}</span>
        <span>•</span>
        <span>{getReadTime(blog.content)}</span>
      </div>

      {/* Content */}
      <div
        className="prose prose-lg mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default SingleBlog;
