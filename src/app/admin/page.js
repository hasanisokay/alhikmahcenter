"use client";

import { useEffect, useState } from "react";

const AdminPage = () => {
  const [isAdminOk, setIsAdminOk] = useState(false);
  const authorizeAdmin = async () => {
    // check if the admin is true or not. if not then clear cookies
  };
  const clearCookies = async () => {
    // clear the cookies.
  };
  useEffect(() => {
    (async () => {
      const isOk = await authorizeAdmin();
      if (isOk) {
        setIsAdminOk(true);
        return;
      } else {
      }
    })();
  }, []);
  if (!isAdminOk) return null;
  return <div>admin ok</div>;
};

export default AdminPage;
