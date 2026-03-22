import { Page, Locator } from '@playwright/test';

export class LoginPage {


    private readonly page: Page;

    //variables
    private readonly EnterEmailAddress: Locator;
    private readonly EnterPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly txtErrorMessage:Locator;

    //constructor

    constructor(page: Page) {

        this.page = page;


        this.EnterEmailAddress = this.page.locator("//input[@id='input-email']");
        this.EnterPassword = this.page.locator("#input-password");
        this.btnLogin = this.page.locator("//input[@value='Login']");
        this.txtErrorMessage = this.page.locator("//div[@class='alert alert-danger alert-dismissible']");
        

    }

    //action methods


    //enter user email

    async setEmailAddress(email:string):Promise<void> {

        await this.EnterEmailAddress.fill(email);
    }

    // enter password

    async setpassword(pwd:string):Promise<void>{


        await this.EnterPassword.fill(pwd);
    }

    //click login button

    async clickLoginButton():Promise<void>{


        await this.btnLogin.click();

    }

    //get Login error message

    async getErrorMessage():Promise<null | string>{

      return (this.txtErrorMessage.textContent());

    }
}