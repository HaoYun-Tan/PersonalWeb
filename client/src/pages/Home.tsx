import {useEffect, useState} from 'react'
import test_articles from '../data/test/articles.json'
import ArticleAbstractCard from '../components/ArticleAbstractCard'
import FullArticle from '../components/FullArticle';

interface EventShowFullArticle {
    title: string,
    text: string,
    show: boolean
}
function Home(){
    const [eventShowFullArticle, setEventShowFullArticle] = useState<EventShowFullArticle>({title: '', text: '', show: false});

    return(
        <div>
            <p>
                Home
            </p>

            <div className = "Homebody">
            {
                test_articles.data.map( article =>
                    <ArticleAbstractCard 
                        title={article.title}
                        text={article.text}
                        abstract={article.abstract}
                        setEventShowFullArticle={setEventShowFullArticle}
                    />
                )
            }
            </div>
            {
                eventShowFullArticle.show ?
                    (<FullArticle
                        title={eventShowFullArticle.title}
                        text={eventShowFullArticle.text}
                    />)
                    :
                    (<></>)
            }
        </div>
    );
}

export default Home;