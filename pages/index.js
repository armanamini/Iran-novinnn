import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../component/loader";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return <div className="w-full h-screen "></div>;
};

export default HomePage;
