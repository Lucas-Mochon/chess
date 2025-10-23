package usersService

import (
	"chesscom-copy/backend/db/models"
	usersDto "chesscom-copy/backend/internal/models/users/dto/users"
	usersRepository "chesscom-copy/backend/internal/models/users/repository/users"
	"chesscom-copy/backend/internal/utils"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	Repo *usersRepository.UserRepository
}

func (s *UserService) List() ([]models.Users, error) {
	return s.Repo.List()
}

func (s *UserService) Register(user usersDto.CreateUsersDTO) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return s.Repo.Register(user)
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
