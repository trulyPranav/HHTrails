import { useState } from 'react';
import { Book, Compass, Landmark, Lightbulb, Leaf, Camera, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface Props {
  selected: string;
  onChange: (category: string) => void;
}

const CATEGORIES = [
  { label: 'All', value: '', icon: Book },
  { label: 'Travel Stories', value: 'Travel Stories', icon: Compass },
  { label: 'Culture & Heritage', value: 'Culture & Heritage', icon: Landmark },
  { label: 'Tips & Guides', value: 'Tips & Guides', icon: Lightbulb },
  { label: 'Sustainability & Volunteering', value: 'Sustainability & Volunteering', icon: Leaf },
  { label: 'Photography', value: 'Photography', icon: Camera },
];

const BlogCategoryFilter = ({ selected, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const activeLabel = CATEGORIES.find(c => c.value === selected)?.label ?? 'All';

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="mb-10 sm:mb-12 px-4">

      {/* Mobile: single dropdown button */}
      <div className="sm:hidden relative max-w-sm mx-auto">
        <button
          onClick={() => setOpen(prev => !prev)}
          className="flex items-center justify-between w-full gap-2 h-11 px-5 text-sm font-medium rounded-xl border border-[#2b1b14]/20 bg-white text-[#2b1b14] shadow-sm hover:shadow-md transition-all duration-200"
        >
          <span className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-[#2b1b14] flex items-center justify-center shrink-0">
              <SlidersHorizontal size={13} className="text-white" />
            </span>
            <span className="font-medium tracking-wide">{activeLabel}</span>
          </span>
          <ChevronDown
            size={15}
            className={`text-[#2b1b14]/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute z-20 top-[52px] left-0 right-0 bg-white border border-black/8 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold px-1">Filter by Category</p>
            </div>
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const active = selected === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleSelect(cat.value)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm text-left transition-colors duration-150 ${
                    i !== CATEGORIES.length - 1 ? 'border-b border-gray-50' : ''
                  } ${active ? 'bg-[#2b1b14] text-white' : 'text-gray-700 hover:bg-[#f7f4f2]'}`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-white/15' : 'bg-[#2b1b14]/8'}`}>
                    {Icon ? <Icon size={13} className={active ? 'text-white' : 'text-[#2b1b14]'} /> : <span className="w-3" />}
                  </span>
                  <span className="font-medium">{cat.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F4A321]" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop: pill buttons */}
      <div className="hidden sm:flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {CATEGORIES.map(cat => {
          const active = selected === cat.value;
          const Icon = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => onChange(cat.value)}
              className={`
                flex items-center gap-2
                h-10 px-5 text-xs rounded-full font-medium whitespace-nowrap transition-colors
                ${active ? 'bg-[#2b1b14] text-white' : 'bg-white border border-black/50 text-gray-700 hover:bg-gray-100'}
              `}
            >
              {Icon && <Icon size={14} />}
              {cat.label}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default BlogCategoryFilter;