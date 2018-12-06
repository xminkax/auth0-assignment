const includesSearchTerm = (searchTerm, platform) =>
  platform.title.toLowerCase().includes(searchTerm.toLowerCase());

const filter = (searchTerm, platforms) => {
  if (!platforms || platforms.length === 0) {
    return [];
  }
  const filtered = platforms
    .filter(platform => includesSearchTerm(searchTerm, platform));

  return filtered;
};

export default filter;
