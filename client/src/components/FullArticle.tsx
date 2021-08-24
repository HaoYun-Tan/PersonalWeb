import "./FullArticle.css"
import {useState, useEffect, useLayoutEffect, useRef } from 'react'
import CloseBtnImg from '../assets/img/CloseButton.png';
import Comments from "./Comments";
interface FullArticleData {
    id: number
    setEventShowFullArticle: any
}

interface ArticleData {
    id: number,
    title: string,
    text: string,
    createdAt: string,
    updatedAt: string
}

const emptyArticleData = (): ArticleData => ({
    id: -1,
    title: '',
    text: '',
    createdAt: '',
    updatedAt: ''
})

function FullArticle(props: FullArticleData){
    const { id, setEventShowFullArticle} = props;
    const [articleData, setArticleData] = useState<ArticleData>(emptyArticleData)
    const [hasPermission, setHasPermission] = useState<boolean>(false)

    const selfRef = useRef<HTMLInputElement>(null)
    useLayoutEffect(() => {
        if (selfRef.current) {
            const computedLeft = window.innerWidth / 2 - selfRef.current.getBoundingClientRect().width / 2;
            selfRef.current.style.left = `${computedLeft}px`
        }
    }, [])

    useEffect(() => {
        const user_id = 1
        fetch(`http://localhost:8080/api/article?article_id=${id}&user_id=${user_id}`)
            .then(rsp => {
                if (rsp.status === 200) {
                    setHasPermission(true)
                    return rsp.json()
                } else {
                    setHasPermission(false)
                    throw Error('no permission')
                }
            })
            .then(json => {
                const article_data = json.data

                setArticleData(
                    {
                        id: article_data.ID, 
                        title: article_data.Title, 
                        text: article_data.Text, 
                        createdAt: article_data.CreatedAt, 
                        updatedAt: article_data.UpdatedAt
                    }
                )
            })
            .catch(e => {
                console.log(e)
            })
        
        console.log(`requested article (id: ${id}) full data`)
    }, [id])

    return(
        <div ref={selfRef} className = "FullArticle">
            <div className = "FullArticle_top">
                <div>
                    <div>
                        <p> View Full Article </p>
                    </div>
                </div>
                <img
                    alt='Close'
                    src={CloseBtnImg}
                    className="FullArticle_CloseBtn"
                    onClick={() => {
                        setEventShowFullArticle({id: 0, show: false})
                    }}
                />
            </div>
            
            {
            hasPermission ? 
            (
                <>
                <div className  = "FullArticle_title">
                    {articleData.title}
                </div>
                <div className = "FullArticle_text">
                    {articleData.text}
                </div>

                <div>
                    ------
                </div>

                <Comments articleId={id}/>
                </>
            )
            :
            (
                <div>
                    No Permission
                </div>)
            }

            
        </div>
    );
}

export default FullArticle