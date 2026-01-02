export const createFormData = (data: object) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value) && value[0] instanceof File) {
      if (value != null) {
        (value as File[]).forEach((v) => formData.append(key, v));
      }
    } else if (value instanceof File || typeof value === 'string') {
      formData.append(key, value);
    } else if (typeof value === 'boolean') {
      formData.append(key, value ? 'true' : 'false');
    } else {
      if (value != null) {
        formData.append(key, JSON.stringify(value));
      }
    }
  });

  return formData;
};
