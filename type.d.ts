export type Project = {
  id: string;
  cover: string | null;
  icon: string | null;
  name: string;
  description: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  type: string;
  multi_select: MultiSelect[];
};

export type MultiSelect = {
  id: string;
  name: string;
  color: string;
};
