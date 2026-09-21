const repository = require('./tbanner.repositories');

exports.addBanner = (file) => repository.addBanner(file);
exports.showBanners = () => repository.showBanners();
exports.updateBanner = (id, file) => repository.updateBanner(id, file);
exports.deleteBanner = (id) => repository.deleteBanner(id);
