"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import uploadImage from "@/services/uploadImage.mjs";
import slugFormatter from "@/utils/slugFormatter.mjs";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

const AddBlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [loading, setLoading] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(false);
  const [slugChecking, setSlugChecking] = useState(false);
  // SEO
  const [seoDescription, setSeoDescription] = useState("");
  const [seoTags, setSeoTags] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");

  const [textColor, setTextColor] = useState("#2563eb");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
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
    content: "<p>Start writing your blog…</p>",
  });

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImageUpload = async (file) => {
    const url = await uploadImage(file);
    editor.chain().focus().setImage({ src: url }).run();
  };

  const saveBlog = async () => {
    if (!title || !editor?.getHTML() || !slug) {
      toast.error("Title and content and slug are required");
      return;
    }
    if (!slugAvailable) {
      toast.error("Slug is not available.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/add-blog", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
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
        toast.success("Blog saved successfully");
        editor.commands.clearContent();
        setTitle("");
        setSlug("");
      } else {
        toast.error(data?.message || "Failed to save");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };
  const checkSlugAvailability = async () => {
    try {
      if (slug.length === 0) return;
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
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Add New Blog</h1>

      <div className="mt-6 space-y-8 rounded-3xl border bg-white p-6">
        {/* BASIC INFO */}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border px-4 py-2 text-sm"
          />
          <div>
            <input
              placeholder="Slug (must be in english)"
              value={slug}
              onBlur={checkSlugAvailability}
              onChange={(e) => {
                const formatted = slugFormatter(e.target.value);
                setSlug(formatted);
              }}
              className="rounded-xl border px-4 py-2 text-sm"
            />
            {slug?.length > 1 && slugChecking && (
              <p className="text-xs text-gray-500">Checking...</p>
            )}

            {slug?.length > 1 && !slugChecking && slugAvailable && (
              <p className="text-xs text-black">Available</p>
            )}

            {slug?.length > 1 && !slugChecking && !slugAvailable && (
              <p className="text-xs text-red-600">Not available</p>
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
            [
              "H3",
              () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
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
        <div className="rounded-2xl p-4 min-h-[300px] ProseMirror">
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
        <div className="flex justify-end">
          <button
            onClick={saveBlog}
            disabled={loading}
            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Blog"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddBlogAdmin;
