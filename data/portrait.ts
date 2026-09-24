// Separate from the gallery on purpose: a portrait is not work.
export type Portrait = {
  imagekitPath: string;
  width: number;
  height: number;
};

// Stays null: the site shows no photo of her.
export const portrait: Portrait | null = null;
