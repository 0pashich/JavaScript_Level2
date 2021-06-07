const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class GoodsItem {
    constructor(product, img = 'http://placehold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="buy-btn"
                data-id="${this.id_product}"
                data-name="${this.product_name}"
                data-price="${this.price}">Купить</button>
            </div>`
    }
}


class GoodsList {
    constructor(cart, container = '.products') {
        this.goods = [];
        this.container = container;
        this.cart = cart;
        this.fetchGoods();

    }
    fetchGoods() {
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render();
                this.buyHandler();
            });
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good);
            listHtml += goodItem.render();
        });
        document.querySelector(this.container).innerHTML = listHtml;
    }
    getSum() {
        let totalPrice = 0;
        this.goods.forEach(good => totalPrice += good.price);
        return totalPrice;
    }
    buyHandler() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {

                this.cart.addProduct(e.target);
            }
        });
    }
}

class CartItem {
    constructor(product, img = 'http://placehold.it/50x100') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = img;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${this.product_name}</p>
                <p class="product-quantity">Quantity: ${this.quantity}</p>
            <p class="product-single-price">$${this.price} each</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">$${this.quantity * this.price}</p>
                <button class="del-btn" data-id="${this.id_product}">&times;</button>
            </div>
            </div>`
    }

}

class CartList {
    constructor(container = '.cart') {
        this.container = container;
        this.goods = [];
        this.fetchCart();
        this._init();
    }
    fetchCart() {
        this._getJson(`${API}/getBasket.json`)
            .then(data => { //data - объект js
                // console.log(data);
                this.goods = [...data.contents];
                this.render()
            });
    }
    _getJson(url) {
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new CartItem(good);
            listHtml += goodItem.render();
        });
        document.querySelector(this.container).innerHTML = listHtml;
    }
    addProduct(element) {
        this._getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.goods.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this.render();
                    } else {
                        let product = {
                            id_product: productId,
                            product_name: element.dataset['name'],
                            price: +element.dataset['price'],
                            quantity: 1
                        };
                        this.goods.splice(this.goods.lengt, 0, product)
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element) {
        this._getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.goods.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this.render();
                    } else {
                        this.goods.splice(this.goods.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    buy() { }
    clear() { }
    getSum() { }


    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('del-btn')) {
                this.removeProduct(event.target);
            }
        });

    }
}




const cart = new CartList();
const list = new GoodsList(cart);
//setTimeout(event => { console.log(list.getSum()); }, 100)