import Image from "next/image";
import shots from "../../public/shots/shots.json";

/**
 * A screenshot of the product, on a page that is selling it.
 *
 * ## The dimensions come from the file, not from the JSX
 *
 * `shots.json` is written by the generator that takes the pictures, so a page can never disagree
 * with the image it is showing about how big it is. A wrong height reserves the wrong space and the
 * text under it jumps when the picture arrives — the layout shift Core Web Vitals measures and the
 * reader experiences as the page moving under their eyes.
 *
 * ## The alt text describes the SCREEN, not the file
 *
 * "Dashboard screenshot" tells a screen-reader user nothing and tells a search engine less. Every
 * caller passes a sentence about what is visible, because that is the only version anybody
 * benefits from.
 *
 * ## Why these images can be trusted
 *
 * They are generated from the running product by `scripts/marketing-shots.mjs` in the application
 * repository, against named records of invented data. A screen that changes is a screenshot that
 * changes on the next run — which is the only way a picture of software stays true for longer than
 * a fortnight.
 */
export interface ShotMeta { name: string; width: number; height: number; path: string }

const META = new Map((shots as ShotMeta[]).map((s) => [s.name, s]));

export function Shot({
  name,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  /** The file's stem in `public/shots` — the same name the generator writes. */
  name: string;
  /** What is ON the screen, in a sentence. Not "a screenshot of X". */
  alt: string;
  /** Shown under the image. Optional: some shots sit inside a step that already says it. */
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  const meta = META.get(name);
  /**
   * A missing shot renders NOTHING rather than a broken image.
   *
   * The generator can be re-run with a shorter list, and a page that then shows a browser's broken
   * image icon is worse than a page with one fewer picture on it.
   */
  if (!meta) return null;

  return (
    <figure className={`my-s5 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-line bg-sand shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_24px_-12px_rgba(15,23,42,0.18)]">
        <Image
          src={`/shots/${meta.name}.webp`}
          alt={alt}
          width={meta.width}
          height={meta.height}
          priority={priority}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-s2 text-[14px] leading-relaxed text-slate-mid">{caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * A phone screenshot, held to a phone's width.
 *
 * The field app's images are 824px wide against a dashboard's 2880, and letting them fill the same
 * column renders a phone screen a metre tall. They are shown at the size a phone is.
 */
export function PhoneShot({ name, alt, caption }: { name: string; alt: string; caption?: string }) {
  const meta = META.get(name);
  if (!meta) return null;
  return (
    <figure className="my-s5">
      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-16px_rgba(15,23,42,0.25)]">
        <Image
          src={`/shots/${meta.name}.webp`}
          alt={alt}
          width={meta.width}
          height={meta.height}
          sizes="300px"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mx-auto mt-s2 max-w-[420px] text-center text-[14px] leading-relaxed text-slate-mid">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
