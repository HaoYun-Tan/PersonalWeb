package util

func GenerateAbstract(fulltext string) string {
	maxAbstractLen := 512
	if len(fulltext) < maxAbstractLen {
		maxAbstractLen = len(fulltext)
	}

	return fulltext[0 : maxAbstractLen-1]
}
