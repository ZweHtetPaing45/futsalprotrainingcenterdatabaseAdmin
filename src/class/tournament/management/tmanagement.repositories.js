const AppError = require('../../../utils/AppError');
const com = require('../../../config/com');
const uploader = require('@zwehtetpaing55/uploader');

const uploadFolder = 'tmanagement-banner';

const getPublicId = (imagePath) => {
	if (!imagePath) return null;

	const uploadsIndex = imagePath.indexOf('/uploads/');
	return uploadsIndex === -1
		? imagePath
		: imagePath.slice(uploadsIndex + '/uploads/'.length);
};

const validateReferences = async (data) => {
	const references = [
		['match_formats', data.match_format_id, 'match_format_id'],
		['tournament_statuses', data.status_id, 'status_id']
	];
	if (data.court_category_id) references.push(['venue', data.court_category_id, 'court_category_id']);
	if (data.court_id) references.push(['court', data.court_id, 'court_id']);

	for (const [table, id, field] of references) {
		const [rows] = await com.pool.query(`SELECT id FROM ${table} WHERE id = ?`, [id]);
		if (!rows.length) throw new AppError(`${field} does not reference an existing record`, 400);
	}
};

const getTournament = async (connection, id) => {
	const [rows] = await connection.query(
		`SELECT t.*, mf.name AS match_format_name, v.venue_name AS court_category_name,
			c.court_name AS court_name, ts.name AS status_name
		 FROM tournaments t
		 LEFT JOIN match_formats mf ON mf.id = t.match_format_id
		 LEFT JOIN venue v ON v.id = t.court_category_id
		 LEFT JOIN court c ON c.id = t.court_id
		 LEFT JOIN tournament_statuses ts ON ts.id = t.status_id
		 WHERE t.id = ?`,
		[id]
	);

	if (!rows.length) throw new AppError('Tournament not found', 404);

	const [rankPoints] = await connection.query(
		`SELECT id, rank_position, points
		 FROM tournament_rank_points
		 WHERE tournament_id = ?
		 ORDER BY rank_position`,
		[id]
	);

	return { ...rows[0], rank_points: rankPoints };
};

exports.addTournament = async (data, file) => {
	await validateReferences(data);
	let uploadResult;
	if (file) uploadResult = await uploader.upload(file, uploadFolder);

	const connection = await com.pool.getConnection();
	try {
		await connection.beginTransaction();
		const [insertResult] = await connection.query(
			`INSERT INTO tournaments
			(tournament_name, rules_description, banner_photo, match_format_id,
			 court_category_id, court_id, start_date, end_date, tournament_time,
			 tournament_address, tournament_fee, max_participants, status_id)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[data.tournament_name, data.rules_description || null, uploadResult?.image_url || null,
			 data.match_format_id, data.court_category_id || null, data.court_id || null,
			 data.start_date, data.end_date, data.tournament_time || null,
			 data.tournament_address || null, data.tournament_fee, data.max_participants || null,
			 data.status_id]
		);

		for (const rank of data.rank_points) {
			await connection.query(
				'INSERT INTO tournament_rank_points (tournament_id, rank_position, points) VALUES (?, ?, ?)',
				[insertResult.insertId, rank.rank_position, rank.points]
			);
		}

		await connection.commit();
		return await getTournament(connection, insertResult.insertId);
	} catch (error) {
		await connection.rollback();
		if (uploadResult) await uploader.delete(uploadResult.public_id);
		throw error;
	} finally {
		connection.release();
	}
};

exports.showTournaments = async () => {
	const [rows] = await com.pool.query(
		`SELECT t.*, mf.name AS match_format_name, v.venue_name AS court_category_name,
			c.court_name AS court_name, ts.name AS status_name
		 FROM tournaments t
		 LEFT JOIN match_formats mf ON mf.id = t.match_format_id
		 LEFT JOIN venue v ON v.id = t.court_category_id
		 LEFT JOIN court c ON c.id = t.court_id
		 LEFT JOIN tournament_statuses ts ON ts.id = t.status_id
		 ORDER BY t.id DESC`
	);

	for (const tournament of rows) {
		const [rankPoints] = await com.pool.query(
			`SELECT id, rank_position, points FROM tournament_rank_points
			 WHERE tournament_id = ? ORDER BY rank_position`,
			[tournament.id]
		);
		tournament.rank_points = rankPoints;
	}

	return rows;
};

exports.showTournament = async (id) => getTournament(com.pool, id);

exports.updateTournament = async (id, data, file) => {
	const [existingRows] = await com.pool.query(
		'SELECT banner_photo FROM tournaments WHERE id = ?',
		[id]
	);
	if (!existingRows.length) throw new AppError('Tournament not found', 404);
	await validateReferences(data);

	let uploadResult;
	if (file) uploadResult = await uploader.upload(file, uploadFolder);

	const connection = await com.pool.getConnection();
	try {
		await connection.beginTransaction();
		await connection.query(
			`UPDATE tournaments SET tournament_name = ?, rules_description = ?,
			 banner_photo = ?, match_format_id = ?, court_category_id = ?, court_id = ?,
			 start_date = ?, end_date = ?, tournament_time = ?, tournament_address = ?,
			 tournament_fee = ?, max_participants = ?, status_id = ? WHERE id = ?`,
			[data.tournament_name, data.rules_description || null,
			 uploadResult?.image_url || existingRows[0].banner_photo,
			 data.match_format_id, data.court_category_id || null, data.court_id || null,
			 data.start_date, data.end_date, data.tournament_time || null,
			 data.tournament_address || null, data.tournament_fee, data.max_participants || null,
			 data.status_id, id]
		);

		await connection.query('DELETE FROM tournament_rank_points WHERE tournament_id = ?', [id]);
		for (const rank of data.rank_points) {
			await connection.query(
				'INSERT INTO tournament_rank_points (tournament_id, rank_position, points) VALUES (?, ?, ?)',
				[id, rank.rank_position, rank.points]
			);
		}

		await connection.commit();
		if (uploadResult && existingRows[0].banner_photo) {
			const oldPublicId = getPublicId(existingRows[0].banner_photo);
			if (oldPublicId) await uploader.delete(oldPublicId);
		}
		return await getTournament(connection, id);
	} catch (error) {
		await connection.rollback();
		if (uploadResult) await uploader.delete(uploadResult.public_id);
		throw error;
	} finally {
		connection.release();
	}
};

exports.deleteTournament = async (id) => {
	const [existingRows] = await com.pool.query(
		'SELECT banner_photo FROM tournaments WHERE id = ?',
		[id]
	);
	if (!existingRows.length) throw new AppError('Tournament not found', 404);

	const [deleteResult] = await com.pool.query('DELETE FROM tournaments WHERE id = ?', [id]);
	if (!deleteResult.affectedRows) throw new AppError('Failed to delete tournament', 500);

	const publicId = getPublicId(existingRows[0].banner_photo);
	if (publicId) await uploader.delete(publicId);
};
