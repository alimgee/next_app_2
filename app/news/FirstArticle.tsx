
'use client';

import React from "react";
import { Articles } from "./data";

export const FirstArticle = () => {
    if (!Articles.length) {
        return null;
    }

    return (
        <>
            <div className="card-text" ><h3 className="news-header" style={{fontFamily:"Roboto Mono"}}>{Articles[0].name} </h3></div>
            <div className="card-text mb-3"><span >{Articles[0].content}</span></div>
        </>
    );
};
