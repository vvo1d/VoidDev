<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QPick - Избранное</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'php/header.php'; ?>

    <main>
        <!-- Избранное -->
        <section class="favorites">
            <h1>Избранное</h1>

            <!-- Пустое избранное -->
            <div class="empty-favorites" id="emptyFavorites">
                <div class="empty-content">
                    <div class="empty-icon">♡</div>
                    <h2>Избранное пусто</h2>
                    <p>Добавьте товары в избранное, чтобы сохранить их</p>
                    <a href="index.php" class="btn btn-dark">Перейти в каталог</a>
                </div>
            </div>

            <!-- Заполненное избранное -->
            <div class="favorites-content" id="favoritesContent" style="display: none;">
                <!-- Наушники -->
                <div class="favorites-section">
                    <h2 class="section-title">Наушники</h2>
                    <div class="favorites-grid">
                        <!-- Товары добавляются через JavaScript -->
                    </div>
                </div>

                <!-- Беспроводные наушники -->
                <div class="favorites-section">
                    <h2 class="section-title">Беспроводные наушники</h2>
                    <div class="favorites-grid">
                        <!-- Товары добавляются через JavaScript -->
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php include 'php/footer.php'; ?>
    <script src="js/script.js"></script>
</body>
</html>
