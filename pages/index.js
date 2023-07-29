import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../component/loader";

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     // Simulating a delay to demonstrate the loading spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading === false) {
      router.push("/login");
    }
  }, [loading]);

  return (
    <div className="w-full h-screen ">
      {loading && (
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default HomePage;