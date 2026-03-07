import { Compass, Landmark, Lightbulb, Leaf, Camera } from 'lucide-react';

interface Props {
  selected: string;
  onChange: (category: string) => void;
}

const CATEGORIES = [
  { label: 'All', value: '', icon: null },
  { label: 'Travel Stories', value: 'Travel Stories', icon: Compass },
  { label: 'Culture & Heritage', value: 'Culture & Heritage', icon: Landmark },
  { label: 'Tips & Guides', value: 'Tips & Guides', icon: Lightbulb },
  { label: 'Sustainability & Volunteering', value: 'Sustainability & Volunteering', icon: Leaf },
  { label: 'Photography', value: 'Photography', icon: Camera },
];

const BlogCategoryFilter = ({ selected, onChange }: Props) => {

  const btn = (cat: typeof CATEGORIES[0]) => {
    const active = selected === cat.value;
    const Icon = cat.icon;

    return (
      <button
        key={cat.value}
        onClick={() => onChange(cat.value)}
        className={`
          flex items-center gap-2
          h-9 sm:h-10
          px-4 sm:px-5
          text-[11px] sm:text-xs
          rounded-full
          font-medium
          whitespace-nowrap
          transition-colors
          ${
            active
              ? 'bg-[#2b1b14] text-white'
              : 'bg-white border border-black/50 text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        {Icon && <Icon size={14} />}
        {cat.label}
      </button>
    );
  };

  return (
    <div className="mb-10 sm:mb-12 px-4">

      {/* Responsive wrapping grid */}
      <div className="
        flex flex-wrap
        justify-center
        gap-3 sm:gap-4
        max-w-4xl
        mx-auto
      ">
        {CATEGORIES.map(btn)}
      </div>

    </div>
  );
};

export default BlogCategoryFilter;