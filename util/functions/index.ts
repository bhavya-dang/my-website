import { notionColors } from "@/constants/index";

export function getTagColor(tagColor: string) {
  for (const key in notionColors) {
    if (key === tagColor) {
      return "bg-[" + notionColors[key] + "]";
    }
  }
  return "bg-[" + notionColors.default + "]";
}
