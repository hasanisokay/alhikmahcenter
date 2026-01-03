export const getExcerpt = (html, length = 180) => {
  const text = stripHtml(html);
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
};


export const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};