//emailjs func
(function(){
  emailjs.init("Hqu9vqgA-3OGILH2O");  //public key
})();

// CSV FILE
document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault(); // stops the page from reloading or navigating to a new URL in case of submission of form
  
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
  
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {  //reader.readAsText(file) is ran to read the file contents and once the whole file is loaded event e is triggered
        var csvData = e.target.result; //e.targer refers to the object that targeted the event(filereader) and .result contains the content of the file
        var validEmails = [];
        var invalidEmails = [];
  
        // Split CSV data by new line
        var rows = csvData.split('\n');
  
        rows.forEach(function (row) {
          var email = row.trim();  //trim any spaces
  
          if (validateEmail(email)) {
            validEmails.push(email);
          } else {
            invalidEmails.push(email);
          }
        });
  
        displayEmails('validText', validEmails, 'validcnt');
        displayEmails('invalidText', invalidEmails, 'invalidcnt');

        pushEmails(validEmails);
      };
  
      reader.readAsText(file); //readAsText is asynchronous(execution is not dependent on other object)
    }
  });
  
  function validateEmail(email) {
    var format = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return format.test(email); //The test method checks if the provided email matches the regular expression pattern.
  }
  
//   function to show valid and invalid emails
  function displayEmails(textId, emails, countId) {
    var textarea = document.getElementById(textId);
    var textareaValue = "";
    var cnt =0;

    for (var i = 0; i < emails.length; i++) {
    textareaValue += emails[i] + "\n";
    cnt++;
    }
    
    textarea.value = textareaValue;
    document.getElementById(countId).innerHTML = "Count: " + cnt;
    
  }


//via emailjs
function pushEmails(validEmails){
  for (var i = 0; i < validEmails.length; i++) {
    var templateParams = {
      to_name: validEmails[i],
      from_name: document.getElementById('emailInput').value,
      subject: document.getElementById('subjectText').value,
      message: document.getElementById('bodyText').value
    };
    
    emailjs.send('service_udoi5ve', 'template_zqnu218', templateParams) //'service_udoi5ve'--service id , 'template_zqnu218'--template id
      .then(function(response) {
        console.log("SUCCESS", response);
      }, function(error) {
        console.log("FAILED", error);
      });
  }

  alert("Emails sent to valid email addresses.");
}

  