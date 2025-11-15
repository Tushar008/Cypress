describe('SauceDemo E2E Purchase Flow', () => {
    let pages;

    beforeEach(() => {
        // Get page objects
        cy.getPages().then((pageObjects) => {
            pages = pageObjects;
        });

        // Clear cookies and local storage between tests
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it.only('sorts prices, adds the most expensive item, and then removes it and perform checkout', () => {
        // Login to saucedemo
        pages.loginPage.visit();
        pages.loginPage.login('standard_user', 'secret_sauce');

        // sort prices with 'high to low'
        pages.inventoryPage.sortBy('Price (high to low)');

        // Verify prices are sorted on the page
        pages.inventoryPage.getAllPrices().then((prices) => {
            cy.wrap(prices).as('prices');
            const sorted = [...prices].sort((a, b) => b - a);
            cy.wrap(prices).should('deep.equal', sorted);
        });
        
        pages.inventoryPage.addAllItemsToCart();

        // verify total count of the prices (this will also confirm total number of items in cart)
        cy.get('@prices').then((prices) => {
            const total = prices.length;

            // verify cart icon shows correct count of total item available in cart
            pages.inventoryPage.getShoppingCartCount().should('eq', total);

            // Go to cart and verify count
            pages.inventoryPage.goToCart();
            pages.cartPage.getCartItemsCount().should('eq', total);

            // Remove the most expensive item (first item after sorting)
            pages.inventoryPage.getMostExpensiveName().then((mostExpensiveName) => {
                pages.cartPage.removeItemByName(mostExpensiveName);

                // verify cart has one less item
                pages.cartPage.getCartItemsCount().should('eq', total - 1);

                //  cart icon shows total-1 (or count icon should be absent if zero)
                if (total - 1 > 0) {
                    pages.inventoryPage.getShoppingCartCount().should('eq', total - 1);
                } else {
                    cy.get('.shopping_cart_badge').should('not.exist');
                }

                // Save cart total for verification at checkout
                pages.cartPage.saveCartTotal();

                // Continue to checkout
                pages.cartPage.proceedToCheckout();

                // Fill shipping information
                pages.checkoutPage.fillShippingInfo('Trushar', 'Patel', '12345');

                // Complete checkout and verify the total matches what was saved
                pages.checkoutPage.completeCheckoutAndVerifyAmount();

                // Take screenshot of the confirmation screen
                cy.get('.complete-header').should('be.visible').then(() => {
                    cy.screenshot('order-confirmation', {
                        capture: 'viewport',
                        overwrite: true
                    });
                });

                // Additional verification to ensure we capture the full confirmation state
                cy.wait(1000); // Small wait to ensure animations complete
                cy.get('.complete-header').should('have.text', 'Thank you for your order!');
                cy.get('.complete-text').should('be.visible');
            });
        });
    });
});