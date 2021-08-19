import './GlobalToast.css'
import { Toast, ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';

interface ToastProps {
    position: ToastPosition,
    show: boolean,
    onClose: any,
    toastBody: string
}

function GlobalToast(props: ToastProps) {
    const { position, show, onClose, toastBody } = props;

    return (
        <ToastContainer className="p-3" position={position}>
            <Toast show={show} onClose={onClose}>
                <Toast.Header>
                    <strong className="me-auto">Create Article</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>{toastBody}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default GlobalToast;