<?php
session_start();

if (isset($_SESSION['method']) && isset($_SESSION['total']) && isset($_SESSION['items'])) {
    $method = $_SESSION['method'];
    $total = $_SESSION['total'];
    $items = urlencode($_SESSION['items']);
    $antrian = isset($_SESSION['antrian']) ? $_SESSION['antrian'] : rand(1, 9); // fallback


    session_unset();
    session_destroy();

    if ($method === 'QRIS') {
        header("Location: ../scan/qr.html?total=$total&items=$items");
        exit;
    } elseif ($method === 'COD') {
        header("Location: ../scan/cod.html?total=$total&items=$items&antrian=$antrian");
        exit;
    }
}
echo "Data tidak lengkap untuk redirect.";
?>
