import { useState } from "react";
import { Clock, X, CheckCircle, ArrowRight } from "lucide-react";

interface Walk {
  id: number;
  image: string;
  title: string;
  duration: string;
  description: string;
  fullDescription: string;
  details: string[];
  rates: { label: string; price: string }[];
  includes: string[];
}
const handleWhatsAppEnquiry = (walkTitle: string) => {
    const phoneNumber = "919622992881"; 
    const message = `Hello, I would like to enquire about ${walkTitle}. Please provide more details. Thank you!`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };
  const primaryColor = '#2B1E17';
    const backgroundColor = '#F7F6F2';
    const hoverColor = '#1a0f0a';
const walks: Walk[] = [
  {
    id: 1,
    image: "/WhatsApp Image 2026-03-08 at 1.57.43 PM.jpeg",
    title: "Book a Heritage Walk",
    duration: "2-3 Hours",
    description:
      "Explore Leh's historic Old Town on a guided heritage walk led by Dr. Sonam Wangchok. Visit landmarks like Leh Palace and the Central Asian Museum while learning about Ladakh's history, architecture, culture, and heritage preservation.",
    fullDescription: "Explore the historic Old Town of Leh through a guided heritage walk led by Dr. Sonam Wangchok. The walk includes visits to important cultural and historical landmarks such as Leh Palace, Central Asian Museum, nearby temples, and centres of organizations working in different cultural and social fields (subject to opening hours and prior consent).Participants will gain insights into Ladakh’s tangible and intangible heritage, including local history, traditional knowledge, folklore, architecture, cultural transformations, and contemporary challenges in preserving heritage.",
    details: [
        "Guided heritage walk through Leh’s Old Town",
        "Led by Dr. Sonam Wangchok",
        "Visit Leh Palace and the Central Asian Museum",
        "Explore nearby temples and cultural centres",
        "Learn about Ladakh’s history, folklore, and architecture",
        "Insights into heritage preservation challenges"
      ],
         rates: [
        { label: "Group (11–20 people)", price: "₹500 / person" },
        { label: "Group (5–10 people)", price: "₹800 / person" },
        { label: "Small Group (Less than 5 people)", price: "₹2,000 / person" },
      ],
    includes: ["Expert guide (Dr. Sonam Wangchok)", "Entry fees", "Walking map", "Refreshments"],
  },
  {
    id: 2,
    image: "/WhatsApp Image 2026-03-08 at 3.10.18 PM.jpeg",
    title: "Heritage Talk",
    duration: "1 Hour Talk + 30 Minutes Q&A",
    description:
      "Heritage Himalaya Trails hosts insightful heritage talks by Dr. Sonam Wangchok, exploring Ladakh's history, culture, traditions, and heritage preservation, followed by an interactive Q&A session.",
    fullDescription: "Heritage Himalaya Trails organizes engaging heritage talks by Dr. Sonam Wangchok that offer a deeper understanding of Ladakh’s tangible, intangible, and natural heritage.The session covers Ladakh’s rich history, cultural traditions, folklore, and the ongoing changes and challenges involved in preserving its unique heritage. The talk concludes with an interactive question-and-answer session, allowing participants to engage in meaningful discussion.",
    details: [
          "Heritage talk led by Dr. Sonam Wangchok",
          "Learn about Ladakh’s history and cultural traditions",
          "Explore tangible, intangible, and natural heritage",
          "Insights into folklore and heritage preservation",
          "Understand cultural changes and contemporary challenges",
          "Interactive Q&A session with participants"
        ],
    rates: [
        { label: "Session at Our Centre", price: "₹6,000" },
        { label: "Session at Your Hotel / Preferred Venue", price: "₹8,000" },
      ],
    includes: ["Expert speaker session", "Q&A time", "Printed notes", "Certificate of attendance"],
  },
];

const HeritageWalk = () => {
  const [selected, setSelected] = useState<Walk | null>(null);

  return (
    <>
      <section className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-7">
            <h2 className="font-berlin text-3xl font text-[#2b2b2b]">
              Book a Heritage Walk / Heritage Talk
            </h2>
            <p className="font-sans text-base tracking-tight font-normal text-[#4A5565]">
              with Dr. Sonam Wangchok
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {walks.map((walk) => (
              <div
                key={walk.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={walk.image}
                    alt={walk.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t " />
                </div>
                <div className="p-6">
                  <h3 className="font-base font-medium text-[#2b2b2b] mb-2">{walk.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">{walk.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#2b2b2b] mb-5">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-[#F4A321]" /> {walk.duration}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(walk)}
                       className="w-full bg-[#2b1b14] hover:bg-[#3a261e] text-white text-sm rounded-md py-2 transition-colors duration-300"
        >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E17]/70 to-transparent" />
              <h2 className="absolute bottom-4 left-6 font-berlin text-2xl text-white">
                {selected.title}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-sm text-[#4A5565]">
                <Clock size={15} className="text-[#F4A321]" />
                <span>{selected.duration}</span>
              </div>

              <div>
                <h3 className="font-berlin text-lg text-[#2b2b2b] mb-2">About</h3>
                {selected.fullDescription && (
                  <p className="text-sm text-[#4A5565] leading-relaxed whitespace-pre-line">{selected.fullDescription}</p>
                )}
              </div>

              <div>
                <h3 className="font-berlin text-lg text-[#2b2b2b] mb-3">Details</h3>
                <ul className="space-y-2">
                  {selected.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#4A5565]">
                      <CheckCircle size={15} className="text-[#F4A321] mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-berlin text-lg text-[#2b2b2b] mb-3">Rates</h3>
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  {selected.rates.map((rate, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-4 py-3 text-sm ${
                        i % 2 === 0 ? "bg-[#f9f9f9]" : "bg-white"
                      }`}
                    >
                      <span className="text-[#4A5565]">{rate.label}</span>
                      <span className="font-semibold text-[#2b2b2b]">{rate.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleWhatsAppEnquiry(selected.title)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded transition-all duration-300 w-full"
                style={{
                  backgroundColor: primaryColor,
                  color: '#FFFFFF',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                }}
              >
                Enquire Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeritageWalk;