var http = require("https"); 
var otpGenerator = require('otp-generator');
let authkeyOtpApi = 'api key';
 

 const signUpOTPSend = (data) => { 
    console.log("/api/sendotp.php?authkey="+authkeyOtpApi+"&mobile="+data.phoneCode+data.phoneNumber+"&sender=***{sender name}***&country="+data.phoneCode+"&otp="+data.otp);
      var options = {
        "method": "POST",
        "hostname": "control.msg91.com",
        "port": null,
        "path": "/api/sendotp.php?authkey="+authkeyOtpApi+"&mobile="+data.phoneCode+data.phoneNumber+"&sender=***{sender name}***&country="+data.phoneCode+"&otp="+data.otp,
        "headers": {}
      }; 
      var req = http.request(options, function (res) {
      var chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);  
        });
        res.on("end", function () {
          var body = Buffer.concat(chunks); 
           console.log(body.toString());  
        });
      }); 

      req.end();
       
  };

 const generateOTP = (data) => { 
    return otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false});
  };

  module.exports={
    signUpOTPSend,
    generateOTP
}
  