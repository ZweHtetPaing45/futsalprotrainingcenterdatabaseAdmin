    const AppError = require('../../../utils/AppError');
const com = require('../../../config/com');
const uploader = require('@zwehtetpaing55/uploader');

const getPublicId = (imagePath) => {
	if (!imagePath) return null;

	const uploadsIndex = imagePath.indexOf('/uploads/');
	return uploadsIndex === -1
		? imagePath
		: imagePath.slice(uploadsIndex + '/uploads/'.length);
};

exports.addBanner = async (file) => {
	const result = await uploader.upload(file, 'banner');

	const [insertResult] = await com.pool.query(
		'INSERT INTO banner (image_path) VALUES (?)',
		[result.image_url]
	);

	if (!insertResult.affectedRows) {
		await uploader.delete(result.public_id);
		throw new AppError('Failed to add banner', 500);
	}

	return {
		id: insertResult.insertId,
		image_url: result.image_url,
		public_id: result.public_id
	};
};

exports.showBanners = async () => {
	const [banners] = await com.pool.query('SELECT * FROM banner ORDER BY id DESC');
	return banners;
};

exports.updateBanner = async (id, file) => {
	const [existing] = await com.pool.query(
		'SELECT image_path FROM banner WHERE id = ?',
		[id]
	);

	if (!existing.length) throw new AppError('Banner not found', 404);

	const result = await uploader.upload(file, 'banner');

	try {
		await com.pool.query(
			'UPDATE banner SET image_path = ? WHERE id = ?',
			[result.image_url, id]
		);
	} catch (error) {
		await uploader.delete(result.public_id);
		throw error;
	}

	const oldPublicId = getPublicId(existing[0].image_path);
	if (oldPublicId) {
		await uploader.delete(oldPublicId);
	}

	return result;
};

exports.deleteBanner = async (id) => {
	const [existing] = await com.pool.query(
		'SELECT image_path FROM banner WHERE id = ?',
		[id]
	);

	if (!existing.length) throw new AppError('Banner not found', 404);

	await com.pool.query('DELETE FROM banner WHERE id = ?', [id]);

	const publicId = getPublicId(existing[0].image_path);
	if (publicId) {
		await uploader.delete(publicId);
	}
};
