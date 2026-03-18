<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QPick - Корзина</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'php/header.php'; ?>

    <main>
        <!-- Корзина -->
        <section class="cart">
            <!-- Пустая корзина -->
            <div class="empty-cart" id="emptyCart">
                <div class="empty-cart-content">
                    <div class="empty-cart-icon">
                        <svg viewBox="0 0 200 200" width="120" height="120">
                            <!-- Basket -->
                            <path d="M 60 50 L 50 70 L 50 150 Q 50 160 60 160 L 140 160 Q 150 160 150 150 L 150 70 L 140 50 Z" 
                                  stroke="#000" stroke-width="2" fill="none"/>
                            <!-- Basket lines -->
                            <line x1="65" y1="50" x2="65" y2="160" stroke="#000" stroke-width="1"/>
                            <line x1="100" y1="50" x2="100" y2="160" stroke="#000" stroke-width="1"/>
                            <line x1="135" y1="50" x2="135" y2="160" stroke="#000" stroke-width="1"/>
                            <line x1="50" y1="80" x2="150" y2="80" stroke="#000" stroke-width="1"/>
                            <line x1="50" y1="110" x2="150" y2="110" stroke="#000" stroke-width="1"/>
                            <!-- Handle -->
                            <path d="M 70 45 Q 100 20 130 45" stroke="#000" stroke-width="2" fill="none"/>
                            <!-- Dot -->
                            <circle cx="155" cy="45" r="6" fill="#ff9900"/>
                        </svg>
                    </div>
                    <h2>Корзина пуста</h2>
                    <p>Но это никогда не поздно исправить :)</p>
                    <a href="index.php" class="btn btn-dark">В каталог товаров</a>
                </div>
            </div>

            <!-- Заполненная корзина (скрыта по умолчанию) -->
            <div class="cart-filled" id="cartFilled" style="display: none;">
                <h1>Корзина</h1>
                
                <div class="cart-wrapper">
                    <div class="cart-left">
                        <!-- Товары в корзине -->
                        <div class="cart-items" id="cartItems">
                            <!-- Товары добавляются через JavaScript -->
                        </div>

                        <!-- Доставка -->
                        <div class="delivery-section">
                            <h3>Доставка</h3>
                            
                            <div class="delivery-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.5484257900234!2d71.47624101177038!3d51.160370971630386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38845c9d8a9a9a9b%3A0x123456789!2sAksay-3a%2C%2062%2C%20Almaty%2C%20Kazakhstan!5e0!3m2!1sru!2skz!4v1234567890" 
                                        width="100%" height="250" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>

                            <div class="delivery-options">
                                <div class="delivery-option">
                                    <select id="deliverySelect" onchange="updateDelivery()">
                                        <option value="0">Самовывоз (бесплатно)</option>
                                        <option value="499">Доставка курьером (499 ₸)</option>
                                        <option value="999">Экспресс доставка (999 ₸)</option>
                                    </select>
                                </div>
                                <div class="delivery-price" id="deliveryPrice">0 ₸</div>
                            </div>
                        </div>
                    </div>

                    <!-- Справа: Итого -->
                    <div class="cart-right">
                        <div class="cart-summary">
                            <div class="summary-header">итого</div>
                            
                            <div class="summary-amount">
                                <span id="totalAmount">0 ₸</span>
                            </div>

                            <button class="btn btn-dark btn-checkout" onclick="goToCheckout()">Перейти к оформлению</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php include 'php/footer.php'; ?>
    <script src="js/script.js"></script>
</body>
</html>
