import { useEffect, useState } from 'react';
import type React from 'react';
import { toursService } from '../services/toursService';
import { storageService } from '../services/storageService';
import type { Tour, TourDetails, ItineraryDay } from '../types/tour';

interface FormState {
  id?: string;
  title: string;
  description: string;
  region: string;
  types: string;
  season: string;
  durationDays: string;
  durationNights: string;
  isCustom: boolean;
  photoUrl: string; // used internally for editing
}

const emptyForm: FormState = {
  title: '',
  description: '',
  region: '',
  types: '',
  season: '',
  durationDays: '',
  durationNights: '',
  isCustom: false,
  photoUrl: '',
};

const REGIONS = ['Ladakh', 'Spiti', 'Kashmir', 'Himachal'] as const;
const TYPES = ['Cultural', 'Photography', 'Heritage', 'Village', 'Festival'] as const;
const SEASONS = ['Summer', 'Winter', 'Monsoon', 'Festival'] as const;

interface DetailsFormState {
  overview: string;
  highlights: string;
  inclusions: string;
  exclusions: string;
  accommodationDescription: string;
  accommodationMediaUrl: string;
  featureDescription: string;
  featureMediaUrl: string;
  featureIsVideo: boolean;
  routeDescription: string;
  routePhotoUrl: string;
}

const emptyDetailsForm: DetailsFormState = {
  overview: '',
  highlights: '',
  inclusions: '',
  exclusions: '',
  accommodationDescription: '',
  accommodationMediaUrl: '',
  featureDescription: '',
  featureMediaUrl: '',
  featureIsVideo: false,
  routeDescription: '',
  routePhotoUrl: '',
};

interface DayFormState { dayNumber: string; description: string; imageUrl: string; }
const emptyDayForm: DayFormState = { dayNumber: '', description: '', imageUrl: '' };
type AdminTab = 'basic' | 'details' | 'itinerary';
const splitLines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const joinLines = (arr: string[]) => arr.join('\n');

const AdminPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<AdminTab>('basic');

  // Details
  const [_details, setDetails] = useState<TourDetails | null>(null);
  const [detailsExists, setDetailsExists] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsForm, setDetailsForm] = useState<DetailsFormState>(emptyDetailsForm);
  const [detailsSubmitting, setDetailsSubmitting] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  // Itinerary
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [itineraryLoading, setItineraryLoading] = useState(false);
  const [dayForm, setDayForm] = useState<DayFormState>(emptyDayForm);
  const [editingDayNumber, setEditingDayNumber] = useState<number | null>(null);
  const [daySubmitting, setDaySubmitting] = useState(false);
  const [itineraryError, setItineraryError] = useState<string | null>(null);

  const isEditing = Boolean(form.id);

  const loadTours = async () => {
    try {
      setLoading(true);
      const data = await toursService.getTours({ page: 1, limit: 50 });
      setTours(data.tours);
    } catch {
      setError('Failed to load tours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTours();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTypesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm((prev) => ({
      ...prev,
      types: values.join(', '),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedFile(null);
    setPreviewUrl(null);
    setActiveTab('basic');
    setDetails(null);
    setDetailsExists(false);
    setDetailsForm(emptyDetailsForm);
    setDetailsError(null);
    setItinerary([]);
    setDayForm(emptyDayForm);
    setEditingDayNumber(null);
    setItineraryError(null);
  };

  const loadDetailsAndItinerary = async (tourId: string) => {
    setDetailsLoading(true);
    setDetailsError(null);
    try {
      const d = await toursService.getDetails(tourId);
      setDetails(d);
      setDetailsExists(true);
      setDetailsForm({
        overview: d.overview,
        highlights: joinLines(d.highlights),
        inclusions: joinLines(d.inclusions),
        exclusions: joinLines(d.exclusions),
        accommodationDescription: d.accommodationDescription ?? '',
        accommodationMediaUrl: d.accommodationMediaUrl ?? '',
        featureDescription: d.featureDescription ?? '',
        featureMediaUrl: d.featureMediaUrl ?? '',
        featureIsVideo: d.featureIsVideo,
        routeDescription: d.routeDescription ?? '',
        routePhotoUrl: d.routePhotoUrl ?? '',
      });
    } catch {
      setDetails(null);
      setDetailsExists(false);
      setDetailsForm(emptyDetailsForm);
    } finally {
      setDetailsLoading(false);
    }

    setItineraryLoading(true);
    setItineraryError(null);
    try {
      const days = await toursService.getItinerary(tourId);
      setItinerary(days);
    } catch {
      setItinerary([]);
    } finally {
      setItineraryLoading(false);
    }
  };

  const handleEdit = (tour: Tour) => {
    setForm({
      id: tour.id,
      title: tour.title,
      description: tour.description || '',
      region: tour.region,
      types: tour.types.join(', '),
      season: tour.season,
      durationDays: String(tour.durationDays),
      durationNights: String(tour.durationNights),
      isCustom: tour.isCustom,
      photoUrl: tour.photoUrl,
    });

    setPreviewUrl(tour.photoUrl);
    setSelectedFile(null);
    setActiveTab('basic');
    void loadDetailsAndItinerary(tour.id);
  };

  const handleDelete = async (tour: Tour) => {
    if (!window.confirm(`Delete tour "${tour.title}"?`)) return;

    try {
      setSubmitting(true);
      await toursService.deleteTour(tour.id);
      await loadTours();
      if (form.id === tour.id) resetForm();
    } catch {
      setError('Failed to delete tour');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const typesArray = form.types
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      let photoUrl = form.photoUrl;

      // Upload image if new file selected
      if (selectedFile) {
        photoUrl = await storageService.uploadTourImage(selectedFile);
      }

      const payload = {
        title: form.title,
        description: form.description || undefined,
        region: form.region,
        types: typesArray,
        season: form.season,
        durationDays: Number(form.durationDays),
        durationNights: Number(form.durationNights),
        photoUrl,
        isCustom: form.isCustom,
      };

      if (isEditing && form.id) {
        await toursService.updateTour(form.id, payload);
      } else {
        await toursService.createTour(payload);
      }

      await loadTours();
      resetForm();
    } catch (err) {
      console.error(err);
      setError('Failed to save tour');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTypes = form.types
    ? form.types.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  // Details handlers
  const handleDetailsInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setDetailsForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id) return;
    setDetailsSubmitting(true);
    setDetailsError(null);
    const payload = {
      overview: detailsForm.overview,
      highlights: splitLines(detailsForm.highlights),
      inclusions: splitLines(detailsForm.inclusions),
      exclusions: splitLines(detailsForm.exclusions),
      accommodationDescription: detailsForm.accommodationDescription || null,
      accommodationMediaUrl: detailsForm.accommodationMediaUrl || null,
      featureDescription: detailsForm.featureDescription || null,
      featureMediaUrl: detailsForm.featureMediaUrl || null,
      featureIsVideo: detailsForm.featureIsVideo,
      routeDescription: detailsForm.routeDescription || null,
      routePhotoUrl: detailsForm.routePhotoUrl || null,
    };
    try {
      if (detailsExists) {
        const updated = await toursService.updateDetails(form.id, payload);
        setDetails(updated);
      } else {
        const created = await toursService.createDetails(form.id, payload);
        setDetails(created);
        setDetailsExists(true);
      }
    } catch (err) {
      console.error(err);
      setDetailsError('Failed to save details');
    } finally {
      setDetailsSubmitting(false);
    }
  };

  // Itinerary handlers
  const handleDayInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDayForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditDay = (day: ItineraryDay) => {
    setEditingDayNumber(day.dayNumber);
    setDayForm({ dayNumber: String(day.dayNumber), description: day.description, imageUrl: day.imageUrl });
  };

  const handleDeleteDay = async (dayNumber: number) => {
    if (!form.id || !window.confirm(`Delete Day ${dayNumber}?`)) return;
    try {
      setDaySubmitting(true);
      await toursService.deleteItineraryDay(form.id, dayNumber);
      setItinerary((prev) => prev.filter((d) => d.dayNumber !== dayNumber));
      if (editingDayNumber === dayNumber) { setEditingDayNumber(null); setDayForm(emptyDayForm); }
    } catch {
      setItineraryError('Failed to delete day');
    } finally {
      setDaySubmitting(false);
    }
  };

  const handleDaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id) return;
    setDaySubmitting(true);
    setItineraryError(null);
    try {
      if (editingDayNumber !== null) {
        const updated = await toursService.updateItineraryDay(form.id, editingDayNumber, {
          description: dayForm.description,
          imageUrl: dayForm.imageUrl || undefined,
        });
        setItinerary((prev) => prev.map((d) => (d.dayNumber === editingDayNumber ? updated : d)));
      } else {
        const added = await toursService.addItineraryDay(form.id, {
          dayNumber: Number(dayForm.dayNumber),
          description: dayForm.description,
          imageUrl: dayForm.imageUrl,
        });
        setItinerary((prev) => [...prev, added].sort((a, b) => a.dayNumber - b.dayNumber));
      }
      setDayForm(emptyDayForm);
      setEditingDayNumber(null);
    } catch (err) {
      console.error(err);
      setItineraryError('Failed to save day');
    } finally {
      setDaySubmitting(false);
    }
  };

  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-[#2B1E17]">
          Tours Admin
        </h1>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-300 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── LIST ── */}
          <div className="bg-white rounded-lg shadow-sm border p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-[#2B1E17]">Existing Tours</h2>
              <button onClick={loadTours} disabled={loading} className="text-xs border rounded px-2 py-1 hover:bg-gray-50">
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
            </div>
            {tours.length === 0 && !loading && <p className="text-sm text-gray-400">No tours yet.</p>}
            {tours.map((tour) => (
              <div key={tour.id} className={`border rounded p-3 mb-3 ${form.id === tour.id ? 'border-[#2B1E17] bg-[#FAF8F5]' : ''}` }>
                <div className="flex items-start gap-3">
                  {tour.photoUrl && (
                    <img src={tour.photoUrl} alt={tour.title} className="w-14 h-14 object-cover rounded flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#2B1E17] truncate">{tour.title}</div>
                    <div className="text-xs text-gray-500">{tour.region} · {tour.season} · {tour.durationDays}D/{tour.durationNights}N</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleEdit(tour)} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">Edit</button>
                      <button onClick={() => handleDelete(tour)} className="text-xs px-2 py-1 border border-red-300 text-red-700 rounded hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="bg-white rounded-lg shadow-sm border">

            {/* Tabs — only when editing */}
            {isEditing && (
              <div className="flex border-b">
                {(['basic', 'details', 'itinerary'] as AdminTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-b-2 border-[#2B1E17] text-[#2B1E17]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'basic' ? 'Basic Info' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            )}

            <div className="p-4">

              {/* ── Basic Info tab ── */}
              {(!isEditing || activeTab === 'basic') && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium text-[#2B1E17]">{isEditing ? 'Edit Tour' : 'Create Tour'}</h2>
                    {isEditing && <button onClick={resetForm} className="text-xs text-gray-500 hover:underline">Cancel</button>}
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                    <input name="title" value={form.title} onChange={handleInputChange} placeholder="Title *" required className="w-full border p-2 rounded" />
                    <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" className="w-full border p-2 rounded" />
                    <select name="region" value={form.region} onChange={handleInputChange} required className="w-full border p-2 rounded bg-white">
                      <option value="">Select Region *</option>
                      {REGIONS.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Types * (Ctrl/Cmd for multi-select)</label>
                      <select multiple value={selectedTypes} onChange={handleTypesChange} className="w-full border p-2 rounded bg-white min-h-[72px]">
                        {TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <select name="season" value={form.season} onChange={handleInputChange} required className="w-full border p-2 rounded bg-white">
                      <option value="">Select Season *</option>
                      {SEASONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" name="durationDays" value={form.durationDays} onChange={handleInputChange} placeholder="Days *" required className="border p-2 rounded" />
                      <input type="number" name="durationNights" value={form.durationNights} onChange={handleInputChange} placeholder="Nights *" required className="border p-2 rounded" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Photo {!isEditing && '*'}</label>
                      <input type="file" accept="image/*" onChange={handleFileChange} required={!isEditing} />
                      {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded border" />}
                    </div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="isCustom" checked={form.isCustom} onChange={handleInputChange} />
                      Custom Tour
                    </label>
                    <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#2B1E17] text-white rounded text-sm disabled:opacity-60">
                      {submitting ? 'Saving…' : isEditing ? 'Update Tour' : 'Create Tour'}
                    </button>
                  </form>
                </>
              )}

              {/* ── Details tab ── */}
              {isEditing && activeTab === 'details' && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium text-[#2B1E17]">
                      Tour Details
                      {detailsExists
                        ? <span className="ml-2 text-xs text-green-600 font-normal">● Saved</span>
                        : <span className="ml-2 text-xs text-gray-400 font-normal">● Not created yet</span>}
                    </h2>
                  </div>
                  {detailsError && <p className="text-xs text-red-600 mb-2">{detailsError}</p>}
                  {detailsLoading ? <p className="text-sm text-gray-400">Loading details…</p> : (
                    <form onSubmit={handleDetailsSubmit} className="space-y-3 text-sm">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Overview *</label>
                        <textarea name="overview" value={detailsForm.overview} onChange={handleDetailsInput} rows={4} required className="w-full border p-2 rounded" placeholder="Tour overview…" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Highlights * (one per line)</label>
                        <textarea name="highlights" value={detailsForm.highlights} onChange={handleDetailsInput} rows={4} required className="w-full border p-2 rounded font-mono text-xs" placeholder="Visit Pangong Lake&#10;Cross Khardung La" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Inclusions * (one per line)</label>
                        <textarea name="inclusions" value={detailsForm.inclusions} onChange={handleDetailsInput} rows={3} required className="w-full border p-2 rounded font-mono text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Exclusions * (one per line)</label>
                        <textarea name="exclusions" value={detailsForm.exclusions} onChange={handleDetailsInput} rows={3} required className="w-full border p-2 rounded font-mono text-xs" />
                      </div>
                      <hr />
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Optional</p>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Accommodation Description</label>
                        <textarea name="accommodationDescription" value={detailsForm.accommodationDescription} onChange={handleDetailsInput} rows={2} className="w-full border p-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Accommodation Media URL</label>
                        <input name="accommodationMediaUrl" value={detailsForm.accommodationMediaUrl} onChange={handleDetailsInput} type="url" className="w-full border p-2 rounded" placeholder="https://…" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Feature Description</label>
                        <textarea name="featureDescription" value={detailsForm.featureDescription} onChange={handleDetailsInput} rows={2} className="w-full border p-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Feature Media URL</label>
                        <input name="featureMediaUrl" value={detailsForm.featureMediaUrl} onChange={handleDetailsInput} type="url" className="w-full border p-2 rounded" placeholder="https://…" />
                      </div>
                      <label className="flex items-center gap-2 text-xs">
                        <input type="checkbox" name="featureIsVideo" checked={detailsForm.featureIsVideo} onChange={handleDetailsInput} />
                        Feature media is a video
                      </label>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Route Description</label>
                        <textarea name="routeDescription" value={detailsForm.routeDescription} onChange={handleDetailsInput} rows={2} className="w-full border p-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Route Photo URL</label>
                        <input name="routePhotoUrl" value={detailsForm.routePhotoUrl} onChange={handleDetailsInput} type="url" className="w-full border p-2 rounded" placeholder="https://…" />
                      </div>
                      <button type="submit" disabled={detailsSubmitting} className="px-4 py-2 bg-[#2B1E17] text-white rounded text-sm disabled:opacity-60">
                        {detailsSubmitting ? 'Saving…' : detailsExists ? 'Update Details' : 'Create Details'}
                      </button>
                    </form>
                  )}
                </>
              )}

              {/* ── Itinerary tab ── */}
              {isEditing && activeTab === 'itinerary' && (
                <>
                  <h2 className="font-medium text-[#2B1E17] mb-3">
                    Itinerary
                    <span className="ml-2 text-xs text-gray-400 font-normal">({itinerary.length} day{itinerary.length !== 1 ? 's' : ''} added)</span>
                  </h2>
                  {itineraryError && <p className="text-xs text-red-600 mb-2">{itineraryError}</p>}
                  {itineraryLoading ? <p className="text-sm text-gray-400">Loading itinerary…</p> : (
                    <>
                      {itinerary.length > 0 && (
                        <ul className="space-y-2 mb-4 max-h-52 overflow-y-auto">
                          {itinerary.map((d) => (
                            <li key={d.dayNumber} className={`border rounded p-2 text-sm flex items-start justify-between gap-2 ${editingDayNumber === d.dayNumber ? 'border-[#2B1E17] bg-[#FAF8F5]' : ''}`}>
                              <div className="flex items-start gap-2 min-w-0">
                                {d.imageUrl && <img src={d.imageUrl} alt={`Day ${d.dayNumber}`} className="w-10 h-10 object-cover rounded flex-shrink-0" />}
                                <div className="min-w-0">
                                  <span className="font-semibold text-[#2B1E17] text-xs">Day {d.dayNumber}</span>
                                  <p className="text-xs text-gray-500 line-clamp-2">{d.description}</p>
                                </div>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <button onClick={() => handleEditDay(d)} className="text-xs px-2 py-0.5 border rounded hover:bg-gray-50">Edit</button>
                                <button onClick={() => handleDeleteDay(d.dayNumber)} disabled={daySubmitting} className="text-xs px-2 py-0.5 border border-red-300 text-red-700 rounded hover:bg-red-50">Del</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <form onSubmit={handleDaySubmit} className="space-y-2 border-t pt-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          {editingDayNumber !== null ? `Editing Day ${editingDayNumber}` : 'Add Day'}
                        </p>
                        {editingDayNumber === null && (
                          <input name="dayNumber" type="number" min={1} value={dayForm.dayNumber} onChange={handleDayInput} placeholder="Day number *" required className="w-full border p-2 rounded text-sm" />
                        )}
                        <textarea name="description" value={dayForm.description} onChange={handleDayInput} rows={3} placeholder="Description *" required className="w-full border p-2 rounded text-sm" />
                        <input name="imageUrl" type="url" value={dayForm.imageUrl} onChange={handleDayInput} placeholder={editingDayNumber !== null ? 'Image URL (leave blank to keep)' : 'Image URL *'} required={editingDayNumber === null} className="w-full border p-2 rounded text-sm" />
                        <div className="flex gap-2">
                          <button type="submit" disabled={daySubmitting} className="px-3 py-1.5 bg-[#2B1E17] text-white rounded text-sm disabled:opacity-60">
                            {daySubmitting ? 'Saving…' : editingDayNumber !== null ? 'Update Day' : 'Add Day'}
                          </button>
                          {editingDayNumber !== null && (
                            <button type="button" onClick={() => { setEditingDayNumber(null); setDayForm(emptyDayForm); }} className="px-3 py-1.5 border rounded text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                          )}
                        </div>
                      </form>
                    </>
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;