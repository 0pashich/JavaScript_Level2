Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="header__search-form " @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="header__search-field " v-model="userSearch">
                <button type="submit" class="header__search-btn  ">
                <img src="./img/loupe.svg" alt="search" width="26"
                height="27">
                 
                </button>
            </form>`
})