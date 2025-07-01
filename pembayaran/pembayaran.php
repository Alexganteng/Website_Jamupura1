<?php
session_start(); 
include "koneksi.php";
date_default_timezone_set("Asia/Bangkok");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cart_data = mysqli_real_escape_string($conn, $_POST['cart_data']);
    $total_harga = mysqli_real_escape_string($conn, $_POST['total_harga']);
    $metode = $_POST['payment_method'];
    $antrian = isset($_POST['antrian']) ? intval($_POST['antrian']) : NULL;


    $insert = mysqli_query($conn, "INSERT INTO pesanan (produk, total_harga, metode, tanggal, antrian) 
    VALUES ('$cart_data', '$total_harga', '$metode', NOW(), " . ($antrian ?: 'NULL') . ")");


    if ($insert) {
        $_SESSION['method'] = $metode;
        $_SESSION['total'] = $total_harga;
        $_SESSION['items'] = $cart_data;
        $_SESSION['antrian'] = $antrian; 

        echo '<script>window.location="berhasil.php";</script>';
        exit;
    } else {
        echo 'Gagal menyimpan pesanan: ' . mysqli_error($conn);
    }
}
?>


<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pembayaran - Jamupura</title>
  
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>

  <link rel="stylesheet" href="pembayaran.css" />
</head>
<style>
  /* --- Global Styles & Variables --- */
:root {
    --primary-color: #7C5C52; /* Warna cokelat dari header Jamupura */
    --secondary-color: #89a867; /* Warna hijau dari hover Jamupura */
    --background-color: #f7f1ee; /* Latar belakang krem hangat */
    --card-background: #ffffff;
    --text-color: #343a40;
    --text-light: #6c757d;
    --border-color: #dee2e6;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --font-family: 'Roboto', sans-serif; /* Font Roboto agar konsisten */
    --border-radius: 8px;
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
  
body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    padding-top: 80px; /* Memberi ruang untuk header fixed */
}

/* --- HEADER BARU DARI HALAMAN1.CSS --- */
header {
    background-color: #7C5C52;
    color: #fff;
    padding: 15px 5%;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1002;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .text h1 {
    color:#7BA66E;
    font-weight: 750;
    font-size: 2.5rem;
    margin: 0;
}

header nav {
    display: flex;
    align-items: center;
}

.navbar-right {
    position: relative;
    font-size: 1.5rem;
    color: white; /* Ikon keranjang dibuat putih */
}
  
.cart-count {
    position: absolute;
    top: -8px;
    right: -10px;
    background-color: var(--danger-color);
    color: white;
    border-radius: 50%;
    padding: 0.1rem 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
}


/* --- Main Container & Layout (Sedikit modifikasi) --- */
.container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
}

.payment-title {
    text-align: center;
    margin-bottom: 40px;
}

.payment-title h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.payment-title p {
    font-size: 1.1rem;
    color: var(--text-light);
}

.payment-layout {
    display: grid;
    grid-template-columns: 1fr 0.75fr;
    gap: 40px;
    align-items: flex-start;
}

/* --- Sisa CSS sama dengan pembayaran-revised.css --- */
.cart-details-section {
    background: var(--card-background);
    padding: 25px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}
.cart-details-section h3 {
    font-size: 1.5rem;
    padding-bottom: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
}
.cart-items { display: flex; flex-direction: column; gap: 20px; }
.cart-item { display: flex; align-items: center; gap: 20px; }
.empty-cart { text-align: center; padding: 40px; color: var(--text-light); }
.empty-cart i { font-size: 3rem; margin-bottom: 15px; display: block; }
.cart-item img { width: 80px; height: 80px; object-fit: cover; border-radius: var(--border-radius); border: 1px solid var(--border-color); }
.cart-item-info { flex-grow: 1; }
.item-name { font-weight: 600; }
.item-price { color: var(--text-light); font-size: 0.9rem; }
.cart-item-controls { display: flex; align-items: center; gap: 15px; }
.quantity-control { display: flex; align-items: center; gap: 12px; border: 1px solid var(--border-color); border-radius: 20px; padding: 4px 8px; }
.quantity-control button { background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-light); cursor: pointer; width: 20px; height: 20px; line-height: 20px; text-align: center; }
.item-quantity { font-weight: 500; }
.remove-button { background: none; border: none; color: var(--danger-color); cursor: pointer; font-size: 1.1rem; transition: color 0.2s ease; }
.remove-button:hover { color: #a71d2a; }
.payment-summary-section { background: var(--card-background); padding: 25px; border-radius: var(--border-radius); box-shadow: var(--box-shadow); position: sticky; top: 120px; /* Disesuaikan dengan tinggi header + margin */}
.payment-summary-section h3, .payment-methods h4 { font-size: 1.5rem; padding-bottom: 15px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); }
.summary-total { display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 600; margin-bottom: 30px; }
.total-price { color: var(--primary-color); }
.payment-methods h4 { font-size: 1.2rem; border: none; padding-bottom: 0; margin-bottom: 15px; }
.method-card { display: flex; align-items: center; gap: 15px; border: 2px solid var(--border-color); border-radius: var(--border-radius); padding: 15px; cursor: pointer; transition: all 0.3s ease; position: relative; margin-bottom: 15px; }
.method-card:hover { border-color: var(--primary-color); background-color: #f5f2f0; }
.method-card img { width: 150px; height: 50px; object-fit: contain; }
.method-card p { font-weight: 500; flex-grow: 1; }
.method-card .checkmark { font-size: 1.5rem; color: var(--success-color); opacity: 0; transform: scale(0.5); transition: all 0.3s ease; }
.method-card.selected { border-color: var(--primary-color); background-color: #f0ebe8; }
.method-card.selected .checkmark { opacity: 1; transform: scale(1); }
.pay-button { width: 100%; padding: 15px; background-color: var(--primary-color); color: white; border: none; border-radius: var(--border-radius); font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease, transform 0.2s ease; margin-top: 20px; display: flex; justify-content: center; align-items: center; gap: 10px; }
.pay-button:hover { background-color: var(--secondary-color); transform: translateY(-2px); }

/* --- Media Queries --- */
@media (max-width: 992px) { .payment-layout { grid-template-columns: 1fr; } }
@media (max-width: 480px) {
    body { padding-top: 70px; }
    header .text h1 { font-size: 2rem; }
    .cart-item { flex-direction: column; align-items: flex-start; }
    .cart-item-controls { width: 100%; justify-content: space-between; margin-top: 10px; }
    .payment-title h2 { font-size: 2rem; }
    .method-card img { width: 80px; }
}
</style>
<body>

  <header>
    <div class="text">
      <a href="Halaman1.html" style="text-decoration: none;"><h1>Jamupura</h1></a>
    </div>
    <nav>
        <div class="navbar-right">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-count" id="cart-count">0</span>
        </div>
    </nav>
  </header>

  <div class="container">
    <div class="payment-title">
        <h2>Checkout Pembayaran</h2>
        <p>Selesaikan pesanan Anda dengan mengisi detail di bawah ini.</p>
    </div>

    <div class="payment-layout">
        <div class="cart-details-section">
            <h3><i class="fas fa-shopping-bag"></i> Rincian Pesanan</h3>
            <div class="cart-items">
                </div>
        </div>

        <div class="payment-summary-section">
            <form id="paymentForm" action="pembayaran.php" method="post">
                <input type="hidden" name="cart_data" id="cart_data">
                <input type="hidden" name="total_harga" id="total_harga">
                <input type="hidden" name="payment_method" id="payment_method">
                <input type="hidden" name="antrian" value="23">

                <h3><i class="fas fa-file-invoice-dollar"></i> Ringkasan Pembayaran</h3>

                <div class="summary-total">
                    <span>Total Belanja</span>
                    <span class="total-price">Rp 0</span>
                </div>

                <div class="payment-methods">
                    <h4>Pilih Metode Pembayaran</h4>
                    <div class="method-card" data-method="QRIS">
                        <img src="qris.jpg" alt="QRIS" />
                        <p>QRIS</p>
                        <i class="fas fa-check-circle checkmark"></i>
                    </div>
                    <div class="method-card" data-method="COD">
                        <img src="cod2.png" alt="COD" />
                        <p>Bayar Langsung (COD)</p>
                        <i class="fas fa-check-circle checkmark"></i>
                    </div>
                </div>

                <button type="submit" class="pay-button">
                    <i class="fas fa-lock"></i> Bayar Sekarang
                </button>
            </form>
        </div>
    </div>
  </div>

  <script>
    // Javascript tidak perlu diubah
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.querySelector('.total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function updateCartStorage() { localStorage.setItem('cart', JSON.stringify(cart)); }
    function renderCart() {
      cartItemsContainer.innerHTML = '';
      let total = 0;
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><i class="fas fa-box-open"></i><p>Keranjang Anda kosong.</p></div>';
        totalPriceElement.textContent = 'Rp 0';
        cartCount.textContent = '0';
        return;
      }
      cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<img src="${item.image}" alt="${item.name}" /><div class="cart-item-info"><p class="item-name">${item.name}</p><p class="item-price">Rp ${item.price.toLocaleString()}</p></div><div class="cart-item-controls"><div class="quantity-control"><button class="decrease" data-index="${index}">-</button><span class="item-quantity">${item.quantity}</span><button class="increase" data-index="${index}">+</button></div><button class="remove-button" data-index="${index}"><i class="fas fa-trash-alt"></i></button></div>`;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
      });
      totalPriceElement.textContent = `Rp ${total.toLocaleString()}`;
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    cartItemsContainer.addEventListener('click', function (e) {
      if (!e.target.closest('button')) return;
      const button = e.target.closest('button');
      const index = parseInt(button.dataset.index);
      if (button.classList.contains('increase')) { cart[index].quantity += 1; }
      else if (button.classList.contains('decrease')) { cart[index].quantity > 1 ? cart[index].quantity -= 1 : cart.splice(index, 1); }
      else if (button.classList.contains('remove-button')) { cart.splice(index, 1); }
      updateCartStorage();
      renderCart();
    });
    const paymentMethods = document.querySelectorAll('.method-card');
    paymentMethods.forEach(method => {
      method.addEventListener('click', function () {
        paymentMethods.forEach(m => m.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById("payment_method").value = this.dataset.method;
      });
    });
    document.getElementById('paymentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const selectedMethod = document.querySelector('.method-card.selected');
      if (cart.length === 0) { alert('Keranjang Anda kosong.'); return; }
      if (!selectedMethod) { alert('Silakan pilih metode pembayaran.'); return; }
      document.getElementById("cart_data").value = cart.map(item => `${item.name} x ${item.quantity}`).join(', ');
      document.getElementById("total_harga").value = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      this.submit();
    });
    renderCart();
  </script>
</body>
</html>