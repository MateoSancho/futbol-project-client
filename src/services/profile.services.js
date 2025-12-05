// TEMPORARY FIX - Use a default upload preset
const CLOUD_NAME = 'dgd4d3qhx';

export const uploadToCloudinary = async (file) => {
  if (!file) {
    return { success: false, error: 'No file selected' };
  }

  // Try multiple possible upload preset names
  const possiblePresets = [
    'barca_players',     // Your preset (when you create it)
    'unsigned',          // Default unsigned preset
    'ml_default',        // Common default
    'football_pedia',    // Alternative name
    'default'            // Basic default
  ];

  let lastError = null;
  
  // Try each preset until one works
  for (const preset of possiblePresets) {
    try {
      console.log(`Trying upload preset: ${preset}`);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset);
      formData.append('cloud_name', CLOUD_NAME);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        console.log(`Success with preset: ${preset}`);
        return {
          success: true,
          imageUrl: data.secure_url,
          publicId: data.public_id
        };
      }
      
      if (data.error && data.error.message.includes('preset')) {
        lastError = data.error.message;
        continue; // Try next preset
      }
      
    } catch (error) {
      lastError = error.message;
      continue;
    }
  }
  
  // If all presets fail
  return { 
    success: false, 
    error: `All upload presets failed. Last error: ${lastError || 'Unknown'}` 
  };
};