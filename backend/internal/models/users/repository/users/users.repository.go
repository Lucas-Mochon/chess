package usersRepository

import (
	"chesscom-copy/backend/db/models"
	usersDto "chesscom-copy/backend/internal/models/users/dto/users"
	"database/sql"
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type UserRepository struct {
	DB *sql.DB
}

func (r *UserRepository) List() ([]models.Users, error) {
	rows, err := r.DB.Query("SELECT id, username, email, country, picture FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.Users
	for rows.Next() {
		var u models.Users
		if err := rows.Scan(&u.Id, &u.Username, &u.Email, &u.Country, &u.Picture); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func (repository *UserRepository) GetByID(userID int) (*models.Users, error) {
	row := repository.DB.QueryRow("SELECT id, username, email, country, picture FROM users WHERE id = $1", userID)

	var user models.Users
	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.Country, &user.Picture)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) Register(user usersDto.CreateUsersDTO) (models.Users, error) {
	var createdUser models.Users

	err := r.DB.QueryRow(
		`INSERT INTO users (username, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, username, email`,
		user.Username, user.Email, user.Password,
	).Scan(&createdUser.Id, &createdUser.Username, &createdUser.Email)

	if err != nil {
		return models.Users{}, err
	}

	return createdUser, nil
}

func (r *UserRepository) Login(user usersDto.UsersLoginDTO) (*models.Users, error) {
	var dbUser models.Users

	err := r.DB.QueryRow(
		"SELECT id, email, password_hash FROM users WHERE email = $1",
		user.Email,
	).Scan(&dbUser.Id, &dbUser.Email, &dbUser.PasswordHash)

	if err != nil {
		return nil, fmt.Errorf("utilisateur non trouvé")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.PasswordHash), []byte(user.Password)); err != nil {
		return nil, fmt.Errorf("mot de passe incorrect")
	}

	return &dbUser, nil
}

func (r *UserRepository) Edit(userID int, userData usersDto.EditUsersDTO) error {
	setParts := []string{}
	args := []interface{}{}
	argIndex := 1

	if userData.Username != "" {
		setParts = append(setParts, fmt.Sprintf("username = $%d", argIndex))
		args = append(args, userData.Username)
		argIndex++
	}

	if userData.Email != "" {
		setParts = append(setParts, fmt.Sprintf("email = $%d", argIndex))
		args = append(args, userData.Email)
		argIndex++
	}

	if len(userData.Picture) > 0 {
		setParts = append(setParts, fmt.Sprintf("picture = $%d", argIndex))
		args = append(args, userData.Picture)
		argIndex++
	}

	if userData.Country != "" {
		setParts = append(setParts, fmt.Sprintf("country = $%d", argIndex))
		args = append(args, userData.Country)
		argIndex++
	}

	if len(setParts) == 0 {
		return fmt.Errorf("aucune donnée à mettre à jour")
	}

	query := fmt.Sprintf(`
		UPDATE users
		SET %s, updated_at = NOW()
		WHERE id = $%d
	`, strings.Join(setParts, ", "), argIndex)

	args = append(args, userID)

	_, err := r.DB.Exec(query, args...)
	return err
}
