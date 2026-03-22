import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {

       private readonly page:Page;
     //Variables

    private readonly firstName: Locator;
    private readonly LastName: Locator;
    private readonly Email: Locator;
    private readonly telephone:Locator;
    private readonly password:Locator;
    private readonly confirmPassword: Locator;
    private readonly privacyPolicy:Locator;
    private readonly continutbtn:Locator;
    private readonly msgconfirm:Locator;

    //constructor
   
    constructor(page:Page) {

        this.page = page;

        this.firstName = this.page.locator("label[for='input-firstname']");
        this.LastName= this.page.locator("#input-lastname");
        this.Email = this.page.locator("#input-email");
        this.telephone = this.page.locator("#input-telephone");
        this.password = this.page.locator("//input[@id='input-password']");
        this.confirmPassword = this.page.locator("//input[@id='input-confirm']")
        this.privacyPolicy = this.page.locator("//input[@name='agree']");
        this.continutbtn = this.page.locator("//input[@value='Continue']");
        this.msgconfirm = this.page.locator("//h1[normalize-space()='Your Account Has Been Created!']");

    }

    //action methods

    //firstName

    async setFirstName(fName:string): Promise<void>{

        await this.firstName.fill(fName);
    }

    //lastName

    async setLastName(Lname:string) : Promise<void>{

        await this.LastName.fill(Lname);
    }

    //email
    async setEmail(email:string) : Promise<void>{

        await this.Email.fill(email);
    }

    //telephone

    async setTelephoneNumber(telephoneNumber:string):Promise<void>{


        await this.telephone.fill(telephoneNumber);

    }
 
    //password
   
       async setpassword(pwd:string):Promise<void>{

        await this.password.fill(pwd);
       }

       // confirm password
      async setConfirmPassword(confirmpassword:string):Promise<void>{
      await this.confirmPassword.fill(confirmpassword);

      }

           
      //click privacy policy

      async setPrivacyPolicy():Promise<void>{

        await this.privacyPolicy.check();

      }

      //continue button

      async clickContinue():Promise<void>{

        await this.continutbtn.click();


      }

      //get confirmation message

      async getConfirmationMsg():Promise<string>{

         return await this.msgconfirm.textContent() ?? '';

      }

      // common metthods for registration , set as userdata in object

      async completeRegistration(userData:{
                
        firstname:string;
        lastname:string;
        emailid:string;
        password:string;


      }): Promise<void> {

        await this.setFirstName(userData.firstname);
        await this.setLastName(userData.lastname);
        await this.setEmail(userData.emailid);
        await this.setpassword(userData.password);
        await this.setPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgconfirm).toBeVisible();

          


      }


}