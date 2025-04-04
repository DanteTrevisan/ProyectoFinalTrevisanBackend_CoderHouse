import fileUploader from "../utils/fileUploader.js";

export const uploadFields = fileUploader.fields([
  { name: "profiles", maxCount: 10 },
  { name: "products", maxCount: 10 },
  { name: "documents", maxCount: 10 },
]);
