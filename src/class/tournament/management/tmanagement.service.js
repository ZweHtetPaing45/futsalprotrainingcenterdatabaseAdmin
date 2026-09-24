const AppError = require('../../../utils/AppError');
const repository = require('./tmanagement.repositories');

const parseRankPoints = (value) => {
	if (value === undefined || value === null || value === '') return [];
	let parsed;
	try {
		parsed = typeof value === 'string' ? JSON.parse(value) : value;
	} catch (error) {
		throw new AppError('rank_points must be valid JSON', 400);
	}
	if (!Array.isArray(parsed)) throw new AppError('rank_points must be an array', 400);

	const ranks = parsed.map((rank) => ({
		rank_position: Number(rank.rank_position ?? rank.rank),
		points: Number(rank.points)
	}));
	if (ranks.some((rank) => !Number.isInteger(rank.rank_position) || rank.rank_position < 1 ||
		!Number.isInteger(rank.points) || rank.points < 0)) {
		throw new AppError('Each rank point needs a positive rank_position and non-negative points', 400);
	}
	if (new Set(ranks.map((rank) => rank.rank_position)).size !== ranks.length) {
		throw new AppError('rank_position values must be unique', 400);
	}
	return ranks;
};

const normalize = (body) => {
	const data = { ...body };
	data.rank_points = parseRankPoints(body.rank_points);
	for (const field of ['match_format_id', 'court_category_id', 'court_id', 'status_id', 'max_participants']) {
		if (data[field] !== undefined && data[field] !== null && data[field] !== '') data[field] = Number(data[field]);
	}
	data.tournament_fee = Number(data.tournament_fee);
	if (!data.tournament_name || !data.start_date || !data.end_date || !Number.isInteger(data.match_format_id) ||
		!Number.isInteger(data.status_id) || !Number.isFinite(data.tournament_fee) || data.tournament_fee < 0) {
		throw new AppError('tournament_name, dates, match_format_id, status_id and a valid tournament_fee are required', 400);
	}
	if (data.max_participants !== undefined && data.max_participants !== null &&
		(!Number.isInteger(data.max_participants) || data.max_participants < 1)) {
		throw new AppError('max_participants must be a positive integer', 400);
	}
	return data;
};

exports.addTournament = (body, file) => repository.addTournament(normalize(body), file);
exports.showTournaments = () => repository.showTournaments();
exports.showMatchFormats = () => repository.showMatchFormats();
exports.showTournament = (id) => repository.showTournament(id);
exports.updateTournament = (id, body, file) => repository.updateTournament(id, normalize(body), file);
exports.deleteTournament = (id) => repository.deleteTournament(id);
