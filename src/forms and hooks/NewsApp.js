import React, { useEffect, useState, useRef } from 'react';
import News from './News';
import './NewsApp.css'
function NewsApp() {
    const apiKey = '6f224d7bc55140c9a79a9b9f7ceb7e37';
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('tesla');
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-31-12&sortBy=publishedAt&apiKey=${apiKey}`;
    const queryInputRef = useRef(null);
    useEffect(() => {
        fetchData();
    }, [query]);
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