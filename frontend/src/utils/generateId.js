let currentId = 1;

export const generateUniqueId = () => {
  const id = currentId;
  currentId += 1; // Increment the ID for the next call
  return id;
};
