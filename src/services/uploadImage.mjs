import toast from "react-hot-toast";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  // Show loading toast
  const toastId = toast.loading("Uploading...");

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      const imageUrl = data.data.url;

      toast.success("Image uploaded successfully!", {
        id: toastId,
        duration: 3000,
      });

      return imageUrl;
    } else {
      toast.error("Failed to upload image.", {
        id: toastId,
        duration: 3000,
      });
      return "";
    }
  } catch (error) {
    console.error("Error uploading image:", error);

    toast.error("An error occurred while uploading.", {
      id: toastId,
      duration: 3000,
    });

    return "";
  }
};

export default uploadImage;
