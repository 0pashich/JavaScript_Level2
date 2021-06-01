class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render(img = 'https://via.placeholder.com/200x150') {
        return `<div class="product-item">
                <img src="${img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
    getSum() {
        let totalPrice = 0;
        this.goods.forEach(good => totalPrice += good.price);
        return totalPrice;
    }
}

class CartItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
    render() { }
    setQuantity() { }
}

class CartList {
    constructor() {
        this.goods = [];
    }
    fetchCart() { }
    render() { }
    add() { }
    remove() { }
    buy() { }
    clear() { }
    getSum() { }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.getSum());