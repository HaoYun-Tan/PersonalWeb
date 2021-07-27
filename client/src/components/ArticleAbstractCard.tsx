import "./ArticleAbstractCard.css"
import { Button } from 'react-bootstrap'

interface ArticleAbstractCardData {
    title: string,
    abstract: string,
    text: string,
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
                Read More
                 </Button>
            </div>
            
        </div>
    )
}

function ReadMoreBtnOnClick(props:ArticleAbstractCardData){
    props.setEventShowFullArticle({title: props.title, text: props.text, show: true})
}

export default ArticleAbstractCard;