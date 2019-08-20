function validate(){
  var userEmail = document.getElementById("email1");
  var password = document.getElementById("pass");

  if(userEmail.value.trim()=="" && password.value.trim()==""){
   
   document.getElementById("sign").innerHTML = "please no blank allowed full fill the email and password box";
   document.getElementById("sign").style.color ="red";

    return false;
  }
  else if (userEmail.value.trim()=="") {
    document.getElementById("sign").innerHTML ="Email  are required";
    document.getElementById("sign").style.color ="red";
    return false;
  }
  else if (password.value.trim()=="") {
    document.getElementById("sign").innerHTML ="Password are required";
    document.getElementById("sign").style.color ="red";
    return false;
  }
  else{
    true;
  }
}
