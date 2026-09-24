const AppError = require('../../../utils/AppError');
const service = require('./tmanagement.service');

class TournamentManagementController {
	async addTournament(req, res, next) {
		try {
			res.status(201).json({ status: 'success', data: await service.addTournament(req.body, req.file) });
		} catch (error) {
			next(error);
		}
	}

	async showTournaments(req, res, next) {
		try {
			res.status(200).json({ status: 'success', data: await service.showTournaments() });
		} catch (error) {
			next(error);
		}
	}

	async showTournament(req, res, next) {
		try {
			res.status(200).json({ status: 'success', data: await service.showTournament(req.params.id) });
		} catch (error) {
			next(error);
		}
	}

	async updateTournament(req, res, next) {
		try {
			if (!req.params.id) throw new AppError('Tournament ID is required', 400);
			res.status(200).json({ status: 'success', data: await service.updateTournament(req.params.id, req.body, req.file) });
		} catch (error) {
			next(error);
		}
	}

	async deleteTournament(req, res, next) {
		try {
			await service.deleteTournament(req.params.id);
			res.status(200).json({ status: 'success', message: 'Tournament deleted successfully' });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TournamentManagementController();
