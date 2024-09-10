const imageInput = document.getElementById('imageInput');
const createLinkButton = document.getElementById('createLinkButton');
const resultSection = document.getElementById('resultSection');
const imageLinkInput = document.getElementById('imageLink');
const copyButton = document.getElementById('copyButton');
let imageUrl = '';

createLinkButton.addEventListener('click', () => {
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onloadend = function () {
      imageUrl = reader.result;
      const imageLink = `${window.location.href}?image=${encodeURIComponent(imageUrl)}`;
      imageLinkInput.value = imageLink;
      resultSection.style.display = 'block';
    };
    
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image first.');
  }
});

copyButton.addEventListener('click', () => {
  imageLinkInput.select();
  document.execCommand('copy');
  alert('Link copied to clipboard!');
});

// Display the image if the link contains an image parameter
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const imageParam = urlParams.get('image');
  
  if (imageParam) {
    const img = document.createElement('img');
    img.src = decodeURIComponent(imageParam);
    img.style.maxWidth = '100%';
    document.body.innerHTML = '';
    document.body.appendChild(img);
  }
};
