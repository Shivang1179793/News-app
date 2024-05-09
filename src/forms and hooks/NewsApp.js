import React, { useEffect, useState, useRef } from 'react';

import News from './News';
import './NewsApp.css'
function NewsApp() {
    function getTwoDaysBeforeDate() {
        const today = new Date();
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(today.getDate() - 2);
        return twoDaysAgo.toISOString().split('T')[0];
    }
    const [startDate, setStartDate] = useState(getTwoDaysBeforeDate());
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('india');
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=${startDate}&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}`;
    const queryInputRef = useRef(null);
    useEffect(() => {
        fetchData();
    }, [query, startDate]);
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            setNewsList(jsonData.articles);
        }
        catch (e) {
            console.log(e, 'error occured');
        }
    }
    function handleSubmit(event) {
        event.preventDefault();
        const queryValue = queryInputRef.current.value;
        setQuery(queryValue);
    }
    return (
        <div className='news-app'>
            <h1 style={{ fontFamily: 'monospace', fontSize: '3rem', textAlign: 'left', marginBottom: '20px' }}>News Daily</h1>
            <form onSubmit={handleSubmit}>
                <input className='query-input' type='text' ref={queryInputRef} />
                <input className="btn-submit" onClick={handleSubmit} type='submit' value="submit" />
            </form>
            <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2,48%)', justifyContent: 'space-between', rowGap: '20px' }}>
                {newsList.map(news => {
                    return <News key={news.url} news={news} />
                })}
            </div>
        </div>
    );
}
export default NewsApp;