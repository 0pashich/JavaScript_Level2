Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://picsum.photos/424/360'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.img = `https://picsum.photos/id/${item.id_product}/424/360`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products__list">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});


Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="products__item">

            <div class="products__wrapper-overlay">
                            <img class="products__image" :src="img" alt="Some img" width="360"
                                height="420">
                            <button type="button" class="products__button" @click="$emit('add-product', product)"> Add to cart </button>
                        </div>
                        <h3 class="products__title">{{product.product_name}}</h3>
                        <p class="products__description">Known for her sculptural takes on traditional tailoring,
                            Australian
                            arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <p class="products__price">$ {{product.price}}</p>
            </div>
    `
})