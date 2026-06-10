import api from "../../../app/api/axios";
export const Upload = async (
  $file: File,
  setPercentage: (e: any) => void,
  setCompleted: (e: boolean) => void
) => {
  const formData = new FormData();
  formData.append("file", $file);
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e) => {
        if (!e.total) return;
        const pct = Math.round((e.loaded * 100) / e.total);
        console.log(pct)
        setPercentage?.(pct);
        setCompleted(true);
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};
