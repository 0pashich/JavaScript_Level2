const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtred: [],
        imgCatalog: 'http://placehold.it/200x150',
        userSearch: '',
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filterProducts() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtred = this.products.filter(item => regexp.test(item.product_name));
            if (this.userSearch == '') {
                this.filtred = this.products.slice();
                console.log(this.userSearch);
            }

        }

    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    }
})

