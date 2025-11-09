class InventoryPage {
    getInventoryItems() {
        return cy.get('.inventory_item');
    }

    getAddToCartButton(itemName) {
        return cy.contains('.inventory_item', itemName)
            .find('button');
    }

    getShoppingCartBadge() {
        return cy.get('.shopping_cart_badge');
    }

    getShoppingCartLink() {
        return cy.get('.shopping_cart_link');
    }

    getSortSelect() {
        return cy.get('.product_sort_container');
    }

    getAllPrices() {
        // Returns an array of price numbers (e.g. [49.99, 29.99])
        return cy.get('.inventory_item_price').then(($els) => {
            return Cypress._.map($els, (el) => {
                const text = el.innerText || '';
                // Remove $ and commas then parse float
                return parseFloat(text.replace(/[^0-9.]/g, ''));
            });
        });
    }

    addAllItemsToCart() {
        return cy.get('.inventory_item').each(($el, index) => {
            return cy.wrap($el).find('button').click();
        });
    }

    getShoppingCartCount() {
        return cy.get('.shopping_cart_badge').invoke('text').then((t) => parseInt(t, 10));
    }

    getMostExpensiveName() {
        return cy.get('.cart_item').first().find('.inventory_item_name').invoke('text');
    }

    getItemByIndex(index) {
        return cy.get('.inventory_item').eq(index);
    }

    getItemNameByIndex(index) {
        return this.getItemByIndex(index)
            .find('.inventory_item_name')
            .invoke('text');
    }

    addItemToCartByIndex(index) {
        return this.getItemByIndex(index).find('button').click();
    }

    getPriceByIndex(index) {
        return this.getItemByIndex(index)
            .find('.inventory_item_price')
            .invoke('text')
            .then((text) => parseFloat(text.replace(/[^0-9.]/g, '')));
    }

    addItemToCart(itemName) {
        this.getAddToCartButton(itemName).click();
    }

    sortBy(optionText) {
        this.getSortSelect().select(optionText);
    }

    goToCart() {
        this.getShoppingCartLink().click();
    }
}

export default InventoryPage;