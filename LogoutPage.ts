import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class Logout{

  private readonly page:Page;

  //variables

  private readonly btnContinue:Locator;
  private readonly logoutbtn:Locator;

  //costructor

  constructor(page:Page) {

        this.page=page;

        this.btnContinue = this.page.locator("//a[normalize-space()='Continue']");
        this.logoutbtn = this.page.locator("//ul[@class='dropdown-menu dropdown-menu-right']//a[normalize-space()='Logout']");

  }

  //action methods

  //click Logout button
async cliclLogOutbtn():Promise<void>{

 await this.logoutbtn.click();

}


  //clicks continue button after logout

  async clickContinueButton():Promise<HomePage> {

      await this.btnContinue.click();
      return new HomePage(this.page);

  }

  // verify if continue button is visible or not

  async isContinueButtonVisible():Promise<boolean>{

    return await this.btnContinue.isVisible();
  }




}