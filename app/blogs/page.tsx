import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bhavya Dang - Blogs",
  description: "Bhavya Dang's super awesome amazing fantastic marvelous blogs",
};

export default async function Blogs() {
  return <p className="dark:text-white">Blogs</p>;
}
