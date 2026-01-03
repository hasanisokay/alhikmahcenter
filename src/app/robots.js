export default async function robots() {
  const host = "https://www.alhikmahbd.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
          "/auth/",
        ],
      },
    ],

    sitemap: `${host}/sitemap.xml`,
  };
}
