package service

import (
	"chesscom-copy/backend/db/models"
	"chesscom-copy/backend/internal/utils"
	"chesscom-copy/backend/users/dto"
	"chesscom-copy/backend/users/repository"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	Repo *repository.UserRepository
}

func (s *UserService) List() ([]models.Users, error) {
	return s.Repo.List()
}

func (s *UserService) Register(user dto.CreateUsersDTO) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return s.Repo.Register(user)
}

func (s *UserService) Login(user dto.UsersLoginDTO) (string, error) {
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
