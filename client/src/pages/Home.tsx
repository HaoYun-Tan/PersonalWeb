import {useEffect, useState} from 'react'
import ArticleAbstractCard from '../components/ArticleAbstractCard'
import FullArticle from '../components/FullArticle';

interface EventShowFullArticle {
    id: number
    show: boolean
}

interface ArticleBriefItem {
    id: number,
    title: string,
    abstract: string,
    created_at: string,
    updated_at: string,
    user_id: number
}

function Home() {
    const [eventShowFullArticle, setEventShowFullArticle] = useState<EventShowFullArticle>({id: 0, show: false});

    const [allArticleBriefs, setAllArticleBriefs] = useState<ArticleBriefItem[]>([]);
    const [isArticleBriefsChange, setIsArticleBriefsChange] = useState<boolean>(false);

    useEffect(() => {
        if (!isArticleBriefsChange) {
            fetch('http://localhost:8080/api/articles?user_id=1')
            .then(rsp => rsp.json())
            .then(json => {
                const article_briefs = json.data.map((item: any) => {
                    return { id: item.ID, title: item.Title, abstract: item.Abstract, created_at: item.CreatedAt, updated_at: item.UpdatedAt, user_id: item.UserId }
                })

                setAllArticleBriefs(article_briefs)
                setIsArticleBriefsChange(true)
            })
        }
        
    }, [allArticleBriefs, isArticleBriefsChange])

    return (
        <div>
            <p>
                Home
            </p>

            <div className = "Homebody">
            {
                allArticleBriefs.map( article =>
                    <ArticleAbstractCard 
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        abstract={article.abstract}
                        setEventShowFullArticle={setEventShowFullArticle}
                    />
                )
            }
            </div>
            {
                eventShowFullArticle.show ?
                    (<FullArticle
                        id={eventShowFullArticle.id}
                        setEventShowFullArticle={setEventShowFullArticle}
                    />)
                    :
                    (<></>)
            }
        </div>
    );
}

export default Home;