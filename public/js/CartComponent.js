// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://picsum.photos/150/128',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.img = `https://picsum.photos/id/${item.id_product}/150/128`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${item.id_product}/${item.product_name}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}/${item.product_name}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${item.id_product}/${item.product_name}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
        // remove(item) {
        //     this.$parent.getJson(`${API}/addToBasket.json`)
        //         .then(data => {
        //             if (data.result === 1) {
        //                 if (item.quantity > 1) {
        //                     item.quantity--;
        //                 } else {
        //                     this.cartItems.splice(this.cartItems.indexOf(item), 1);
        //                 }
        //             }
        //         })
        // },
    },
    template: `<div>
<button class="btn-cart header__cart" type="button" @click="showCart = !showCart"><img class="header__cart-image" src="./img/cart.svg" alt="cart" width="32" height="29"></button>
        <div class="header__cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img" :cart-item="item" @remove="remove">
            </cart-item>
        </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `


                <div class="cart__item">
                            <img class="cart__image" :src="img" alt="product-4" width="128" height="150">
                            <div class="cart__text">
                                <h3 class="cart__title">{{ cartItem.product_name }}</h3>
                                <p class="cart__label">Quantity: {{ cartItem.quantity }}</p>
                                <p class="cart__label"> Price: <span class="cart__price">$ {{ cartItem.price }} each</span></p>
                                <div class="cart__btn-wrapper">
                                <p class="cart__price">Total: $ {{cartItem.quantity*cartItem.price}}</p>
                                <button class="cart__del-btn" @click="$emit('remove', cartItem)">&times;</button>
                            
    </div>                                </div>
                </div>
    `
})


// </div>   
//                             <div class="cart__final">

/*     <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div> */