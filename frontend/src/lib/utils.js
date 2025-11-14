export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  
  // If it's already a full URL (http/https), return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the backend URL
  const backendUrl = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";
  return `${backendUrl}${imagePath}`;
};

