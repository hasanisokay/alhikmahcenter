"use client";

import Pagination from "./Pagination";

/**
 * Strip HTML tags and return plain text
 */
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

/**
 * Calculate read time (200 wpm)
 */
const getReadTime = (html) => {
  const text = stripHtml(html);
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

/**
 * Create excerpt
 */
const getExcerpt = (html, length = 180) => {
  const text = stripHtml(html);
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
};

const BlogList = ({ blogs, pagination }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        No blogs found.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8">
        {blogs.map((blog) => {
          const publishedDate = new Date(
            blog.lastUpdated || blog.date
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });

          return (
            <article
              key={blog._id}
              className="rounded-3xl border border-gray-200 bg-white p-6 transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-800/40"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {blog.title}
              </h2>

              {/* Meta */}
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span>{publishedDate}</span>
                <span>•</span>
                <span>{getReadTime(blog.content)}</span>
              </div>

              {/* Excerpt */}
              <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {getExcerpt(blog.content)}
              </p>

              {/* Read More */}
              <div className="mt-6">
                <a
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Read more
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination pagination={pagination} />
    </>
  );
};

export default BlogList;
