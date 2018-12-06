const mapPlatform = locale => ({ fields, sys }) => {
  const { title, imageName } = fields;
  const { id } = sys;
  return { title: title[locale], imageName: imageName[locale], id };
};

module.exports = {
  mapPlatform,
};
