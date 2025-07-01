

// Slideshow otomatis
const autoSlides = document.querySelectorAll('.slide');
const autoSlideshow = document.querySelector('.slideshow-auto');
let currentAutoSlide = 0;
const autoSlideCount = autoSlides.length;
let autoSlideInterval;

// Fungsi untuk menampilkan slide otomatis berikutnya
function nextAutoSlide() {
    currentAutoSlide = (currentAutoSlide + 1) % autoSlideCount;
    autoSlideshow.style.transform = `translateX(${-currentAutoSlide * 100}%)`;
}

// Memulai slideshow otomatis
function startAutoSlide() {
    autoSlideInterval = setInterval(nextAutoSlide, 5000); // 5 detik per slide
}

startAutoSlide(); // Memulai slide otomatis saat halaman dimuat

// Slideshow manual
const manualSlides = document.querySelectorAll('.slide2');
const manualSlideshow = document.querySelector('.slideshow-manual');
let currentManualSlide = 0;
const manualSlideCount = manualSlides.length;

// Fungsi untuk menampilkan slide manual berikutnya
function nextManualSlide() {
    currentManualSlide = (currentManualSlide + 1) % manualSlideCount;
    manualSlideshow.style.transform = `translateX(${-currentManualSlide * 100}%)`;
}

// Fungsi untuk menampilkan slide manual sebelumnya
function prevManualSlide() {
    currentManualSlide = (currentManualSlide - 1 + manualSlideCount) % manualSlideCount;
    manualSlideshow.style.transform = `translateX(${-currentManualSlide * 100}%)`;
}

// Event listener untuk tombol next (slide manual)
document.getElementById('next').addEventListener('click', function() {
    nextManualSlide(); // Geser slide manual ke kanan
});

// Event listener untuk tombol prev (slide manual)
document.getElementById('prev').addEventListener('click', function() {
    prevManualSlide(); // Geser slide manual ke kiri
});


