/* Here the email is verified, concretly if has two @ and some . */
function verifyEmail(email) {

    const regExpMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;  
    
    if (regExpMail.test(email)) {
      return true;
      
    } else {
      alert("The inpunt haven't e-mail format.")
    }
} export default verifyEmail