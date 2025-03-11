export const useGroupsWorkspace = () => {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return {
    years,
  };
}