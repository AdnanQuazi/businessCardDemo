const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const body = document.getElementsByTagName("body")[0];
const icn = document.getElementById('fas');
const icn1 = document.getElementById('fas1');
const visible = document.querySelector('#visible');
const invisible = document.querySelector('#invisible');
const icons = document.querySelector('.icons');
const pass = document.querySelector('.pass');
const dangerfname = document.getElementById('danger-fname');

const dangeremail = document.getElementById('danger-email');
const dangerphone = document.getElementById('danger-phone');
const dangerpass = document.getElementById('danger-pass');


const namecheck = /^[A-Za-z. ]{2,30}$/;
const passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/ ;
const emailcheck = /^[A-Za-z0-9_.]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
const phonecheck = /^[789][0-9]{9}$/

function validation(){
     
     const password = document.getElementById('pass').value;
     const firstname = document.getElementById('firstname').value;
     
     const email = document.getElementById('email').value;
     const phone = document.getElementById('phone').value;
     
     
     if(namecheck.test(firstname) ){
          dangerfname.innerHTML = "";
     }else{
          dangerfname.innerHTML = "Invalid Name";
          return false
     }
    
     if(emailcheck.test(email) ){
          dangeremail.innerHTML = "";
     }else{
          dangeremail.innerHTML = "Invalid email";
          return false
     }
     if(phonecheck.test(phone) ){
          dangerphone.innerHTML = "";
     }else{
          dangerphone.innerHTML = "Invalid Number";
          return false
     }
     if(passwordcheck.test(password) ){
          dangerpass.innerHTML = "";
          
     }else{
          dangerpass.innerHTML = "Password must contain at least one number and one special character*";
          return false
     }
}


burger.addEventListener('click', ()=>{

     nav.classList.toggle('nav-active');
     body.classList.toggle('ovf');
     if(icn.style.display == 'none' && icn1.style.display == 'flex'){
          icn.style.display = 'flex'
          icn1.style.display = 'none'
     }else{
          icn.style.display =  'none'
          icn1.style.display =  'flex'
     }
     

})

icons.addEventListener('click',()=>{
     
     if(visible.style.display == 'none' && invisible.style.display == 'inline'){
          visible.style.display = 'inline';
          invisible.style.display = 'none';
          pass.setAttribute("type","password");
     }else{
          visible.style.display = 'none';
          invisible.style.display = 'inline';
          pass.setAttribute("type","text");
     }
})




     



