import { useState, useEffect } from "react";
import CommentAbstractCard from './CommentAbstractCard'

export interface CommentBriefItem {
    id: number,
    title: string,
    abstract: string,
    created_at: string,
    updated_at: string,
    user_id: number,
    article_id: number
}

const emptyCommentBriefItem = (): CommentBriefItem =>({
    id: -1,
    title: "",
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
    const [commentsData, setCommentsData] = useState<CommentBriefItem[]>([])
    useEffect(() => {
        fetch(`http://localhost:8080/api/articles/${articleId}/comments?user_id=${1}`)
        .then(rsp => {
            console.log('#####', rsp)
            return rsp.json()
        })
        .then(json => {
            const comments_briefs = json.data.map((item: any) => {
                return { id: item.ID, title: item.Title, abstract: item.Abstract, created_at: item.CreatedAt, updated_at: item.UpdatedAt, user_id: item.UserId, article_id: articleId }
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
                <CommentAbstractCard
                    key={comment.id}
                    data={comment}
                />
            )
        }
        </div>
    )
}

export default Comments;