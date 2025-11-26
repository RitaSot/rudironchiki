document.addEventListener('DOMContentLoaded', function() {
    // ========== КАРУСЕЛЬ УЧАСТНИКОВ ==========
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const teamMembers = document.querySelectorAll('.team-member');

    let currentIndex = 0;
    const totalSlides = teamMembers.length;
    let autoSlideInterval;

    // Функции карусели
    const updateCarousel = () => {
        if (window.innerWidth < 768) {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    const nextSlide = () => {
        if (window.innerWidth < 768) {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }
    };

    const prevSlide = () => {
        if (window.innerWidth < 768) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
    };

    const startAutoSlide = () => {
        if (window.innerWidth < 768) {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    };

    const stopAutoSlide = () => clearInterval(autoSlideInterval);

    // Инициализация карусели
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });

    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();

    // ========== ПЕРЕКЛЮЧАТЕЛЬ ГРАФИКОВ ==========
    const chartNavPrev = document.querySelector('.prev-chart-btn');
    const chartNavNext = document.querySelector('.next-chart-btn');
    const chartIndicators = document.querySelectorAll('.chart-indicator');
    const chartTitle = document.querySelector('.chart-title');
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');

    const chartNames = {
        'temperature': 'Температура',
        'humidity': 'Влажность',
        'pressure': 'Давление',
        'co2': 'CO₂'
    };

    let currentChartIndex = 0;
    const totalCharts = chartPlaceholders.length;
    let autoChartInterval;

    // Функции графиков
    const updateChart = () => {
        chartPlaceholders.forEach((chart, index) => {
            chart.classList.toggle('active', index === currentChartIndex);
        });

        if (chartTitle) {
            const chartType = chartPlaceholders[currentChartIndex].id.split('-')[0];
            chartTitle.textContent = chartNames[chartType] || 'График';
        }

        chartIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentChartIndex);
        });
    };

    const nextChart = () => {
        currentChartIndex = (currentChartIndex + 1) % totalCharts;
        updateChart();
    };

    const prevChart = () => {
        currentChartIndex = (currentChartIndex - 1 + totalCharts) % totalCharts;
        updateChart();
    };

    const startAutoChart = () => {
        autoChartInterval = setInterval(nextChart, 7000);
    };

    const stopAutoChart = () => clearInterval(autoChartInterval);

    // Инициализация графиков
    if (chartNavPrev && chartNavNext) {
        chartNavPrev.addEventListener('click', prevChart);
        chartNavNext.addEventListener('click', nextChart);
    }

    chartIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentChartIndex = index;
            updateChart();
        });
    });

    const chartsWrapper = document.querySelector('.charts-wrapper');
    if (chartsWrapper) {
        chartsWrapper.addEventListener('mouseenter', stopAutoChart);
        chartsWrapper.addEventListener('mouseleave', startAutoChart);
    }

    startAutoChart();

    // ========== ОБЩИЕ ФУНКЦИИ ==========
    // Обработка изменения размера окна
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            carousel.style.transform = 'translateX(0)';
        } else {
            updateCarousel();
        }

        stopAutoSlide();
        startAutoSlide();
    };

    window.addEventListener('resize', handleResize);

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Управление с клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevChart();
        if (e.key === 'ArrowRight') nextChart();
    });

    // Анимация при прокрутке
    const animateOnScroll = () => {
        document.querySelectorAll('.team-member, .wide-section, .chart-container').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Инициализация анимаций
    window.addEventListener('load', () => {
        document.querySelectorAll('.team-member, .wide-section, .chart-container').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        setTimeout(animateOnScroll, 100);
        updateChart(); // Инициализация первого графика
    });

    window.addEventListener('scroll', animateOnScroll);
});