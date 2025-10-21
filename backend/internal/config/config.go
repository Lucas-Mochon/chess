package config

var jwtToken []byte = []byte("Token")

func SetJWTToken(secret string) {
	jwtToken = []byte(secret)
}

func GetJWTToken() []byte {
	return jwtToken
}
