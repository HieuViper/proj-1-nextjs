"use client";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { RootStyleRegistry } from "./RootStyleRegistry";

const Layout = (props) => {
  const headersList = usePathname();

  const specificRoute = ["admin", "login"]; // exclude specific router
  return (
    <html lang="en">
      <body>
        {headersList.includes(specificRoute) && <Navbar />}
        <RootStyleRegistry>{props.child}</RootStyleRegistry>
        <Toaster position="top-center" />
      </body>
    </html>
  );
};

export default Layout;
