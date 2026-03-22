import { Page, Locator } from '@playwright/test';
import { Logout } from '../pages/LogoutPage';  //import logout page if needed

export class MyAccountPage {




    private readonly page: Page;
    //variables
    private readonly msgHeading: Locator;
    private readonly linkLogout: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;

        this.msgHeading = this.page.locator("//h2[normalize-space()='My Account']");
        this.linkLogout = this.page.locator("//ul[@class='dropdown-menu dropdown-menu-right']//a[normalize-space()='Logout']");
    }

    //action methods

    //verify if MyAccount page is displayed

    async isMyAccountDisplayed(): Promise<boolean> {

        try {
            const isvisible = await this.msgHeading.isVisible();
            return isvisible;

        } catch (error) {

            console.log(`exception on Myaccount page visibility : ${error}`)
            return false;
        }


    }

    //click LogoutLink --chaining of other pages

    async clickLogout(): Promise<Logout> {

        try {
            await this.linkLogout.click();
            return new Logout(this.page);

        } catch (error) {

            console.log(`unable to click Logout btn : ${error}`)
            throw error;
        }

    }

    // get the title of the page after logout

    async getpageTitle(): Promise<string> {
        return (this.page.title());

    }




}