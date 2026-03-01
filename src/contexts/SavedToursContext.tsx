import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { savedToursService } from '../services/savedToursService';
import type { SavedTour } from '../types/savedTours';
import { useAuth } from '../hooks/useAuth';

interface SavedToursContextType {
  savedTours: SavedTour[];
  savedIds: Set<string>;
  isLoading: boolean;
  isSaved: (tourId: string) => boolean;
  toggleSave: (tourId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const SavedToursContext = createContext<SavedToursContextType | undefined>(undefined);

export const useSavedTours = (): SavedToursContextType => {
  const ctx = useContext(SavedToursContext);
  if (!ctx) throw new Error('useSavedTours must be used within SavedToursProvider');
  return ctx;
};

export const SavedToursProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [savedTours, setSavedTours] = useState<SavedTour[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setSavedTours([]);
      setSavedIds(new Set());
      return;
    }
    try {
      setIsLoading(true);
      const data = await savedToursService.getSavedTours();
      setSavedTours(data.savedTours);
      setSavedIds(new Set(data.savedTours.map((s) => s.tour.id)));
    } catch {
      // silently ignore — network errors shouldn't block the UI
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch whenever auth state changes
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const isSaved = useCallback((tourId: string) => savedIds.has(tourId), [savedIds]);

  const toggleSave = useCallback(
    async (tourId: string) => {
      if (!isAuthenticated) return;

      if (savedIds.has(tourId)) {
        // Optimistic remove
        setSavedIds((prev) => { const n = new Set(prev); n.delete(tourId); return n; });
        setSavedTours((prev) => prev.filter((s) => s.tour.id !== tourId));
        try {
          await savedToursService.removeSavedTour(tourId);
        } catch {
          // Revert on failure
          await refresh();
        }
      } else {
        // Optimistic add (we don't have full tour object so just add id, full list comes from refresh)
        setSavedIds((prev) => new Set(prev).add(tourId));
        try {
          await savedToursService.saveTour(tourId);
          // Refresh to get the full saved tour object
          await refresh();
        } catch (err: any) {
          // 409 = already saved — treat as success
          if (err?.statusCode !== 409) {
            setSavedIds((prev) => { const n = new Set(prev); n.delete(tourId); return n; });
          }
        }
      }
    },
    [isAuthenticated, savedIds, refresh]
  );

  return (
    <SavedToursContext.Provider value={{ savedTours, savedIds, isLoading, isSaved, toggleSave, refresh }}>
      {children}
    </SavedToursContext.Provider>
  );
};
