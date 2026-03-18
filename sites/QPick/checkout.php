<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QPick - Оформление заказа</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'php/header.php'; ?>

    <main>
        <!-- Оформление заказа -->
        <section class="checkout">
            <h1>Оформление заказа</h1>

            <div class="checkout-wrapper">
                <!-- Левая часть: Адрес доставки -->
                <div class="checkout-left">
                    <div class="delivery-card">
                        <div class="delivery-header">
                            <h2>Доставка курьером</h2>
                            <span class="delivery-price">499 ₸</span>
                        </div>

                        <div class="delivery-map-small">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.5484257900234!2d71.47624101177038!3d51.160370971630386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38845c9d8a9a9a9b%3A0x123456789!2sAksay-3a%2C%2062%2C%20Almaty%2C%20Kazakhstan!5e0!3m2!1sru!2skz!4v1234567890" 
                                    width="100%" height="200" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>

                        <div class="address-section">
                            <h3>
                                <span class="address-icon">📍</span>
                                Адрес доставки
                            </h3>

                            <div class="form-group">
                                <select class="form-control">
                                    <option value="">Город</option>
                                    <option value="almaty">Алматы</option>
                                    <option value="astana">Астана</option>
                                    <option value="karaganda">Карганда</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Улица / Район" value="">
                                <span class="form-icon">✏️</span>
                            </div>

                            <div class="form-row">
                                <div class="form-group flex-1">
                                    <input type="text" class="form-control" placeholder="Дом">
                                    <span class="form-icon">✏️</span>
                                </div>
                                <div class="form-group flex-1">
                                    <input type="text" class="form-control" placeholder="Подъезд">
                                    <span class="form-icon">✏️</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Квартира">
                                <span class="form-icon">✏️</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Правая часть: Заказ и оплата -->
                <div class="checkout-right">
                    <!-- Ваш заказ -->
                    <div class="order-card">
                        <h2>Ваш заказ</h2>

                        <div class="order-items">
                            <div class="order-item">
                                <span>1x Наушники Apple BYZ S852I</span>
                                <span>Т 2 927</span>
                            </div>
                            <div class="order-item">
                                <span>Доставка</span>
                                <span>Т 499</span>
                            </div>
                        </div>

                        <div class="order-total">
                            <span>К оплате</span>
                            <span>Т 3 426</span>
                        </div>
                    </div>

                    <!-- Способ оплаты -->
                    <div class="payment-card">
                        <h3>Способ оплаты</h3>

                        <div class="form-group">
                            <select class="form-control">
                                <option value="kaspi">💳 Счет на kaspi.kz</option>
                                <option value="card">💳 Карта</option>
                                <option value="cash">💵 Наличные при доставке</option>
                            </select>
                        </div>

                        <div class="promo-field">
                            <input type="text" class="form-control" placeholder="Есть промокод?">
                            <span class="form-icon">🎁</span>
                        </div>
                    </div>

                    <!-- Номер получателя -->
                    <div class="phone-card">
                        <h3>Номер получателя</h3>

                        <div class="form-group">
                            <input type="tel" class="form-control phone-input" placeholder="+7 __ __ __">
                        </div>
                    </div>

                    <!-- Кнопка оформления -->
                    <button class="btn btn-dark btn-full" onclick="completeOrder()">Закончить оформление</button>
                </div>
            </div>
        </section>
    </main>

    <?php include 'php/footer.php'; ?>
    <script src="js/script.js"></script>
</body>
</html>
