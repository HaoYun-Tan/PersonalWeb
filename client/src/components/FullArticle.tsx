import "./FullArticle.css"

interface FullArticleData {
    title: string,
    text: string
}

function FullArticle(props:FullArticleData){
    return(

        <div className = "FullArticle">
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