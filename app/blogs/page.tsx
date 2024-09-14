import { fetchBlogs } from "@/util/notion/index";
import BlogClient from "@/components/BlogClient";

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return <BlogClient blogs={blogs} />;
}
