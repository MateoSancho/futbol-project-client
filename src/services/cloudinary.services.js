// Direct Cloudinary upload service (no backend needed)
const CLOUD_NAME = 'dgd4d3qhx';
const UPLOAD_PRESET = 'barca_players'; // You need to create this

export const uploadToCloudinary = async (file) => {
  // Validate file
  if (!file) {
    return { success: false, error: 'No file selected' };
  }

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'File too large. Max 5MB' };
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { success: false, error: 'Invalid file type. Use JPG, PNG, or WEBP' };
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', CLOUD_NAME);
  formData.append('folder', 'barca-players');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (data.error) {
      return { 
        success: false, 
        error: data.error.message || 'Upload failed' 
      };
    }

    return {
      success: true,
      imageUrl: data.secure_url,
      publicId: data.public_id,
      thumbnail: data.thumbnail_url || data.secure_url
    };

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { 
      success: false, 
      error: 'Network error. Please try again.' 
    };
  }
};