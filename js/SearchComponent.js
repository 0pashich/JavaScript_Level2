
Vue.component('search', {
    template: `
    <form action="#" class="search-form" @submit.prevent="$parent.filter($parent.userSearch)">
        <input type="text" class="search-field" v-model='$parent.userSearch'>
        <button type="submit" class="btn-search">
            <i class="fas fa-search"> </i>
            </button>
        </form>
    `
});
