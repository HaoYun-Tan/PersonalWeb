import "./FullArticle.css"
import {useState, useLayoutEffect, useRef } from 'react'
import CloseBtnImg from '../assets/img/CloseButton.png';

interface FullArticleData {
    id: number
    title: string,
    text: string,
    created_at: string,
    updated_at: string,
    setEventShowFullArticle: any
}

function FullArticle(props: FullArticleData){
    const { id, title, text, created_at, updated_at, setEventShowFullArticle} = props;
    const selfRef = useRef<HTMLInputElement>(null)
    useLayoutEffect(() => {
        if (selfRef.current) {
            const computedLeft = window.innerWidth / 2 - selfRef.current.getBoundingClientRect().width / 2;
            selfRef.current.style.left = `${computedLeft}`
        }
    }, [])

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
                        setEventShowFullArticle({id: 0, title: '', text: '', created_at: '', updated_at: '', show: false})
                    }}
                />
            </div>
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