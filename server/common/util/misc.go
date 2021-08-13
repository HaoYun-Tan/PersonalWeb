package util

func GenerateAbstract(fulltext string, maxAbstractLen int) string {

	if len(fulltext) < maxAbstractLen {
		maxAbstractLen = len(fulltext)
	}

	return fulltext[0 : maxAbstractLen-1]
}
