import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import GlobalToast from '../components/GlobalToast';
import './NewArticleLayout.css'

enum ToastBody {
    TOAST_SUCCEED = 'Sucessfully created an article!',
    TOAST_FAILED = 'Failed created an article!'
}

interface NewArticleLayoutProps {
}

function NewArticleLayout(props: NewArticleLayoutProps) {
    const [articleTitle, setArticleTitle] = useState<string>('');
    const [articleText, setArticleText] = useState<string>('');

    const [showToast, setShowToast] = useState(false);
    const hideToast = () => setShowToast(false);
    const [toastBody, setToastBody] = useState<string>(ToastBody.TOAST_SUCCEED);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const history = useHistory()
    const redirectToHome = () => {
        let path = '/';
        history.push(path);
    }

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
                        onClick={e => onCreateArticle(e, {articleTitle, articleText, setShowToast, setToastBody, handleShowModal})}
                    >
                        CREATE ARTICLE
                    </Button>
                </div>
            </Form>

            <GlobalToast position='bottom-end' show={showToast} onClose={hideToast} toastBody={toastBody}/>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={ redirectToHome }>
                        Return Home
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NewArticleLayout;

interface CreateArticleProps {
    articleTitle: string,
    articleText: string,
    setShowToast: any,
    setToastBody: any,
    handleShowModal: any
}

async function onCreateArticle(e: React.MouseEvent<HTMLElement, MouseEvent>, props: CreateArticleProps) {
    e.preventDefault();

    const {articleTitle, articleText, setShowToast, setToastBody, handleShowModal} = props;

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
            if (rsp.status === 201) {
                handleShowModal()
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