import { useEffect, useState } from "react"
import { FakeStoreApi } from '../../services/fake-store-api'
import { useSearchParams } from "react-router-dom"
import { Item } from "../../components/item"
import { useCart } from "../../context/cart"
import { Sort } from "../../components/sort/sort"

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [query] = useSearchParams();
    const { addToCart } = useCart();
    //新增變量儲存為字符串
    const [sortType, setSortType] = useState("");
    const [isPrice, setIsPrice] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    const [isRating, setIsRating] = useState(false);

    const searchQuery = query.get('q');

    //只要sortType與searchQuery以下內容會跑一次
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const products = searchQuery ? await FakeStoreApi.fetchProductsBySearchQuery(searchQuery) : await FakeStoreApi.fetchAllProducts();

            //若sortType等於price就照續排列
            //按價格排序
            if (sortType === "price") {
                if (isPrice) {
                    products.sort(function (a, b) {
                        //比較數值大小
                        return a.price - b.price;
                    })
                } else {
                    products.sort(function (a, b) {
                        //比較數值大小
                        return b.price - a.price;
                    })
                }
            }
            //按種類排序
            else if (sortType === "category") {
                if (isCategory) {
                    products.sort(function (a, b) {
                        if (a.category > b.category) {
                            return -1
                        } else return 0;
                    })
                } else {
                    products.sort(function (a, b) {
                        if (b.category > a.category) {
                            return -1
                        }
                    })
                }
            }
            //按評價排序
            else {
                if (isRating) {
                    products.sort(function (a, b) {
                        return a.rating.rate - b.rating.rate
                    })
                } else {
                    products.sort(function (a, b) {
                        return b.rating.rate - a.rating.rate
                    })
                }
            }

            setProducts(products);
            setLoading(false)
        }
        fetchProducts().catch(console.error)
        //若以下參數變更則上述代碼會跑一次
    }, [sortType, searchQuery, isPrice, isCategory, isRating])

    if (!loading && searchQuery && !products.length) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">No products found matching your query.</div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* 引入sort與變量 */}
            <Sort
                sortType={sortType}
                setSortType={setSortType}
                isPrice={isPrice}
                setIsPrice={setIsPrice}
                isCategory={isCategory}
                setIsCategory={setIsCategory}
                isRating={isRating}
                setIsRating={setIsRating}
            />
            <div className="container">
                <div className="products my-5">
                    <div className="grid">
                        {loading ? (
                            <div className="loader" />
                        ) : (
                            products.map((product) => (
                                <Item key={product.id} data={product} addToCart={() => addToCart(product)} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Products }
