import { useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkX, MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSavedTours } from '../contexts/SavedToursContext';

export default function SavedTours() {
  const { isAuthenticated } = useAuth();
  const { savedTours, isLoading, toggleSave } = useSavedTours();
  const navigate = useNavigate();

  // ── Not logged in ──────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] pt-[72px] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#2B1E17]/10 flex items-center justify-center mx-auto mb-5">
            <Bookmark className="w-7 h-7 text-[#2B1E17]" strokeWidth={1.6} />
          </div>
          <h1 className="text-2xl font-medium text-[#2B1E17] mb-2" style={{ fontFamily: 'Berlin Sans FB' }}>
            Saved Tours
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Sign in to save tours you love and access your personal wishlist from any device.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-[#2B1E17] text-white text-sm rounded-lg hover:bg-[#1a0f0a] transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] pt-[72px] flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading saved tours…</p>
      </div>
    );
  }

  // ── Empty state ────────────────────────────────────────────
  if (savedTours.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] pt-[72px] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#2B1E17]/10 flex items-center justify-center mx-auto mb-5">
            <Bookmark className="w-7 h-7 text-[#2B1E17]" strokeWidth={1.6} />
          </div>
          <h1 className="text-2xl font-medium text-[#2B1E17] mb-2" style={{ fontFamily: 'Berlin Sans FB' }}>
            No Saved Tours Yet
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Tap the bookmark icon on any tour to save it here for easy access.
          </p>
          <button
            onClick={() => navigate('/tours')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2B1E17] text-white text-sm rounded-lg hover:bg-[#1a0f0a] transition-colors"
          >
            Explore Tours
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Saved tours grid ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-[72px]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e4d8]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Bookmark className="w-5 h-5 text-[#2B1E17]" strokeWidth={1.8} />
            <h1 className="text-2xl text-[#2B1E17]" style={{ fontFamily: 'Berlin Sans FB', fontWeight: 400 }}>
              Saved Tours
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-8">
            {savedTours.length} {savedTours.length === 1 ? 'tour' : 'tours'} saved
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedTours.map(({ savedId, savedAt, tour }) => (
            <div
              key={savedId}
              className="bg-white rounded-xl shadow-sm border border-[#ece8e2] overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-xl flex-shrink-0">
                {tour.photoUrl ? (
                  <img
                    src={tour.photoUrl}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#d6cfc8] to-[#b0a89e] flex items-center justify-center">
                    <span className="text-[#3b2a1a] opacity-30 text-xs uppercase tracking-widest">No Photo</span>
                  </div>
                )}

                {/* Overlay shape */}
                <div
                  className="absolute top-0 left-0 w-full h-[80px] pointer-events-none z-10"
                  style={{ backgroundImage: "url('/Vector.svg')", backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat' }}
                />

                {/* Badge */}
                <span className="absolute top-3 left-3 z-20 text-[10px] px-3 py-1 rounded-full bg-amber-400 text-white font-medium">
                  {tour.isCustom ? 'Custom' : 'Recommended'}
                </span>

                {/* Unsave button */}
                <button
                  onClick={async (e) => { e.stopPropagation(); await toggleSave(tour.id); }}
                  title="Remove from saved"
                  className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow hover:bg-red-500 transition-colors"
                >
                  <BookmarkX className="w-4 h-4 text-white" strokeWidth={1.8} />
                </button>

                {/* Region + duration */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white text-xs z-20 drop-shadow">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{tour.region}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{tour.durationNights}N / {tour.durationDays}D</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-[#2b1b14] mb-2 line-clamp-2" style={{ fontFamily: 'Berlin Sans FB', fontWeight: 400, fontSize: '1rem' }}>
                  {tour.title}
                </h3>

                {/* Types */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {tour.types.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400 text-white">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Saved date */}
                <p className="text-[11px] text-gray-400 mt-auto mb-3">
                  Saved {new Date(savedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>

                <button
                  onClick={() => navigate(`/tours/${tour.id}`)}
                  className="w-full py-2.5 bg-[#2b1b14] text-white text-xs rounded-lg hover:bg-amber-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-1"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
