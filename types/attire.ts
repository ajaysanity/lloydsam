export type AttireCategory = {
  id: string;
  title: string;
  description: string;
  palette: readonly string[];
  imageSrc?: string | null;
  imageAlt?: string;
};
