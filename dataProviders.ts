import fs from 'fs';
import {parse} from 'csv-parse/sync'

export class dataprovider{

     //method to read data from json
    static getTestDataFromJson(filepath:string) {
      

       let data:any=  JSON.parse(fs.readFileSync(filepath,'utf-8'));
       return data;

    }

 //method to read data from CSV
    static getTestDataFromCSV(filepath:string) {

            let data:any =  parse(fs.readFileSync(filepath),{columns:true,skip_empty_lines:true});
            return data;
            
    } 
   
   }
  
