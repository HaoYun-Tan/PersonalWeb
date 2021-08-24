import "./CommentCard.css"
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { CommentItemData } from './Comments'

interface CommentCardData {
    data: CommentItemData
}

function CommentCard(props: CommentCardData) {
    const { data } = props

    const [isExpanded, setIsExpanded] = useState(false)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    
    return(
        <div className = "CommentCard">
            <div className = "CommentCard_title">
                {title}
            </div>
            
            <div className = "CommentCard_text">
                { 
                isExpanded ? 
                (text === "" ? data.abstract : text) 
                : 
                data.abstract
                }
            </div>

            <div className = "CommentCard_Button">
                <Button 
                    variant="outline-info" 
                    onClick = {e => ToggleExpandBtnOnClick({comment_id: data.id, setTitle: setTitle, setText: setText, isExpanded: isExpanded, setIsExpanded: setIsExpanded})}
                >
                    {isExpanded ? 'Collapse' : 'Expand'}
                </Button>
            </div>
            
        </div>
    )
}

interface ToggleExpandBtnOnClickProps {
    comment_id: number,
    setTitle: any,
    setText: any,
    isExpanded: boolean,
    setIsExpanded: any
}

function ToggleExpandBtnOnClick(props: ToggleExpandBtnOnClickProps){
    const {comment_id, setTitle, setText, isExpanded, setIsExpanded} = props

    if (isExpanded) {
        setIsExpanded(false);
        return
    }

    fetch(`http://localhost:8080/api/comments/${comment_id}?user_id=${1}`)
        .then(rsp => rsp.json())
        .then(json => {
            const item = json.data
            const comment_full = { id: item.ID, title: item.Title, abstract: item.Abstract, text: item.Text, created_at: item.CreatedAt, updated_at: item.UpdatedAt, user_id: item.UserId }

            setTitle(comment_full.title)
            setText(comment_full.text)

            setIsExpanded(true)
        })
        .catch(e => {
            console.log(e)
        });
}

export default CommentCard;