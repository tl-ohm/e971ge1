document.addEventListener('DOMContentLoaded', () => {
  initAnimations();

  const header = document.getElementById('navbar');
  const logo = document.querySelector('.logo');
  const navItems = document.querySelectorAll('nav ul li');

  header.style.opacity = '0';
  header.style.visibility = 'hidden';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');

      setTimeout(() => {
        logo.classList.add('visible');

        navItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, 100 * index);
        });
      }, 300);
    } else {
      header.classList.remove('scrolled');
      logo.classList.remove('visible');
      navItems.forEach(item => {
        item.classList.remove('visible');
      });
    }

    checkScroll();
  });

  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
      }

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  const categoryBtns = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      const category = btn.dataset.category;

      productCards.forEach(card => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        if (category === 'all' || card.dataset.category === category) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';

          setTimeout(() => {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          }, 400);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';

          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const calendarGrid = document.querySelector('.calendar-grid');
  const monthYear = document.querySelector('.month-year');
  const prevMonthBtn = document.querySelector('.prev-month');
  const nextMonthBtn = document.querySelector('.next-month');

  if (calendarGrid && monthYear && prevMonthBtn && nextMonthBtn) {
    renderCalendar();

    prevMonthBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });

    function renderCalendar() {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

      calendarGrid.innerHTML = '';

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
      });

      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-date');
        calendarGrid.appendChild(emptyCell);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar-date');
        dateElement.textContent = day;

        if (day === currentDate.getDate() &&
          currentMonth === currentDate.getMonth() &&
          currentYear === currentDate.getFullYear()) {
          dateElement.classList.add('active');
        }

        if ((currentMonth === 4 && currentYear === 2025 && (day === 20 || day === 25)) ||
          (currentMonth === 5 && currentYear === 2025 && (day === 1 || day === 10))) {
          dateElement.classList.add('has-event');
        }

        dateElement.addEventListener('click', () => {
          document.querySelectorAll('.calendar-date').forEach(date => {
            date.classList.remove('active');
          });
          dateElement.classList.add('active');
        });

        setTimeout(() => {
          calendarGrid.appendChild(dateElement);
          dateElement.style.opacity = '0';
          dateElement.style.transform = 'scale(0.8)';

          setTimeout(() => {
            dateElement.style.transition = 'all 0.3s ease';
            dateElement.style.opacity = '1';
            dateElement.style.transform = 'scale(1)';
          }, 10);
        }, day * 20);
      }
    }
  }

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      let isValid = true;

      if (!nameInput.value.trim()) {
        isValid = false;
        showError(nameInput, 'Name is required');
      } else {
        removeError(nameInput);
      }

      if (!emailInput.value.trim()) {
        isValid = false;
        showError(emailInput, 'Email is required');
      } else if (!isValidEmail(emailInput.value)) {
        isValid = false;
        showError(emailInput, 'Please enter a valid email');
      } else {
        removeError(emailInput);
      }

      if (!messageInput.value.trim()) {
        isValid = false;
        showError(messageInput, 'Message is required');
      } else {
        removeError(messageInput);
      }

      if (isValid) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          submitButton.innerHTML = 'Send Message';
          submitButton.disabled = false;

          const successMessage = document.createElement('div');
          successMessage.classList.add('success-message');
          successMessage.textContent = 'Your message has been sent successfully!';
          successMessage.style.color = 'green';
          successMessage.style.marginTop = '1rem';
          successMessage.style.opacity = '0';
          successMessage.style.transform = 'translateY(10px)';
          contactForm.appendChild(successMessage);

          setTimeout(() => {
            successMessage.style.transition = 'all 0.5s ease';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';

            setTimeout(() => {
              successMessage.style.opacity = '0';
              successMessage.style.transform = 'translateY(-10px)';

              setTimeout(() => {
                successMessage.remove();
              }, 500);
            }, 3000);
          }, 10);
        }, 1500);
      }
    });

    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');

      errorElement.classList.add('error-message');
      errorElement.textContent = message;
      errorElement.style.color = 'red';
      errorElement.style.fontSize = '0.8rem';
      errorElement.style.marginTop = '0.5rem';
      errorElement.style.opacity = '0';
      errorElement.style.transform = 'translateY(-5px)';

      if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
      }

      input.style.borderColor = 'red';

      setTimeout(() => {
        errorElement.style.transition = 'all 0.3s ease';
        errorElement.style.opacity = '1';
        errorElement.style.transform = 'translateY(0)';
      }, 10);
    }

    function removeError(input) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message');

      if (errorElement) {
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-5px)';

        setTimeout(() => {
          formGroup.removeChild(errorElement);
        }, 300);
      }

      input.style.borderColor = '';
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const circle = document.createElement('span');
      circle.style.position = 'absolute';
      circle.style.top = '50%';
      circle.style.left = '50%';
      circle.style.transform = 'translate(-50%, -50%)';
      circle.style.width = '0';
      circle.style.height = '0';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      circle.style.zIndex = '-1';

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(circle);

      circle.animate(
        [
          { width: '0', height: '0', opacity: 1 },
          { width: '300px', height: '300px', opacity: 0 }
        ],
        {
          duration: 600,
          easing: 'ease-out'
        }
      );

      setTimeout(() => {
        circle.remove();
      }, 600);

      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      btn.style.backgroundColor = 'var(--primary-green)';
      btn.style.color = 'var(--white)';
      btn.style.borderColor = 'var(--primary-green)';

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  });

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const value = input.value.trim();

      if (value && isValidEmail(value)) {
        const btn = newsletterForm.querySelector('.newsletter-btn');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.backgroundColor = '#4CAF50';

        newsletterForm.animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
          ],
          {
            duration: 500,
            easing: 'ease-in-out'
          }
        );

        input.value = '';

        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
          btn.style.backgroundColor = '';
        }, 2000);
      } else {
        input.style.boxShadow = '0 0 0 2px red';

        input.animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
          ],
          {
            duration: 500,
            easing: 'ease-in-out'
          }
        );

        setTimeout(() => {
          input.style.boxShadow = '';
        }, 2000);
      }
    });

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  function initAnimations() {
    const hero = document.querySelector('.hero');
    setTimeout(() => {
      hero.classList.add('visible');
    }, 300);

    checkScroll();
  }

  function checkScroll() {
    const sections = document.querySelectorAll('.section');
    const sectionTitles = document.querySelectorAll('.section-title');
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    const serviceCards = document.querySelectorAll('.service-card');
    const productCards = document.querySelectorAll('.product-card');
    const calendarContainer = document.querySelector('.calendar-container');
    const eventsList = document.querySelector('.events-list');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    const footerLinks = document.querySelectorAll('.footer-links');
    const footerNewsletter = document.querySelector('.footer-newsletter');

    function isInViewport(element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    }

    sections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('visible');
      }
    });

    sectionTitles.forEach(title => {
      if (isInViewport(title)) {
        title.classList.add('visible');
      }
    });

    if (isInViewport(aboutText)) {
      aboutText.classList.add('visible');
    }

    if (isInViewport(aboutImage)) {
      aboutImage.classList.add('visible');
    }

    serviceCards.forEach((card, index) => {
      if (isInViewport(card)) {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 100);
      }
    });

    productCards.forEach((card, index) => {
      if (isInViewport(card)) {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 100);
      }
    });

    if (isInViewport(calendarContainer)) {
      calendarContainer.classList.add('visible');
    }

    if (isInViewport(eventsList)) {
      eventsList.classList.add('visible');
    }

    if (isInViewport(contactInfo)) {
      contactInfo.classList.add('visible');
    }

    if (isInViewport(contactForm)) {
      contactForm.classList.add('visible');
    }

    footerLinks.forEach(link => {
      if (isInViewport(link)) {
        link.classList.add('visible');
      }
    });

    if (isInViewport(footerNewsletter)) {
      footerNewsletter.classList.add('visible');
    }
  }
});