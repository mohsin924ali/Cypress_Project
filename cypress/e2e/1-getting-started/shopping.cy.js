/// <reference types="cypress" />

describe("Login and buy items", () => {
  let locators;
  let info;

  beforeEach(() => {
    // Load fixtures before each test and perform login
    cy.fixture("locators")
      .then((fixtureLocators) => {
        locators = fixtureLocators;
        return cy.fixture("userData");
      })
      .then((userInfo) => {
        info = userInfo;
        cy.visit("https://www.saucedemo.com/");
        const page = locators.pages;
        const user = info.userDetails;
        cy.get(page.loginPage.userName).type(user.credential.firstUsername);
        cy.get(page.loginPage.password).type(user.credential.userPassword);
        cy.get(page.loginPage.loginButton).click();
      });
  });

  it("Buy any 2 Items", function () {
    const page = locators.pages;
    const user = info.userDetails;
    cy.get(page.itemPage.backPack).click();
    cy.get(page.itemPage.bikeLight).click();
    cy.get(page.itemPage.shoppingCart).click();
    cy.get(page.itemPage.checkoutButton).click();
    cy.get(page.itemPage.firstnameField).type(user.userInfo.firstName);
    cy.get(page.itemPage.lastnameField).type(user.userInfo.lastName);
    cy.get(page.itemPage.zipCodeField).type(user.userInfo.zipCode);
    cy.get(page.itemPage.continueButton).click();
    cy.get(page.itemPage.finishButton).click();
    cy.contains("Thank you for your order!");
  });

  it("Logout from the app", () => {
    const page = locators.pages;
    cy.get(page.itemPage.sideMenu).click();
    cy.get(page.itemPage.logoutButton).click();
    cy.get(page.loginPage.loginButton).should("be.visible");
  });
});
