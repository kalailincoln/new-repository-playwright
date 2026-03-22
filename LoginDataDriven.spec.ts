//validate from json or CSV data from Util to test valid and invalid login

// import required page objects also with dataprovider from utils

import { test, expect } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from "../pages/MyaccountPage";
import { TestConfig } from "../test.config";
import { LoginPage } from "../pages/LoginPage";
import { dataprovider } from "../utils/dataProviders";

//load JSON test data from logindata.json

const jsonpath = "testdata/logindata.json";

// call the function which have the filepath and return the JSON data

const jsontestdata = dataprovider.getTestDataFromJson(jsonpath);

//iterate array of data from Json to pass to the Login test 

for (const data of jsontestdata) {

    test(`Login test with JSON Data : ${data.testName} @datadriven`, async ({ page }) => {

        const testconfig = new TestConfig();   // Load config URL Credentials
        await page.goto(testconfig.appUrl);  // naviagat to URL

        const homepage = new HomePage(page);
        await homepage.clickMyAccount();
        await homepage.clickLoginButton();

        const loginpage = new LoginPage(page);
        await loginpage.setEmailAddress(data.email);
        await loginpage.setpassword(data.password);
        await loginpage.clickLoginButton();

        const Myaccount = new MyAccountPage(page);

        // validate status , if valid data , login should be success or Failure

        if(data.expected==='success') {

           const isloggedin = Myaccount.isMyAccountDisplayed();
           expect(isloggedin).toBeTruthy();

        }else {

            const errormessage = await loginpage.getErrorMessage();
            expect(errormessage).toBe("Warning: No match for E-Mail Address and/or Password.");

        }



    })






}

