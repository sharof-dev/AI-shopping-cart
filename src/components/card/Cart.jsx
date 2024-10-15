import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import alanBtn from '@alan-ai/alan-sdk-web';

const Cart = () => {
    const [mainCart, setMainCart] = useState([])
    const [cart, setCart] = useState([])
    const [isModal, segtIsModal] = useState(false)
    const addCartHandler = (item) => {
        setCart(prev => {
            return [...prev, item]
        })
        toast(`Successfully added`)
    }
    const modalHandler = () => {
        segtIsModal(!isModal)
    }

    useEffect(() => {
        alanBtn({
            key: '6e5f7508e2423c31d7538c6f0de6afdb2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                if (commandData.command === 'getMenu') {
                    setMainCart(commandData.data)
                } else if (commandData.command === 'showCart') {
                    addCartHandler(commandData.data)
                }
                console.log(commandData.command);
            }
        });
    }, []);
    return (
        <div className='album py-5 bg-light'>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {mainCart.map(item => (
                        <div className="col" style={{ minHeight: '550px' }}>
                            <div className="card shadow-sm p-3">
                                <div className="card-title">
                                    <h4 className='text-muted text-center'>Product #{item.id}</h4>
                                </div>
                                <img src={item.image} alt={item.title} className='bg-placeholder card-image-top' width="100%" height="200px" />
                                <div className="card-body">
                                    <p className="card-text">{item.title.slice(0, 10)}</p>
                                    <p className="card-text fw-lighter">{item.description.slice(0, 100)}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center col">
                                    <div >
                                        <span>{item.category}</span>
                                    </div>
                                    <span className='text-muted'>${item.price}</span>
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed-top m-3">
                <button type="button" class="btn btn-primary position-relative" onClick={modalHandler}>
                    Card
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart.length}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </button>
            </div>
            {isModal && (
                <div className="modal" tabindex="-1" role="dialog" style={{ display: "block", backgroundColor: 'rgba(0,0,0, .8)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close btn" data-dismiss="modal" aria-label="Close" onClick={modalHandler}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {cart.map((item) => (
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={item.image} alt={item.title} className='img-fluid rounded-start' />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>{item.title}</h5>
                                                        <p className="card-text text-muted">{item.description}</p>
                                                        <p className="card-text">
                                                            <small className="text-muted">${item.price}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modalHandler}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
