import test_articles from '../data/test/articles.json'
import ArticleAbstractCard from '../components/ArticleAbstractCard'
function Home(){
    return(
        <div>
            <p>
                Home
            </p>

            <div>
            {
                
                test_articles.data.map( article =>
                    <ArticleAbstractCard 
                        title={article.title}
                        text={article.text}
                        abstract={article.abstract}
                    />
                )
            }
            </div>
        </div>
    );
}

export default Home;