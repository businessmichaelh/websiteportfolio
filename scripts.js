const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openBtn.addEventListener('click', () => {
  modal.classList.add("open");
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove("open");
});


let slideIndex = 0;
showSlide(slideIndex);

function moveSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    const slides = document.querySelectorAll(".slide");

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex].style.display = "block";
}
