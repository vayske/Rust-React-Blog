export type PostMetadata = {
  title: string;
  date: string;
  tags?: string[];
};

export type PostSummary = {
  slug: string;
  metadata: PostMetadata;
};
