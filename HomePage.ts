
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {

    private readonly page: Page;

    //locators
    private readonly linkmyaccount: Locator;
    private readonly linkregister: Locator;
    private readonly linklogin: Locator;
    private readonly textsearchbox:Locator;
    private readonly buttonsearch:Locator;

     //constructor 

     constructor(page:Page) {
         
        this.page = page;

        this.linkmyaccount = this.page.locator("//span[normalize-space()='My Account']");
        this.linkregister = this.page.locator("//ul[@class='dropdown-menu dropdown-menu-right']//a[normalize-space()='Register']");
        this.linklogin = this.page.locator("//ul[@class='dropdown-menu dropdown-menu-right']//a[normalize-space()='Login']");
        this.textsearchbox = this.page.locator("//input[@placeholder='Search']");
        this.buttonsearch = this.page.locator("//button[@class='btn btn-light btn-lg']");


     }

     //action methods

     // before action methods write one method to verify home page exists or not

     //dont write any assertions , instead just check title is present , return true /false

     async isHomePageDisplayed() {
                
       let title:String =  await this.page.title();
        
       if(title){
        
         return true;
       }
       return false;
        
     }

     //action methods.

     //clickMyAccount

     async clickMyAccount() {

        try {

            await this.linkmyaccount.click();
        }catch(error) {

            console.log(`exception on clicking My account : ${error}`);
            throw error;
        }


     }

     //enter Name in searchbox -textsearchbox

     async enterNameinSearchBox(pName:string){

        try {

            await this.textsearchbox.fill(pName);

        }catch(error) {

            console.log(`exception on searchbox : ${error}`);
            throw error;
        }


     }

     //click search button - buttonsearch

     async clickSearch() {

         try {

            await this.buttonsearch.click();

        }catch(error) {

            console.log(`exception on searchbutton click: ${error}`);
            throw error;
        }
        
     }

     //Link register

     async clickRegister() {

        try {

            await this.linkregister.click();
        }catch(error) {

            console.log(`exception on clicking Register : ${error}`);
            throw error;
        }

     }

     //click login button -linklogin
     
     async clickLoginButton() {

        try {

            await this.linklogin.click();
        }catch(error) {

            console.log(`exception on clicking LOGIN : ${error}`);
            throw error;
        }


     }
      


}