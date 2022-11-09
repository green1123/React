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
            if (sortType === "price") { //按價格排序
                products.sort(function (a, b) {
                    //比較數值大小
                    return a.price - b.price;
                })
            } else if (sortType === "category") { //按種類排序
                products.sort(function (a, b) {
                    if (a.category > b.category) {
                        return -1
                    } else return 0;
                })
            } else {
                products.sort(function (a, b) { //按評價排序
                    return a.rating.rate - b.rating.rate
                })
            }

            setProducts(products);
            setLoading(false)
        }
        fetchProducts().catch(console.error)
    }, [sortType, searchQuery])

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
