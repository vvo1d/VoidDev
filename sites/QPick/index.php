<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QPick - Главная</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'php/header.php'; ?>

    <main>
        <!-- Баннер -->
        <section class="banner">
            <div class="banner-content">
                <div class="banner-text">
                    <h2>Аксессуары для<br>Iphone 13 Pro Max</h2>
                </div>
                <div class="banner-image">
                    <img src="./assets/img/hero-phone.png" alt="iPhone 13 Pro Max">
                </div>
            </div>
        </section>

        <!-- Категории чехлов -->
        <section class="categories">
            <h3>Чехлы</h3>
            <div class="categories-grid">
                <div class="category-card">
                    <img src="./assets/img/cover-1.png" alt="Стеклянные чехлы">
                    <h4>Стеклянные</h4>
                </div>
                <div class="category-card">
                    <img src="./assets/img/cover-2.png" alt="Силиконовые чехлы">
                    <h4>Силиконовые</h4>
                </div>
                <div class="category-card">
                    <img src="./assets/img/cover-3.png" alt="Кожаные чехлы">
                    <h4>Кожаные</h4>
                </div>
            </div>
        </section>

        <!-- Наушники -->
        <section class="products">
            <h3>Наушники</h3>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart">♡</span>
                    </div>
                    <img src="./assets/img/headphones-1.jpg" alt="Apple BYZ 5852i">
                    <h4>Apple BYZ 5852i</h4>
                    <p class="price">2927 ₸</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.7</span>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart filled">♥</span>
                    </div>
                    <img src="./assets/img/headphones-2.jpg" alt="Apple EarPods">
                    <h4>Apple EarPods</h4>
                    <p class="price">2327 ₸</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.5</span>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart">♡</span>
                    </div>
                    <img src="./assets/img/headphones-3.jpg" alt="Apple EarPods">
                    <h4>Apple EarPods</h4>
                    <p class="price">2327 ₸</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.5</span>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart filled">♥</span>
                    </div>
                    <div class="product-discount">-20%</div>
                    <img src="./assets/img/headphones-4.jpg" alt="Apple BYZ 5852i">
                    <h4>Apple BYZ 5852i</h4>
                    <p class="price">2927 ₸</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.7</span>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart">♡</span>
                    </div>
                    <img src="./assets/img/headphones-5.jpg" alt="Apple EarPods">
                    <h4>Apple EarPods</h4>
                    <p class="price">2327 ₸</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.5</span>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart">♡</span>
                    </div>
                    <img src="./assets/img/headphones-6.jpg" alt="Apple EarPods">
                    <h4>Apple EarPods</h4>
                    <p class="price">2327 ₸</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.5</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Беспроводные наушники -->
        <section class="products">
            <h3>Беспроводные наушники</h3>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart">♡</span>
                    </div>
                    <img src="./assets/img/wireless_headphones-1.jpg" alt="Apple AirPods">
                    <h4>Apple AirPods</h4>
                    <p class="price">9527 ₸</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.7</span>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart">♡</span>
                    </div>
                    <img src="./assets/img/wireless_headphones-2.jpg" alt="GERLAX GH-04">
                    <h4>GERLAX GH-04</h4>
                    <p class="price">6527 КЗТ</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.7</span>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-favorite">
                        <span class="heart">♡</span>
                    </div>
                    <img src="./assets/img/wireless_headphones-3.jpg" alt="BOROFONE BO4">
                    <h4>BOROFONE BO4</h4>
                    <p class="price">7527 КЗТ</p>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">4.7</span>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php include 'php/footer.php'; ?>
    <script src="js/script.js"></script>
</body>
</html>