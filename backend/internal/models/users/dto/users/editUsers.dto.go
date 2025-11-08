package usersDto

type EditUsersDTO struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Picture  []byte `json:"picture"`
	Country  string `json:"country"`
}
