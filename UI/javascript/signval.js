function lettersOnly(input)
{
  var regex = /[^a-z ]/gi;
  input .value=input.value.trim().replace (regex,"");

}
function lettersOnly1(input)
{
  var regex = /[^a-z @ ^0-9 .]/gi;
  input .value=input.value.trim().replace (regex,"");

}
function lettersOnly2(input)
{
  var regex = /[^a-z , ^0-9 .]/gi;
  input .value=input.value.trim().replace (regex,"");

}
function lettersOnly3(input)
{
  var regex = /[^a-z , () {} @ ! % $ # : ; "" ?  * & |  ^0-9 .]/gi;
  input .value=input.value.replace (regex,"");

}

function confirmPassword(input){
  var password =document.getElementById("pass");
  var confirmpassword = document.getElementById("pass1");
if (confirmpassword.value != password.value)
{

 document.getElementById("error").innerHTML ="Password Doesn't Match";
 document.getElementById("error").style.color ="red";

}

else{
  true;
}
}
