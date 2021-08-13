import React, { useState } from 'react'
import { Button, Form, Toast } from 'react-bootstrap';
import './NewArticle.css'

enum ToastBody {
    TOAST_SUCCEED = 'Sucessfully created an article!',
    TOAST_FAILED = 'Failed created an article!'
}

function NewArticle() {
    const [articleTitle, setArticleTitle] = useState<string>('')
    const [articleText, setArticleText] = useState<string>('')

    const [showToast, setShowToast] = useState(false);
    const hideToast = () => setShowToast(false);
    const [toastBody, setToastBody] = useState<string>(ToastBody.TOAST_SUCCEED);
    return (
        <div className="NewArticleLayout">
            <Form>
                <Form.Group className="mb-3" controlId="formArticleTitle">
                    <Form.Control type="text" placeholder="Enter your article title" onChange={e => setArticleTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleText">
                    <Form.Control as="textarea" rows={10} placeholder="Article text" onChange={e => setArticleText(e.target.value)} />
                </Form.Group>

                <div className="NewArticleLayout-BtnCreateArticle">
                    <Button 
                        variant="primary"
                        size='lg' 
                        onClick={e => onCreateArticle(e, {articleTitle, articleText, setShowToast, setToastBody})}
                    >
                        CREATE ARTICLE
                    </Button>
                </div>
            </Form>

            <Toast className='NewArticle-Toast' show={showToast} onClose={hideToast}>
                <Toast.Header>
                    <strong className="me-auto">Create Article</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>{toastBody}</Toast.Body>
            </Toast>
        </div>
    );
}

export default NewArticle;

interface CreateArticleProps {
    articleTitle: string,
    articleText: string,
    setShowToast: any,
    setToastBody: any
}

async function onCreateArticle(e: React.MouseEvent<HTMLElement, MouseEvent>, props: CreateArticleProps) {
    e.preventDefault();

    const {articleTitle, articleText, setShowToast, setToastBody} = props;

    const req_options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: articleTitle,
            text: articleText,
            user_id: 1
        })
    }

    fetch('http://localhost:8080/api/article', req_options)
        .then(rsp => { 
            if (rsp.status == 201) {
                setShowToast(true);
                setToastBody(ToastBody.TOAST_SUCCEED);
            } else {
                // faile to create
                setShowToast(true);
                setToastBody(ToastBody.TOAST_FAILED);
            }
        })
        .catch(e => {
            // exception
            console.log(e)

            setShowToast(true);
            setToastBody(ToastBody.TOAST_FAILED);
        })
}