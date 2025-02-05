document.addEventListener('DOMContentLoaded', () => {
    // Аккордеон
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const parent = header.parentElement;
            parent.classList.toggle("active");
        });
    });
  
  
  // Элементы
  const menu = document.querySelector('.side_bar'),
        menuItems = document.querySelectorAll('.nav_item a'),
        menuCheckbox = document.querySelector('#menu-checkbox'),
        hamburger = document.querySelector('#toggle-btn'),
        body = document.body,
        header = document.querySelector('header'); // Получаем высоту хедера

  // Функция для открытия/закрытия бокового меню
  function toggleMenu() {
      menu.classList.toggle('side_bar_active', menuCheckbox.checked || hamburger.classList.contains('active'));
      body.classList.toggle('no-scroll', menuCheckbox.checked || hamburger.classList.contains('active'));
  }

  // Слушаем изменение состояния чекбокса для открытия/закрытия меню
  menuCheckbox.addEventListener('change', toggleMenu);

  // Слушаем клик по гамбургеру для переключения его состояния
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      toggleMenu();
  });

  // Закрытие меню при клике на элемент
  menuItems.forEach(item => {
      item.addEventListener('click', () => {
          if (menu.classList.contains('side_bar_active')) {
              menu.classList.remove('side_bar_active');
              body.classList.remove('no-scroll');
              hamburger.classList.remove('active');
              menuCheckbox.checked = false; // Снимаем чекбокс
          }
      });
  });

  // Функция плавного скролла
  function smoothScroll(target) {
      const headerOffset = header ? header.offsetHeight + 20 : 70; // Коррекция на высоту header
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 400; // Время анимации в мс
      let startTime = null;

      function animation(currentTime) {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

          if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      }

      requestAnimationFrame(animation);
  }

  // Обработчик клика на ссылки в меню
  menuItems.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1); // Получаем id цели
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
              smoothScroll(targetSection); // Плавный скролл
              // Закрытие гамбургера и меню при клике на ссылку
              menuCheckbox.checked = false; // Закрываем меню, если использован чекбокс
              toggleMenu(); 
          }
      });
  });
});
