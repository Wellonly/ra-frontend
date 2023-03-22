
//returns base64 string or error object...
export const fileBlobToString64 = (file) => {
    if (!(file instanceof File)) {
        throw new Error('fileBlobToString64 params error');
    }
    const fp = new Promise((resolve, reject) => {
        const reader = new FileReader(); // reader.readAsDataURL(file.rawFile);
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return fp;
};

