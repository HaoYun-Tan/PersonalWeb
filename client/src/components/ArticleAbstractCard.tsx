interface ArticleAbstractCardData {
    title: string,
    abstract: string,
    text: string
}

function ArticleAbstractCard(props: ArticleAbstractCardData) {
    
    return(
        <div>
            {props.title}
        </div>
    )
}

export default ArticleAbstractCard;