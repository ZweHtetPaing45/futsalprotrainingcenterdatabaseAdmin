const AppError = require('../../../utils/AppError');
const service = require('./banner.service');

class BannerController {
	async addBanner(req, res, next) {
		try {
			if (!req.file) throw new AppError('Banner image is required', 400);

			const result = await service.addBanner(req.file);
			res.status(201).json({ status: 'success', data: result });
		} catch (error) {
			next(error);
		}
	}

	async showBanners(req, res, next) {
		try {
			const result = await service.showBanners();
			res.status(200).json({ status: 'success', data: result });
		} catch (error) {
			next(error);
		}
	}

	async updateBanner(req, res, next) {
		try {
			if (!req.body.id) throw new AppError('Banner ID is required', 400);
			if (!req.file) throw new AppError('Banner image is required', 400);

			const result = await service.updateBanner(req.body.id, req.file);
			res.status(200).json({ status: 'success', data: result });
		} catch (error) {
			next(error);
		}
	}

	async deleteBanner(req, res, next) {
		try {
			await service.deleteBanner(req.params.id);
			res.status(200).json({ status: 'success', message: 'Banner deleted successfully' });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new BannerController();
