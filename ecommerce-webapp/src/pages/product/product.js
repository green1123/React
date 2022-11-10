import './product.css'
import { useEffect, useState } from "react"
import { FakeStoreApi } from '../../services/fake-store-api'
import { Link, useParams } from "react-router-dom"
import { useCart } from "../../context/cart"


const Product = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState();
    const { productId } = useParams();
    const { addToCart } = useCart()
    // 問題～～～～～～～～～～～～～～～～～～～
    // const discountprice = (product.price * product.disCount).toFixed(2)
    // const [discountprice, setDiscountprice] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const product = await FakeStoreApi.fetchProductById(productId);


                if (product.price < 100) {
                    product.disCount = 1;
                } else if (product.price < 200) {
                    product.disCount = 0.9;
                } else {
                    product.disCount = 0.8;
                }

            // // }

            setProduct(product);
            setLoading(false);
            // setDiscountprice(product.price * product.disCount).toFixed(2);
        }
        fetchProduct().catch(console.error)
    }, [productId])


    if (!loading && !product) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">
                        Product not found. Please visit{" "}
                        <Link to="/" replace>
                            home
                        </Link>{" "}
                        to see all available products
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="container">
            {loading ? (
                <div className={"loader"}></div>
            ) : (
                <div className="product py-2">
                    <div className="details grid p-3">
                        <div className="product-image">
                            <img src={product.image} alt="" />
                        </div>
                        <div className="info">
                            <div className="description">
                                <h3>{product.title}</h3>
                                <p className=" my-2">{product.description}</p>
                            </div>
                            <div className="flex">
                                {product.disCount === 1 ? (
                                    <div>
                                        <span className="price">Price:${product.price}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span className="price">Price:</span>
                                        <span className="price" style={{ color: "red", "textDecoration": "line-through" }}>$
                                        {product.price}
                                        </span>
                                        &emsp;&emsp;&emsp;
                                        <span className="price" style={{ color: "green"}}>${(product.price * product.disCount).toFixed(2)}</span>
                                    </div>
                                )}
                                <span className="cart" onClick={() => addToCart(product)}>
                                    <img src="/cart.svg" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export { Product }