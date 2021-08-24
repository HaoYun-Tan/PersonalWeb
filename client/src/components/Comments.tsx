import { useState, useEffect } from "react";
import CommentCard from './CommentCard'

export interface CommentItemData {
    id: number,
    title: string,
    text: string,
    abstract: string,
    created_at: string,
    updated_at: string,
    user_id: number,
    article_id: number
}

const emptyCommentItemData = (): CommentItemData =>({
    id: -1,
    title: "",
    text: "",
    abstract: "",
    created_at: "",
    updated_at: "",
    user_id : -1,
    article_id: -1
})

interface CommentsProps {
    articleId: number
}

function Comments(props: CommentsProps) {
    const {articleId} = props
    const [commentsData, setCommentsData] = useState<CommentItemData[]>([])
    useEffect(() => {
        fetch(`http://localhost:8080/api/articles/${articleId}/comments?user_id=${1}`)
        .then(rsp => rsp.json())
        .then(json => {
            const comments_briefs = json.data.map((item: any) => {
                return { id: item.ID, title: item.Title, text: "", abstract: item.Abstract, created_at: item.CreatedAt, updated_at: item.UpdatedAt, user_id: item.UserId, article_id: articleId }
            })
            setCommentsData(comments_briefs)
        })
        .catch(e => {
            console.log(e)
        });
    }, [articleId])

    return (
        <div>
        {
            commentsData.map(comment => 
                <CommentCard
                    key={comment.id}
                    data={comment}
                />
            )
        }
        </div>
    )
}

export default Comments;