import type { Story } from "../types";

export default function StoriesTray({ stories }: { stories: Story[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto p-2">
      {stories.map((s) => (
        <div key={s.id} className="flex flex-col items-center">
          <img
            src={s.image_url}
            alt="story"
            className="w-16 h-16 rounded-full border object-cover"
          />
        </div>
      ))}
    </div>
  );
}
