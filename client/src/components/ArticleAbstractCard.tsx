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
                Read More
                 </Button>
            </div>
            
        </div>
    )
}

function ReadMoreBtnOnClick(props: ArticleAbstractCardData){
    const article_id = props.id
    const user_id = 1
    fetch(`http://localhost:8080/api/article?article_id=${article_id}&user_id=${user_id}`)
        .then(rsp => rsp.json())
        .then(json => {
            const article_data = json.data

            props.setEventShowFullArticle({id: article_data.ID, title: article_data.Title, text: article_data.Text, created_at: article_data.CreatedAt, updated_at: article_data.UpdatedAt, show: true})
        })
}

export default ArticleAbstractCard;