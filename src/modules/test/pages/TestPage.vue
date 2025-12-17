<template>
  <div class="test-page">
    <div class="test-page__header">
      <router-link to="/" class="test-page__back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        На главную
      </router-link>
      <h1 class="test-page__title">Тестовая страница виджетов</h1>
      <p class="test-page__subtitle">Два разных дизайна чат-виджета</p>
    </div>

    <div class="test-page__content">
      <div class="widget-demo">
        <div class="widget-demo__info">
          <h2 class="widget-demo__title">
            <span class="widget-demo__badge widget-demo__badge--blue">Снизу слева</span>
            Космическая тема
          </h2>
          <p class="widget-demo__description">
            Глубокий синий фон с голубыми акцентами. Тёмная корпоративная тема.
          </p>
          <div class="widget-demo__colors">
            <div class="color-swatch" style="background: #3B82F6;" title="primary-color"></div>
            <div class="color-swatch" style="background: #0F172A;" title="bg-color"></div>
            <div class="color-swatch" style="background: #1E293B;" title="border-color"></div>
            <div class="color-swatch" style="background: #E2E8F0;" title="text-color"></div>
          </div>
        </div>
      </div>

      <div class="widget-demo">
        <div class="widget-demo__info">
          <h2 class="widget-demo__title">
            <span class="widget-demo__badge widget-demo__badge--green">Сверху слева</span>
            Изумрудная тема
          </h2>
          <p class="widget-demo__description">
            Насыщенный зелёный с тёмным фоном. Свежий и современный стиль.
          </p>
          <div class="widget-demo__colors">
            <div class="color-swatch" style="background: #10B981;" title="primary-color"></div>
            <div class="color-swatch" style="background: #0D1117;" title="bg-color"></div>
            <div class="color-swatch" style="background: #21262D;" title="border-color"></div>
            <div class="color-swatch" style="background: #C9D1D9;" title="text-color"></div>
          </div>
        </div>
      </div>

      <div class="widget-demo">
        <div class="widget-demo__info">
          <h2 class="widget-demo__title">
            <span class="widget-demo__badge widget-demo__badge--purple">Сверху справа</span>
            Неоновый Фиолетовый
          </h2>
          <p class="widget-demo__description">
            Мистический фиолетовый градиент. Глубокий и загадочный.
          </p>
          <div class="widget-demo__colors">
            <div class="color-swatch" style="background: #A855F7;" title="primary-color"></div>
            <div class="color-swatch" style="background: #1E1B4B;" title="bg-color"></div>
            <div class="color-swatch" style="background: #A855F7;" title="border-color"></div>
            <div class="color-swatch" style="background: #F3E8FF;" title="text-color"></div>
          </div>
        </div>
      </div>

      <div class="widget-demo">
        <div class="widget-demo__info">
          <h2 class="widget-demo__title">
            <span class="widget-demo__badge widget-demo__badge--orange">Снизу по центру</span>
            Янтарный Закат
          </h2>
          <p class="widget-demo__description">
            Теплый оранжевый и коричневый. Уютный и энергичный.
          </p>
          <div class="widget-demo__colors">
            <div class="color-swatch" style="background: #F97316;" title="primary-color"></div>
            <div class="color-swatch" style="background: #2A0A00;" title="bg-color"></div>
            <div class="color-swatch" style="background: #F97316;" title="border-color"></div>
            <div class="color-swatch" style="background: #FFEDD5;" title="text-color"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="test-page__features">
      <h2 class="test-page__features-title">Возможности виджета</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-card__icon">🎨</div>
          <h3 class="feature-card__title">Настройка цветов</h3>
          <p class="feature-card__text">Полная кастомизация через HTML атрибуты</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">📍</div>
          <h3 class="feature-card__title">Позиционирование</h3>
          <p class="feature-card__text">6 позиций + offset-x/offset-y</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">⚡</div>
          <h3 class="feature-card__title">Быстрые ответы</h3>
          <p class="feature-card__text">Кнопки над полем ввода</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">👋</div>
          <h3 class="feature-card__title">Приветствие</h3>
          <p class="feature-card__text">Всегда видно в начале чата</p>
        </div>
      </div>
    </div>

    <!-- Widget 1: Bottom Left - Blue Space Theme -->
    <chat-widget
      position="bottom-left"
      offset-x="20px"
      offset-y="20px"
      bot-name="OS Assistant"
      button-text="Помощь"
      placeholder="Напишите сообщение..."
      welcome-message="Привет! 👋 Я AI-ассистент компании. Чем могу помочь?"
      primary-color="#3B82F6"
      button-bg-color="#1E293B"
      text-color="#E2E8F0"
      bg-color="#0F172A"
      border-color="#1E293B"
      user-bubble-bg="#1E293B"
      user-bubble-text="#E2E8F0"
      quick-replies='["О продукте", "Цены", "Техподдержка", "Демо", "Контакты"]'
    ></chat-widget>

    <!-- Widget 2: Top Left - Emerald Theme -->
    <chat-widget
      position="top-left"
      offset-x="20px"
      offset-y="20px"
      bot-name="Futurist AI"
      button-text="Спросить"
      placeholder="Задайте вопрос..."
      welcome-message="Привет! ✨ Задай вопрос о Futurist OS — покажу как решаем задачи компаний."
      primary-color="#10B981"
      button-bg-color="#0D1117"
      text-color="#C9D1D9"
      bg-color="#0D1117"
      border-color="#21262D"
      user-bubble-bg="#21262D"
      user-bubble-text="#C9D1D9"
      quick-replies='["Что такое Futurist OS?", "Как начать?", "Интеграции", "Безопасность", "Цены"]'
    ></chat-widget>

    <!-- Widget 3: Top Right - Neon Purple -->
    <chat-widget
      position="top-right"
      offset-x="20px"
      offset-y="20px"
      bot-name="Neon Purple"
      button-text="Purple"
      placeholder="Ask something..."
      welcome-message="Greetings from the Purple Void! 🔮"
      primary-color="#A855F7"
      button-bg-color="#2E1065"
      text-color="#F3E8FF"
      bg-color="#1E1B4B"
      border-color="#A855F7"
      user-bubble-bg="#2E1065"
      user-bubble-text="#F3E8FF"
    ></chat-widget>

    <!-- Widget 4: Bottom Center - Neon Orange -->
    <chat-widget
      position="bottom-center"
      offset-x="20px"
      offset-y="20px"
      bot-name="Neon Orange"
      button-text="Orange"
      placeholder="Ask something..."
      welcome-message="Welcome to the Orange Sector! 🍊"
      primary-color="#F97316"
      button-bg-color="#431407"
      text-color="#FFEDD5"
      bg-color="#2A0A00"
      border-color="#F97316"
      user-bubble-bg="#431407"
      user-bubble-text="#FFEDD5"
    ></chat-widget>
  </div>
</template>

<script setup lang="ts">
// Widget is loaded globally via index.html
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: linear-gradient(145deg, #03050c 0%, #0a1628 50%, #05080f 100%);
  padding: 40px 20px 120px;
}

.test-page__header {
  max-width: 1200px;
  margin: 0 auto 60px;
  text-align: center;
}

.test-page__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 24px;
  transition: color 0.2s;
}

.test-page__back:hover {
  color: #10B981;
}

.test-page__title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 600;
  color: #f6f8ff;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.test-page__subtitle {
  font-size: 18px;
  color: rgba(235, 240, 255, 0.68);
}

.test-page__content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.widget-demo {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.widget-demo:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.widget-demo__info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.widget-demo__title {
  font-size: 20px;
  font-weight: 600;
  color: #f6f8ff;
  display: flex;
  align-items: center;
  gap: 12px;
}

.widget-demo__badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.widget-demo__badge--blue {
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  color: white;
}

.widget-demo__badge--green {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
}

.widget-demo__badge--purple {
  background: linear-gradient(135deg, #A855F7, #7E22CE);
  color: white;
}

.widget-demo__badge--orange {
  background: linear-gradient(135deg, #F97316, #C2410C);
  color: white;
}

.widget-demo__description {
  font-size: 15px;
  color: rgba(235, 240, 255, 0.68);
  line-height: 1.6;
}

.widget-demo__colors {
  display: flex;
  gap: 8px;
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: help;
}

.test-page__features {
  max-width: 1200px;
  margin: 60px auto 0;
}

.test-page__features-title {
  font-size: 24px;
  font-weight: 600;
  color: #f6f8ff;
  margin-bottom: 32px;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: background 0.2s;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.04);
}

.feature-card__icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature-card__title {
  font-size: 16px;
  font-weight: 600;
  color: #f6f8ff;
  margin-bottom: 8px;
}

.feature-card__text {
  font-size: 14px;
  color: rgba(235, 240, 255, 0.6);
}

@media (max-width: 768px) {
  .test-page {
    padding: 24px 16px 140px;
  }
}
</style>

<!-- Global overrides for chat widget to fix z-index stacking -->
<style>
.chat-container.svelte-1vmstko {
  z-index: 10000 !important;
}
.chat-toggle-button.svelte-1vmstko {
  z-index: 10000 !important;
}
</style>
