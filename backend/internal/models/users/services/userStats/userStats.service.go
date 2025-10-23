package userStatsService

import userStatsRepository "chesscom-copy/backend/internal/models/users/repository/userStats"

type UserStatsService struct {
	UserStatsRepository *userStatsRepository.UserStatsRepository
}

func (s *UserStatsService) InitializedStats(userId int) error {
	return s.UserStatsRepository.InitializedStats(userId)
}
