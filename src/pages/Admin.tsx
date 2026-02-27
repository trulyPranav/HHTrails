import { useEffect, useState } from 'react';
import type React from 'react';
import { toursService } from '../services/toursService';
import { storageService } from '../services/storageService';
import type { Tour } from '../types/tour';

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

const AdminPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LIST */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="font-medium mb-3">Existing Tours</h2>
            {tours.map((tour) => (
              <div key={tour.id} className="border p-3 rounded mb-3">
                {tour.photoUrl && (
                  <img
                    src={tour.photoUrl}
                    alt={tour.title}
                    className="w-24 h-24 object-cover rounded mb-2"
                  />
                )}
                <div className="font-semibold">{tour.title}</div>
                <div className="text-xs text-gray-500">
                  {tour.region} · {tour.durationDays}D/{tour.durationNights}N
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(tour)}>Edit</button>
                  <button onClick={() => handleDelete(tour)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="font-medium mb-3">
              {isEditing ? 'Edit Tour' : 'Create Tour'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <input name="title" value={form.title} onChange={handleInputChange} placeholder="Title" required className="w-full border p-2 rounded" />

              <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" className="w-full border p-2 rounded" />

              <select name="region" value={form.region} onChange={handleInputChange} required className="w-full border p-2 rounded">
                <option value="">Select Region</option>
                {REGIONS.map(r => <option key={r}>{r}</option>)}
              </select>

              <select multiple value={selectedTypes} onChange={handleTypesChange} className="w-full border p-2 rounded">
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>

              <select name="season" value={form.season} onChange={handleInputChange} required className="w-full border p-2 rounded">
                <option value="">Select Season</option>
                {SEASONS.map(s => <option key={s}>{s}</option>)}
              </select>

              <input type="number" name="durationDays" value={form.durationDays} onChange={handleInputChange} placeholder="Days" required className="w-full border p-2 rounded" />

              <input type="number" name="durationNights" value={form.durationNights} onChange={handleInputChange} placeholder="Nights" required className="w-full border p-2 rounded" />

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block mb-1">Upload Image *</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required={!isEditing} />
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />
                )}
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="isCustom" checked={form.isCustom} onChange={handleInputChange} />
                Custom Tour
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-[#2B1E17] text-white rounded"
              >
                {submitting ? 'Saving…' : isEditing ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;