"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { TextStyle } from '@tiptap/extension-text-style';
import Color from "@tiptap/extension-color";
import uploadImage from "@/services/uploadImage.mjs";
import slugFormatter from "@/utils/slugFormatter.mjs";

const EditBlogAdminPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const originalSlug = searchParams.get("slug");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Blog fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(originalSlug || "");
  const [privacy, setPrivacy] = useState("draft");

  // SEO
  const [seoDescription, setSeoDescription] = useState("");
  const [seoTags, setSeoTags] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");

  // Slug check
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(true);

   const [textColor, setTextColor] = useState("#2563eb");
  const editor = useEditor({
     extensions: [
    StarterKit,
    TextStyle,
    Color,
    Image,
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer",
        class: "editor-link",
      },
    }),
  ],
  immediatelyRender: false,
    content: "<p>Loading content…</p>",
  });

  // 🔽 Fetch blog details
  const getBlogDetails = async () => {
    try {
      const res = await fetch(`/api/get-blog?slug=${originalSlug}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.status !== 200) {
        toast.error("Blog not found");
        router.push("/admin/all-blog");
        return;
      }
      const blog = data.blog;
      setTitle(blog.title);
      setPrivacy(blog.privacy || "draft");

      editor?.commands.setContent(blog.content || "<p></p>");

      // SEO
      setSeoDescription(blog?.seo?.description || "");
      setSeoTags(blog?.seo?.tags?.join(", ") || "");
      setCanonicalUrl(blog?.seo?.canonicalUrl || "");
      setOgTitle(blog?.seo?.ogTitle || "");
      setOgDescription(blog?.seo?.ogDescription || "");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (originalSlug && editor) {
      getBlogDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, editor]);

  // 🖼 Image upload
  const handleImageUpload = async (file) => {
    const url = await uploadImage(file);
    editor.chain().focus().setImage({ src: url }).run();
  };

  // 💾 Update blog
  const updateBlog = async () => {
    if (!title || !editor?.getHTML()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/update-blog", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          originalSlug,
          title,
          content: editor.getHTML(),
          privacy,
          seo: {
            description: seoDescription,
            tags: seoTags.split(",").map((t) => t.trim()),
            canonicalUrl,
            ogTitle,
            ogDescription,
          },
        }),
      });

      const data = await res.json();

      if (data?.status === 200) {
        toast.success("Blog updated successfully");
      router.push("/admin/all-blog")
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setSaving(false);
    }
  };
const setLink = () => {
  const previousUrl = editor.getAttributes("link").href;
  const url = window.prompt("Enter URL", previousUrl);

  if (url === null) return;

  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};

  const checkSlugAvailability = async () => {
    try {
      if (slug.length === 0) return;
      if (slug === originalSlug) {
        setSlugAvailable(true);
        return;
      }
      setSlugChecking(true);
      const res = await fetch(`/api/check-slug-availability?slug=${slug}`);
      const data = await res.json();
      setSlugAvailable(data?.availability);
    } catch {
      setSlugAvailable(false);
    } finally {
      setSlugChecking(false);
    }
  };
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10 text-sm text-gray-500">
        Loading blog…
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Blog</h1>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
          Original Slug: {originalSlug}
        </span>
      </div>

      <div className="space-y-8 rounded-3xl border bg-white p-6">
        {/* BASIC INFO */}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog title"
            className="rounded-xl border px-4 py-2 text-sm"
          />

          <div>
            <input
              value={slug}
              onChange={(e) => setSlug(slugFormatter(e.target.value))}
              onBlur={checkSlugAvailability}
              placeholder="Slug"
              className="rounded-xl border px-4 py-2 text-sm"
            />

            {slugChecking && (
              <p className="mt-1 text-xs text-gray-500">Checking...</p>
            )}

            {!slugChecking && slug === originalSlug && (
              <p className="mt-1 text-xs text-gray-500">Current slug</p>
            )}

            {!slugChecking && slug !== originalSlug && slugAvailable && (
              <p className="mt-1 text-xs text-green-600">Slug available</p>
            )}

            {!slugChecking && slug !== originalSlug && !slugAvailable && (
              <p className="mt-1 text-xs text-red-600">Slug not available</p>
            )}
          </div>
        </div>

        {/* PRIVACY */}
        <div>
          <label className="text-sm font-medium">Visibility</label>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="mt-1 rounded-xl border px-4 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="public">Public</option>
          </select>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-wrap gap-2">
          {[
            ["Bold", () => editor.chain().focus().toggleBold().run()],
            ["Italic", () => editor.chain().focus().toggleItalic().run()],
            ["Underline", () => editor.chain().focus().toggleUnderline().run()],
            ["Link", setLink],
            [
              "H1",
              () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            ],
            [
              "H2",
              () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            ],
            ["Bullet", () => editor.chain().focus().toggleBulletList().run()],
            [
              "Numbered",
              () => editor.chain().focus().toggleOrderedList().run(),
            ],
            ["Quote", () => editor.chain().focus().toggleBlockquote().run()],
            ["Code", () => editor.chain().focus().toggleCodeBlock().run()],
            ["Divider", () => editor.chain().focus().setHorizontalRule().run()],
            
          ].map(([label, action]) => (
            <button
              key={label}
              onClick={action}
              className="rounded-full border px-3 py-1 text-xs hover:bg-gray-100"
            >
              {label}
            </button>
          ))}

          {/* IMAGE */}
          <label className="rounded-full border px-3 py-1 text-xs cursor-pointer">
            Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>
                   {/* 🎨 COLOR PICKER */}
        <input
          type="color"
          value={textColor}
          onChange={(e) => {
            setTextColor(e.target.value);
            editor.chain().focus().setColor(e.target.value).run();
          }}
          className="h-8 w-10 cursor-pointer"
        />

        <input
          type="text"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          onBlur={() => editor.chain().focus().setColor(textColor).run()}
          className="w-24 rounded border px-2 text-sm"
          placeholder="#2563eb"
        />

        <button
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="rounded border px-2 text-sm"
        >
          Clear Color
        </button>
        </div>

        {/* EDITOR */}
        <div className="rounded-2xl border p-4 min-h-[300px]">
          <EditorContent editor={editor} />
        </div>

        {/* SEO */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-sm">SEO Settings (Optional)</h3>

          <textarea
            placeholder="SEO description"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm"
          />

          <input
            placeholder="SEO tags (comma separated)"
            value={seoTags}
            onChange={(e) => setSeoTags(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm"
          />

          <input
            placeholder="Canonical URL"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm"
          />

          <input
            placeholder="OG Title"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm"
          />

          <textarea
            placeholder="OG Description"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm"
          />
        </div>

        {/* SAVE */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.push("/all-blog")}
            className="rounded-full border px-6 py-2 text-sm"
          >
            Back
          </button>

          <button
            onClick={updateBlog}
            disabled={saving}
            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Updating…" : "Update Blog"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditBlogAdminPage;
