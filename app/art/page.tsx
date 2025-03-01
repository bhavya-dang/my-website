import ArtClient from "@/components/ArtClient";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Art",
  description: "Explore my art.",
});

export default async function ArtPage() {
  return <ArtClient />;
}
