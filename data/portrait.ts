/**
 * The one photograph of Dani herself.
 *
 * Its own file rather than a row in `data/gallery.ts` on purpose: a portrait is
 * not work. In the gallery it would appear in the filtered grid, be counted in
 * the photo count, and be listed in the page's `ImageGallery` structured data as
 * an example of what a client can book - which it is not.
 *
 * `null` is a legal value and is the current one. Two frames from the set she
 * sent on 2026-09-21 are almost certainly her, but nobody has confirmed it or
 * asked whether she wants her face on the site, so neither was uploaded.
 *
 * A missing portrait and a missing endpoint are different problems and get
 * different answers: no endpoint is a configuration mistake and `Photo` draws a
 * labelled box so the layout still reads, while no portrait is a content
 * decision and the page simply renders without one.
 *
 * Alt text lives at `about.portraitAlt` in the dictionaries, because it is
 * prose and prose translates. The path and the dimensions do not.
 */
export type Portrait = {
  /** Path inside the ImageKit library, leading slash, no endpoint. */
  imagekitPath: string;
  /** The master's intrinsic pixels, so the space is reserved before it loads. */
  width: number;
  height: number;
};

export const portrait: Portrait | null = null;
