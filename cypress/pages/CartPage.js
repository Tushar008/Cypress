class CartPage {
    getCartItems() {
        return cy.get('.cart_item');
    }

    getCheckoutButton() {
        return cy.get('[data-test="checkout"]');
    }

    getRemoveButton(itemName) {
        return cy.contains('.cart_item', itemName)
            .find('button');
    }

    getItemPrices() {
        return cy.get('.cart_item .inventory_item_price').then($prices => {
            return Cypress._.map($prices, el => parseFloat(el.innerText.replace(/[^0-9.]/g, '')));
        });
    }

    getTotalAmount() {
        return this.getItemPrices().then(prices => {
            return prices.reduce((sum, price) => sum + price, 0);
        });
    }

    getCartItemsCount() {
        return this.getCartItems().its('length');
    }

    proceedToCheckout() {
        return this.getCheckoutButton().click();
    }

    removeItem(itemName) {
        return this.getRemoveButton(itemName).click();
    }

    removeItemByName(itemName) {
        return this.removeItem(itemName);
    }

    // Stores cart total in Cypress alias for later use
    saveCartTotal() {
        this.getTotalAmount().then(total => {
            cy.wrap(total).as('cartTotal');
        });
    }
}

export default CartPage;