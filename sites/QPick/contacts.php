<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QPick - Контакты</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'php/header.php'; ?>

    <main>
        <!-- Контакты -->
        <section class="contacts">
            <!-- <h1>Контакты</h1> -->
            
            <!-- Офис -->
            <div class="contact-section">
                <h1>Наш офис</h1>
                
                <div class="office-container">
                    <div class="office-card">
                        <div class="office-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.5484257900234!2d71.47624101177038!3d51.160370971630386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38845c9d8a9a9a9b%3A0x123456789!2sAksay-3a%2C%2062%2C%20Almaty%2C%20Kazakhstan!5e0!3m2!1sru!2skz!4v1234567890" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div class="office-info">
                            <div class="office-address">
                                <span class="location-icon">📍</span>
                                <div>
                                    <p>Аксай-3а, 62ф, Алматы, Казахстан</p>
                                    <p>3 этаж, 35 кабинет</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Социальные сети -->
                    <div class="socials-column">
                        <a href="https://wa.me/77777777777" class="social-contact whatsapp" target="_blank" title="WhatsApp">
                            <span>💬</span>
                        </a>
                        <a href="https://vk.com" class="social-contact vk" target="_blank" title="VK">
                            <span>V</span>
                        </a>
                        <a href="https://instagram.com" class="social-contact instagram" target="_blank" title="Instagram">
                            <span>📷</span>
                        </a>
                        <a href="https://t.me" class="social-contact telegram" target="_blank" title="Telegram">
                            <span>✈️</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Телефон -->
            <div class="contact-section">
                <div class="phone-contact">
                    <span class="phone-icon">☎</span>
                    <a href="tel:+77777777777">+7 777 777 77 77</a>
                </div>
            </div>
        </section>
    </main>

    <?php include 'php/footer.php'; ?>
    <script src="js/script.js"></script>
</body>
</html>
