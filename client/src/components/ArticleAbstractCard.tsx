import "./ArticleAbstractCard.css"
import { Button } from 'react-bootstrap'

interface ArticleAbstractCardData {
    id: number
    title: string,
    abstract: string,
    setEventShowFullArticle: any
}

function ArticleAbstractCard(props: ArticleAbstractCardData) {
    
    return(
        <div className = "ArticleAbstractCard">
            <div className = "ArticleAbstractCard_title">
                {props.title}
            </div>
            <div className = "ArticleAbstractCard_abstract">
                {props.abstract}
            </div>
            <div className = "ArticleAbstractCard_Button">
                <Button variant="outline-info" onClick = {e => ReadMoreBtnOnClick(props)}>
                    Expand
                </Button>
            </div>
            
        </div>
    )
}

function ReadMoreBtnOnClick(props: ArticleAbstractCardData){
    const article_id = props.id
    props.setEventShowFullArticle({id: article_id, show: true})
}

export default ArticleAbstractCard;