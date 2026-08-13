function sendEmail(){
    const templateParams = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
        service: document.querySelector("#service").value,
        location: document.querySelector("#location").value,
    };
    emailjs
        .send("service_fp5agjk", "template_l66ggyc", templateParams)
        .then(()=> alert("Email sent").catch(()=>alert("Email not send")));

}