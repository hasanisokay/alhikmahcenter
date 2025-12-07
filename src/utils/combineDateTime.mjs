const combineDateTime = (dateObj, timeStr) => {
  if (!dateObj || !timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date(dateObj);
  d.setHours(h, m, 0, 0);
  return d;
};

export default combineDateTime;
