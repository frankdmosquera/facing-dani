import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

// Words for a page that is otherwise all photos. Every style named here is in the grid above; keep it that way.
export function GalleryStyles({ t }: { t: Dictionary }) {
  const c = t.gallery.styles;

  return (
    <Band tinted glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      <dl className="grid gap-x-10 gap-y-7 min-[760px]:grid-cols-2">
        {Object.entries(c.groups).map(([key, group]) => (
          <div key={key}>
            <dt className="mb-1.5 text-[17px] font-semibold text-ink">{group.title}</dt>
            <dd className="max-w-[52ch] text-[15px] text-ink-muted">{group.body}</dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}
