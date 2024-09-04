emailjs.init("D3ovWYL2zw3ARlBrN");

let isThrottled = false;

function sendEmail(e) {
  e.preventDefault();

  if (isThrottled) {
    showNotification('Error', 'You are sending too many requests. Please wait a moment.');
    return;
  }

  const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
  for (let input of inputs) {
    if (!input.value.trim()) {
      showNotification('Error', 'Field kosong');
      return;
    }
  }

  emailjs.sendForm('service_5h5b8qg', 'template_g6x1wfh', '#contact-form')
    .then((result) => {
      showNotification('Success', 'Email sent successfully!');
    }, (error) => {
      showNotification('Error', 'Failed to send email: ' + error.text);
    });

  isThrottled = true;
  setTimeout(() => {
    isThrottled = false;
  }, 60000);
}

function showNotification(title, message) {
  const notification = document.querySelector('.notification');
  const notificationTitle = document.getElementById('notification-title');
  const notificationMessage = document.getElementById('notification-message');

  notificationTitle.textContent = title;
  notificationMessage.textContent = message;

  notification.style.opacity = '1';
  notification.style.right = '1vh'; 

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.right = '-30vh'; 

  }, 3000);
}

document.getElementById('contact-form').addEventListener('submit', sendEmail);
