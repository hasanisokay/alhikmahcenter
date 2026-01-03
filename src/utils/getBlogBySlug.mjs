import hostname from "./hostname.mjs";

const getBlogBySlug = async(slug) => {
  try {
    const host = await hostname();
    const res = await fetch(`${host}/api/get-blog?slug=${slug}`, {
      credentials: "include",
      next:{revalidate:3600}
    });
    const resData = await res.json();
    return resData;
  } catch (e) {
    console.error(e);
  } finally {
  }
};

export default getBlogBySlug;