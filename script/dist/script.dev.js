"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // При загрузке страницы устанавливаем позицию скролла в верхнюю часть
  window.scrollTo(0, 0);
  var lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    var welcomeScreen = document.querySelector(".welcome-screen");
    var blackCircle = document.querySelector(".black-circle");
    var mainLanding = document.querySelector('.main-landing');
    var scrollPosition = window.scrollY;
    var headerLogo = this.document.querySelector('.header-logo');

    if (scrollPosition > lastScrollTop) {
      // Прокрутка вниз
      if (scrollPosition < window.innerHeight) {
        var circleSize = (window.innerHeight - scrollPosition) * 2;
        console.log(circleSize);
        blackCircle.style.width = "".concat(2000 + 400, "px");
        blackCircle.style.height = "".concat(2000 + 400, "px");
        blackCircle.style.borderRadius = "0";
        this.setTimeout(function () {
          mainLanding.classList.add('show');
          headerLogo.classList.remove('hd');
        }, [300]);
      } else {
        welcomeScreen.style.display = "none";
      }
    }

    lastScrollTop = scrollPosition;
  }); // Обработчик перед выгрузкой страницы

  window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
  });
  var observer = new IntersectionObserver(function (en) {
    en.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });
  var hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(function (el) {
    return observer.observe(el);
  });
  var burger = document.querySelector('.header-burger');
  var burgerContent = document.querySelector('.header-burger__content');
  burger.addEventListener('click', function () {
    burger.classList.toggle('show');
    burgerContent.classList.toggle('show');
    document.querySelector('body').classList.toggle('lock');
  });
  var links = document.querySelectorAll('.burger-items .burger-item a[href^="#"]');
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      document.querySelector('body').classList.remove('lock');
      document.querySelector('.header-burger__content').classList.remove('show');
      document.querySelector('.header-burger').classList.remove('show'); // Предотвращаем стандартное поведение ссылки

      e.preventDefault(); // Получаем целевой элемент, к которому нужно прокрутиться

      var targetId = this.getAttribute("href").substring(1);
      var targetElement = document.getElementById(targetId); // Вычисляем расстояние от начала страницы до целевого элемента

      var targetPosition = targetElement.offsetTop; // Плавно прокручиваем страницу до целевой позиции

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });
});