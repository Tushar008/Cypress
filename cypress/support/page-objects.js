import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

Cypress.Commands.add('getPages', () => {
    return {
        loginPage: new LoginPage(),
        inventoryPage: new InventoryPage(),
        cartPage: new CartPage(),
        checkoutPage: new CheckoutPage()
    };
});