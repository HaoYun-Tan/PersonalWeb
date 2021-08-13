import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import './NewArticle.css'

function NewArticle() {
    const [articleTitle, setArticleTitle] = useState<string>('')
    const [articleText, setArticleText] = useState<string>('')
    return (
        <div className="NewArticleLayout">
            <Form>
                <Form.Group className="mb-3" controlId="formArticleTitle">
                    <Form.Control type="text" placeholder="Enter your article title" onChange={e => setArticleTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleText">
                    <Form.Control as="textarea" rows={30} placeholder="Article text" onChange={e => setArticleText(e.target.value)} />
                </Form.Group>

                <div className="NewArticleLayout-BtnCreateArticle">
                    <Button 
                        variant="primary"
                        size='lg' 
                        onClick={e => onCreateArticle(e, {articleTitle, articleText})}
                    >
                        CREATE ARTICLE
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default NewArticle;

interface CreateArticleProps {
    articleTitle: string,
    articleText: string
}

async function onCreateArticle(e: React.MouseEvent<HTMLElement, MouseEvent>, props: CreateArticleProps) {
    e.preventDefault();

    const req_options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: props.articleTitle,
            text: props.articleText,
            user_id: 1
        })
    }

    fetch('http://localhost:8868/api/article', req_options)
        .then(rsp => rsp.json())
        .then(data => {
            
        })
        .catch(e => {
            console.log(e)
        })
}