"use server";

import hostname from "./hostname.mjs";

const getSchedules = async () => {
  try {
    const host = await hostname();

    const res = await fetch(`${host}/api/get-shcedule`, {
      credentials: "include",
    });
    const resData = await res.json();
    return resData;
  } catch (e) {
    console.error(e);
  } finally {
  }
};

export default getSchedules;
