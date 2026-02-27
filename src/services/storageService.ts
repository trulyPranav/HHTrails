import { supabase } from '../lib/supabaseClient';

const BUCKET_NAME = 'tour-images';

class StorageService {

  /**
   * Upload image to Supabase Storage
   * Returns public URL
   */
  async uploadTourImage(file: File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `tours/${fileName}`;

    // Upload file
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw new Error('Failed to upload image');
    }

    // Get public URL
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log('Uploaded image URL:', data.publicUrl);

    return data.publicUrl;
  }

  /**
   * Delete image from storage using full public URL
   */
  async deleteImageByUrl(publicUrl: string): Promise<void> {
    try {
      const filePath = this.extractPathFromUrl(publicUrl);

      if (!filePath) return;

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
      }
    } catch (err) {
      console.error('Delete image failed:', err);
    }
  }

  /**
   * Extract storage file path from Supabase public URL
   * Example:
   * https://xyz.supabase.co/storage/v1/object/public/tour-images/tours/abc.jpg
   * → tours/abc.jpg
   */
  private extractPathFromUrl(url: string): string | null {
    try {
      const parts = url.split(`/object/public/${BUCKET_NAME}/`);
      return parts[1] || null;
    } catch {
      return null;
    }
  }
}

export const storageService = new StorageService();