const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;

async function fileToWebp(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target?.result as string;
    };

    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            // File 생성 (확장자만 webp로)
            const webpFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".webp"),
              { type: "image/webp" }
            );
            resolve(webpFile);
          } else {
            reject(new Error("webp 변환 실패"));
          }
        },
        "image/webp",
        0.7 // 품질 (0~1)
      );
    };

    img.onerror = reject;
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

const uploadFile = async (file: File) => {
  const webpFile = await fileToWebp(file);
  const formData = new FormData();

  formData.append("file", webpFile);
  formData.append("upload_preset", "whoozmap");

  const responseData = await fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  return responseData;
};

export default uploadFile;
