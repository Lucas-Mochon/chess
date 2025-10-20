package echequier

import (
	"bytes"
	"image"
	"image/color"
	"image/draw"
	"image/png"
)

func GenerateEchiquierBytes() ([]byte, error) {
	const size = 8
	const squareSize = 80
	imgSize := size * squareSize

	img := image.NewRGBA(image.Rect(0, 0, imgSize, imgSize))

	white := color.RGBA{255, 255, 255, 255}
	black := color.RGBA{0, 0, 0, 255}

	for y := 0; y < size; y++ {
		for x := 0; x < size; x++ {
			c := white
			if (x+y)%2 == 0 {
				c = black
			}
			square := image.Rect(
				x*squareSize,
				y*squareSize,
				(x+1)*squareSize,
				(y+1)*squareSize,
			)
			draw.Draw(img, square, &image.Uniform{c}, image.Point{}, draw.Src)
		}
	}

	var buf bytes.Buffer
	if err := png.Encode(&buf, img); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
