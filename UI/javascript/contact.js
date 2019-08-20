function lettersOnly(input)
{
  var regex = /[^a-z  ]/gi;
  input .value=input.value.trim().replace (regex,"");

}
function lettersOnly1(input)
{
  var regex = /[^a-z , () {} @ ! % $ # : ; "" ?  * & |  ^0-9 .]/gi;
  input .value=input.value.replace (regex,"");

}
function lettersOnly2(input)
{
  var regex = /[^a-z @ ^0-9 .]/gi;
  input .value=input.value.trim().replace (regex,"");

}