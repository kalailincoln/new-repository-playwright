/*
Test case : Login with valid credentials

test : @master @regression @sanity

Steps:

1. Navigate to appliation URL
2. Navigate to Login page via Homepage
3.Enter valid credentials and login
4.Verify successful login by checking 'My Account' visibility in the page

*/

import { test, expect } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from "../pages/MyaccountPage";
import { TestConfig } from "../test.config";
import { LoginPage } from "../pages/LoginPage";

//setup global variables for pages / insteading of creating objects for each and every test - we can call the methods from page classes directly
let homepage: HomePage;
let testconfig: TestConfig;
let Myaccount:MyAccountPage;
let loginpage:LoginPage;



//before each  -launching URL , creating objects for Page objects

//this hookd runs before every test
test.beforeEach(async ({ page }) => {   //// create objects for page classes , test config to access properties/methods

    testconfig = new TestConfig();   // Load config URL Credentials
    await page.goto(testconfig.appUrl);  // naviagat to URL

    //initialize page objects
    homepage = new HomePage(page);
    loginpage = new LoginPage(page);
    Myaccount = new MyAccountPage(page);
    
  
});

//this hooks runs after each test
test.afterEach(async ({ page }) => { 

    await page.close();       //close browser tab after test
})

// test runner

test("user Login Test @master @sanity @regression" , async ({})=>{

      // 2. Navigate to Login page via Homepage

     await homepage.clickMyAccount();
     await homepage.clickLoginButton();

      // 3. Enter valid credentials and login

     await loginpage.setEmailAddress(testconfig.email);  // calling the method from loginpage and credentials from test.config
     await loginpage.setpassword(testconfig.password);
     await loginpage.clickLoginButton();

      //4.Verify successful login by checking 'My Account' visibility in the page

      // call myaccount displayed method to check MyAccount is displayed or not

      const isdisplayed =  await Myaccount.isMyAccountDisplayed();
      expect(isdisplayed).toBeTruthy();
      console.log("account logged in successfully")
      


})
