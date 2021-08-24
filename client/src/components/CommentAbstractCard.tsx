import "./CommentAbstractCard.css"
import { Button } from 'react-bootstrap'
import { CommentBriefItem } from './Comments'

interface CommentAbstractCardData {
    data: CommentBriefItem
}

function CommentAbstractCard(props: CommentAbstractCardData) {
    const { data } = props
    
    return(
        <div className = "CommentAbstractCard">
            <div className = "CommentAbstractCard_title">
                {data.title}
            </div>
            <div className = "CommentAbstractCard_abstract">
                {data.abstract}
            </div>
            <div className = "CommentAbstractCard_Button">
                <Button variant="outline-info" onClick = {e => ReadMoreBtnOnClick(data)}>
                Read More
                 </Button>
            </div>
            
        </div>
    )
}

function ReadMoreBtnOnClick(data: CommentBriefItem){
    // const comment_id = data.id
    // data.setEventShowFullComment({id: comment_id, show: true})
}

export default CommentAbstractCard;