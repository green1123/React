const Sort = ({ setSortType, isPrice, setIsPrice, isCategory, setIsCategory, isRating, setIsRating }) => {

    return (
        <div className="wrapper">
            <header className="container">
                <div className="header py-2">
                    排序&emsp;&emsp;
                    <button type="button" className="search-btn" onClick={() => { setSortType('price'); setIsPrice(!isPrice) }}>
                        依價錢
                    </button>
                    &emsp;
                    <button type="button" className="search-btn" onClick={() => { setSortType('category'); setIsCategory(!isCategory) }}>
                        依種類
                    </button>
                    &emsp;
                    <button type="button" className="search-btn" onClick={() => { setSortType('rating'); setIsRating(!isRating) }}>
                        依評價
                    </button>
                </div>
            </header>
        </div>
    )
}

export { Sort }