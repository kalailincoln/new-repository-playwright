/*
1.Register new account with random user details - create function and call in test
2.logout after registration -create function and call in test
3.Login with same account 
4.Logout successfully

*/
import { test, expect, Page } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from "../test.config";
import { LoginPage } from "../pages/LoginPage";
import { dataprovider } from "../utils/dataProviders";
import { Logout } from "../pages/LogoutPage";
import { MyAccountPage } from "../pages/MyaccountPage";

//global variables

let homepage: HomePage;
let testconfig: TestConfig;
let Myaccount: MyAccountPage;
let loginpage: LoginPage;
let registrationpage: RegistrationPage;
let dataprovide: dataprovider;
let logout: Logout;

//initialize the pageobjects
testconfig = new TestConfig();


// This is main test block to run all the end-end tests
// //lets call functions here to execute each method in tests

// test will call all the functions in one shot 
test('execute end-end test @end-to-end', async ({ page }) => {

    //navigate to application URL

    await page.goto(testconfig.appUrl);

    // 1.Register new account with random user details

    let registeredemail: string = await performRegistration(page);
    console.log("✅registration is completed successfully");

    //2.logout after registration -create function and call in test

    await performLogout(page);
    console.log("✅Logout is completed");

    //3.Login with same account

    await performLogin(page, registeredemail);
    console.log("✅Login is successfull")

    //4.Logout successfully

    await CurrentUserLogout(page);
    console.log("✅User Logged Out successfully")




});



//function to register acocount using random data

async function performRegistration(page: Page): Promise<string> {

    const homepage = new HomePage(page);
    await homepage.clickMyAccount();
    await homepage.clickRegister();

    //fill in random details


    registrationpage = new RegistrationPage(page);
    await registrationpage.setFirstName(RandomDataUtil.getFirstName());
    await registrationpage.setLastName(RandomDataUtil.getFirstName());
    let email = RandomDataUtil.getEmail();
    await registrationpage.setEmail(email);

    await registrationpage.setTelephoneNumber(RandomDataUtil.getTelephoneNumber());

    await registrationpage.setpassword("test12345");
    await registrationpage.setConfirmPassword("test12345")



    //agree privacy policy

    await registrationpage.setPrivacyPolicy();
    await registrationpage.clickContinue();

    //validate registration was successful

    const confirmationmessage = await registrationpage.getConfirmationMsg();
    expect(confirmationmessage).toContain("Your Account Has Been Created!");

    return email;

}

//function to logout after registration

async function performLogout(page: Page) {

    const homepage = new HomePage(page);
    logout = new Logout(page);

    await homepage.clickMyAccount();
    await logout.cliclLogOutbtn();
    expect(await logout.isContinueButtonVisible()).toBe(true);
    await logout.clickContinueButton();

    expect(await homepage.isHomePageDisplayed()).toBe(true);


}

//function to Login using current registered email

async function performLogin(page: Page, email: string) {

    await page.goto(testconfig.appUrl); //reload home page

    const homepage = new HomePage(page);
    await homepage.clickMyAccount();
    await homepage.clickLoginButton();


    loginpage = new LoginPage(page);

    await loginpage.setEmailAddress(email);

    await loginpage.setpassword("test12345");

    await loginpage.clickLoginButton();


    Myaccount = new MyAccountPage(page);

    expect(await Myaccount.isMyAccountDisplayed()).toBeTruthy();

}

//function to logout as current user

async function CurrentUserLogout(page: Page) {


    homepage = new HomePage(page);

    logout = new Logout(page);

    await homepage.clickMyAccount();

    await logout.cliclLogOutbtn();

    expect(await logout.isContinueButtonVisible()).toBe(true);

    await logout.clickContinueButton();

    expect(homepage.isHomePageDisplayed()).toBeTruthy();


}
