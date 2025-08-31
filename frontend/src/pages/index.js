// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export default function Home() {
//   //Check is user logged in
//   // const isUser = useSelector(
//   //   (state) => state?.partner?.auth?.currentUser?.vAccessToken
//   // );
//   const router = useRouter();

//   const isUser = false;

//   //If user is logged in than redirect to dashboard otherwise redirect to login
//   useEffect(() => {
//     if (isUser) {
//       router.push("/dashboard");
//     } else {
//       router.push("/auth/login");
//     }
//   }, []);

//   return <></>;
// }

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    router.push("/dashboard");

    setIsChecking(false);
  }, [router]);

  // Render nothing while checking
  return isChecking ? null : null;
}
