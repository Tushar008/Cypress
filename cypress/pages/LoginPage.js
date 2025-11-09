class LoginPage {
    getUsernameInput() {
        return cy.get('[data-test="username"]');
    }

    getPasswordInput() {
        return cy.get('[data-test="password"]');
    }

    getLoginButton() {
        return cy.get('[data-test="login-button"]');
    }

    visit() {
        const baseUrl = Cypress.env('BASE_URL') || '/';
        cy.visit(baseUrl);
    }

    login(username, password) {
        this.getUsernameInput().type(username);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }
}

export default LoginPage;