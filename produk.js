const productImage = document.getElementById("product-image").querySelector("img");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");

// Ambil elemen arrow dan items dari carousel
const arrowLeft = document.getElementById("sebelum");
const arrowRight = document.getElementById("lanjut");
const items = document.querySelectorAll(".carousel .item");

let currentIndex = 0; // Indeks item yang aktif saat ini

// Fungsi untuk update produk yang ditampilkan berdasarkan item yang aktif
function updateProduct(index) {
    const activeItem = items[index];
    const title = activeItem.getAttribute("data-title");
    const description = activeItem.getAttribute("data-description");
    const imageSrc = activeItem.getAttribute("data-image");

    // Cek apakah atribut data ada di elemen
    if (title && description && imageSrc) {
        // Tambah efek transisi saat mengganti gambar
        productImage.style.opacity = 0;
        setTimeout(() => {
            // Update konten produk
            productTitle.textContent = title;
            productDescription.textContent = description;
            productImage.src = imageSrc; // Update gambar sesuai data-image
            productImage.style.opacity = 1; // Setelah transisi selesai, tampilkan gambar kembali
        }, 300);

        // Update item yang aktif
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add("active");
                item.style.opacity = 1; // item aktif lebih jelas
            } else {
                item.classList.remove("active");
                item.style.opacity = 0.6; // item yang tidak aktif lebih buram
            }
        });
    } else {
        console.log("Atribut data-title, data-description, atau data-image tidak ditemukan.");
    }
}

// Fungsi untuk menggeser ke item berikutnya
function nextProduct() {
    currentIndex = (currentIndex + 1) % items.length; // Geser ke indeks berikutnya
    updateProduct(currentIndex);
}

// Fungsi untuk menggeser ke item sebelumnya
function prevProduct() {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Geser ke indeks sebelumnya
    updateProduct(currentIndex);
}

// Tambah event listener pada arrow
arrowRight.addEventListener("click", nextProduct);
arrowLeft.addEventListener("click", prevProduct);

// Opsional: Tambahkan event listener untuk klik langsung pada item di carousel
items.forEach((item, index) => {
    item.addEventListener("click", function () {
        currentIndex = index;
        updateProduct(currentIndex);
    });
});

// Inisialisasi dengan produk pertama
updateProduct(currentIndex);