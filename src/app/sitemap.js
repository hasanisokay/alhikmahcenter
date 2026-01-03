export default async function sitemap() {
  const host = "https://www.alhikmahbd.org";

  let blogSlugs = [];

  try {
    const res = await fetch(`${host}/api/get-blog-slug`, {
      next: { revalidate: 604800 }, // 7 days
    });

    const data = await res.json();

    if (data?.status === 200 && Array.isArray(data.slugs)) {
      blogSlugs = data.slugs;
    }
  } catch (error) {
    console.error("Failed to fetch blog slugs for sitemap", error);
  }

  // Static pages
  const staticRoutes = [
    {
      url: `${host}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${host}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${host}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${host}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${host}/audio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${host}/pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${host}/book-appointment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Dynamic blog routes
  const blogRoutes = blogSlugs.map((item) => ({
    url: `${host}/blog/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
