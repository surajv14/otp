//const config = require('config.json');
require("dotenv").config();
const config=require(`${PROJECT_DIR}/config`)

var response = { "status": 200, "response": "" };

module.exports = {
    userLogin,
    sendOTP
    
};


/**
 * Created 29-06-2020
 * @author Suraj verma
 * @param {*} mobile
 * @param {*} otp 
 */


  
async function sendOTP({ mobile}) { //{ phone, password }

     try {
 
         var validationError = [];
         mobile!=undefined && mobile!='' ? true : validationError.push({ "field": "mobile", "message": "Mandatory request parameter." });
     
         if (validationError.length == 0) {
           
             let sql = `select * from ${process.env.TABLE_SCHEMA_NAME}.user where phone_number='${mobile}';`;
 
             let user = await client.query(sql);
             if (user.rowCount > 0) {
               
                var genrateOtp = config.generateOTP();          
                
                const sendOtpData ={phoneCode:91,phoneNumber:mobile,otp:genrateOtp}  

                config.signUpOTPSend(sendOtpData); 
                
                let sql = `update ${process.env.TABLE_SCHEMA_NAME}.user set otp='${genrateOtp}' where id='${user.rows[0]['id']}';`;
 
                let updateSql= await client.query(sql);
              console.log(updateSql)
                if(updateSql.rowCount>0)
                {
                    response.response = { 'success': true, "data": [], "message": "OTP sent successfully.", "error": [] };
                    response.status = 200;
                    return response;
                } else {
                        response.response = { 'success': false, "data": [], "message": "Due to internal error Service visit update failed.", "error": [] };
                        response.status = 400;
                        return response;
                }
             } else {
                 response.status = 400;
                 response.response = { "success": false, "message": "Invalid login credentials.", "error": []  };
                 return response;
             }
         } else {
             response.status = 400;
             response.response = { "success": false, "message": "mandatory parameter missing", "error": validationError };
             return response;
         }
     } catch (e) {
         console.log(`Error :::::>>>>>>> 001 ::::::: `, e);
         response.status = 500;
         response.response = { "success": false, "message": "Internal server error.", "error": [] };
         return response;
     }
 
 }
 

async function userLogin({ mobile, otp }) { //{ phone, password }

    try {

        var validationError = [];
        mobile!=undefined && mobile!=''? true : validationError.push({ "field": "mobile", "message": "Mandatory request parameter." });
        otp!=undefined && otp!='' ? true : validationError.push({ "field": "password", "message": "Mandatory request parameter." });


        if (validationError.length == 0) {
          
            let sql = `select * from ${process.env.TABLE_SCHEMA_NAME}.user where phone_number='${mobile}' and otp='${otp}';`;

            let user = await client.query(sql);
            if (user.rowCount > 0) {
              
                response.status = 200;
                response.response = {
                    "success": true, 
                    "message": "Login successfully.",
                    "error":[] ,
                    "data": {
                    }
                };
                return response;
            } else {
                response.status = 400;
                response.response = { "success": false, "message": "Invalid login credentials.", "error": []  };
                return response;
            }
        } else {
            response.status = 400;
            response.response = { "success": false, "message": "mandatory parameter missing", "error": validationError };
            return response;
        }
    } catch (e) {
        console.log(`Error :::::>>>>>>> 002 ::::::: `, e);
        response.status = 500;
        response.response = { "success": false, "message": "Internal server error.", "error": [] };
        return response;
    }

}
