"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AllBlogAdmin = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAllBlog = async () => {
    try {
      const res = await fetch("/api/all-blog", {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.status === 200) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  const deleteBlog = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/delete-blog?slug=${deleteTarget.slug}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data?.status === 200) {
        setBlogs((prev) =>
          prev.filter((b) => b.slug !== deleteTarget.slug)
        );
        toast.success("Deleted.")
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            All Blogs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage, edit, or remove published blogs
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/add-blog")}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + New Blog
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-2xl border p-6 text-sm text-gray-500">
          Loading blogs…
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border p-6 text-sm text-gray-500">
          No blogs found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 line-clamp-2 font-medium text-gray-900">
                    {index + 1}. {blog.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {blog.slug}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/edit-blog?slug=${blog.slug}`
                          )
                        }
                        className="rounded-full border px-4 py-1.5 text-xs font-medium hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteTarget(blog)}
                        className="rounded-full border border-red-500 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Blog
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                “{deleteTarget.title}”
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-full border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={deleteBlog}
                disabled={deleting}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AllBlogAdmin;
