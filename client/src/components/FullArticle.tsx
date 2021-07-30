import "./FullArticle.css"
import { useRef } from 'react'

interface FullArticleData {
    id: number
    title: string,
    text: string,
    created_at: string,
    updated_at: string
}

function FullArticle(props: FullArticleData){
    const { id, title, text, created_at, updated_at} = props;
    // const selfRef = useRef<>(null)

    // useEffect(() => {
    //     selfRef.current
    // }, [])

    return(
        <div ref={selfRef} className = "FullArticle">
            <div className  = "FullArticle_title">
                {props.title}
            </div>
            <div className = "FullArticle_text">
                {props.text}
            </div>
        </div>
    );
}

export default FullArticle