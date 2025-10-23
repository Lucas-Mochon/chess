package usersService

import (
	"chesscom-copy/backend/db/models"
	usersDto "chesscom-copy/backend/internal/models/users/dto/users"
	userStatsRepository "chesscom-copy/backend/internal/models/users/repository/userStats"
	usersRepository "chesscom-copy/backend/internal/models/users/repository/users"
	"chesscom-copy/backend/internal/utils"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	Repo                *usersRepository.UserRepository
	UserStatsRepository *userStatsRepository.UserStatsRepository
}

func (s *UserService) List() ([]models.Users, error) {
	return s.Repo.List()
}

func (s *UserService) Register(user usersDto.CreateUsersDTO) (models.Users, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return models.Users{}, err
	}
	user.Password = string(hashedPassword)

	createdUser, err := s.Repo.Register(user)
	if err != nil {
		return models.Users{}, err
	}

	err = s.UserStatsRepository.InitializedStats(createdUser.Id)
	if err != nil {
		return models.Users{}, err
	}

	return createdUser, nil
}

func (s *UserService) Login(user usersDto.UsersLoginDTO) (string, error) {
	dbUser, err := s.Repo.Login(user)
	if err != nil {
		return "", err
	}

	token, err := utils.GenerateJWT(dbUser.Id, dbUser.Email)
	if err != nil {
		return "", err
	}

	return token, nil
}
