class FormUI {
    constructor(id) {
        this.form = document.forms[id];
        this.search = this.form.elements['country-search'];
    }

    get countrySearch() {
        return this.search.value;
    }
}

const formUI = new FormUI('searchForm');

export default formUI;