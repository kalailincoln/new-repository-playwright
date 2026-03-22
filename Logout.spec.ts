/*
Logout test case

1.navigate to URL
2.Goto Login page via Homepage
3.Login with valid credentials
4. Verify Myaccount Page
5. Click on Logout button
6.Click continue after logout
7. Verify user is redirected to Homepage

*/

import { test, expect  } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from "../pages/MyaccountPage";
import { TestConfig } from "../test.config";
import { LoginPage } from "../pages/LoginPage";
import { Logout } from "../pages/LogoutPage";

//declare shared variables

let homepage: HomePage;
let testconfig: TestConfig;
let Myaccount:MyAccountPage;
let loginpage:LoginPage;
let logout:Logout;

//set before each test

test.beforeEach(async ({ page }) => {  

    testconfig = new TestConfig();   // Load config URL Credentials
    await page.goto(testconfig.appUrl);  // naviagat to URL

    // initialize pages

        homepage = new HomePage(page);
        loginpage = new LoginPage(page);
        Myaccount = new MyAccountPage(page);
        logout = new Logout(page);

});




//this hooks runs after each test -Optional clean up after each test
test.afterEach(async ({ page }) => { 

    await page.close();       //close browser tab after test
});

//test runner

test('User logout test @master @regression' , async()=>{


// 2.Goto Login page via Homepage
await homepage.clickMyAccount();
await homepage.clickLoginButton();

//3.Login with valid credentials

await loginpage.setEmailAddress(testconfig.email);
await loginpage.setpassword(testconfig.password);
await loginpage.clickLoginButton();

//4. Verify Myaccount Page

 expect(await Myaccount.isMyAccountDisplayed()).toBeTruthy();

//5. Click on Logout button

await homepage.clickMyAccount();

 await logout.cliclLogOutbtn();

// verify continue btn is visible before clickign

expect(await logout.isContinueButtonVisible()).toBe(true);

//6.Click continue after logout
await logout.clickContinueButton();

//7 verify redirection homepage

expect(await homepage.isHomePageDisplayed()).toBe(true);




})
