class CheckoutPage {
    getFirstNameInput() {
        return cy.get('[data-test="firstName"]');
    }

    getLastNameInput() {
        return cy.get('[data-test="lastName"]');
    }

    getPostalCodeInput() {
        return cy.get('[data-test="postalCode"]');
    }

    getContinueButton() {
        return cy.get('[data-test="continue"]');
    }

    getFinishButton() {
        return cy.get('[data-test="finish"]');
    }

    getCheckoutComplete() {
        return cy.get('.complete-header');
    }

    getSummaryTotal() {
        return cy.get('.summary_total_label')
            .invoke('text')
            .then(text => parseFloat(text.replace(/[^0-9.]/g, '')));
    }

    fillShippingInfo(firstName, lastName, postalCode) {
        this.getFirstNameInput().type(firstName);
        this.getLastNameInput().type(lastName);
        this.getPostalCodeInput().type(postalCode);
        return this.getContinueButton().click();
    }

    completeOrder() {
        return this.getFinishButton().click();
    }

    verifyOrderAmount(expectedAmount) {
        this.getSummaryTotal().should('eq', expectedAmount + parseFloat(Cypress.env('TAX_RATE')));
    }

    completeCheckoutAndVerifyAmount() {
        cy.get('@cartTotal').then(expectedTotal => {
            this.verifyOrderAmount(expectedTotal);
            this.completeOrder();
            this.getCheckoutComplete().should('have.text', 'Thank you for your order!');
        });
    }
}

export default CheckoutPage;