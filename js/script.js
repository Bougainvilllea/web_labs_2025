$(document).ready(function() {
    // Мобильное меню или при  сильном сжатии экрана
    $('.mobile-menu-toggle').click(() => {
        $('.nav-menu, .hamburger').toggleClass('active');
    });
    
    $('.nav-menu a').click(function() {
        if ($(window).width() <= 767) {
            $('.nav-menu, .hamburger').removeClass('active');
        }
    });
    
    // Плавная прокрутка при нажатии на разделы-якори
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({scrollTop: target.offset().top - 20}, 800);
        }
    });
    
    // Кнопка "Вверх"
    $('#scrollToTop').click(() => {
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
    $(window).scroll(() => {
        $('#scrollToTop').toggleClass('visible', $(window).scrollTop() > 300);
    });
    
    // Карусель навыков
    const skills = ['PhotoShop', 'Illustrator', 'Python', '٩(͡๏̯͡๏)۶', 'Figma', 'HTML/CSS', 'JavaScript', 'jQuery'];
    const $track = $('.carousel-track');
    let currentSlide = 0;
    
    skills.forEach(skill => $track.append(`<div class="carousel-slide">${skill}</div>`));
    
    function goToSlide(slideIndex) {
        currentSlide = (slideIndex + skills.length) % skills.length;
        $track.css('transform', `translateX(-${currentSlide * 100}%)`);
    }
    
    $('.carousel-prev').click(() => goToSlide(currentSlide - 1));
    $('.carousel-next').click(() => goToSlide(currentSlide + 1));
    
    // Загрузка проектов из json
    $.getJSON('data/portfolio.json').done(data => {
        renderProjects(data.projects);
    }).fail(() => {
        const staticProjects = [
            {image: "image/pokemon_dedenne.png", title: "Pokemon-battle", description: "Сайт с пакемонами."},
            {image: "image/Без имени-22.png", title: "MetaChild2050", description: "Дизайн проекта с кибер-детьми."},
            {image: "image/2.png", title: "Enigma", description: "Реализация шифровальной машины."}
        ];
        renderProjects(staticProjects);
    });
    
    function renderProjects(projects) {
        const $container = $('.projects-container');
        projects.forEach(project => {
            $container.append(`
                <div class="project">
                    <div class="project-img">
                        <img src="${project.image}" alt="${project.title}">
                        <div class="project-title">${project.title}</div>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `);
        });
    }
    
    // Модальное окно
    $('#openFeedbackForm').click(() => $('#feedbackModal').fadeIn());
    $('.close-modal, #feedbackModal').click(function(e) {
        if ($(e.target).is('#feedbackModal') || $(e.target).is('.close-modal')) {
            $('#feedbackModal').fadeOut();
            resetForm();
        }
    });
    
    $('#feedbackForm').submit(function(e) {
        e.preventDefault();
        if (validateForm()) {
            $('.submit-btn').text('Отправка...').prop('disabled', true);
            setTimeout(() => {
                $('#formMessage').text('Сообщение успешно отправлено!').addClass('success').show();
                resetForm();
                $('.submit-btn').text('Отправить').prop('disabled', false);
                setTimeout(() => $('#feedbackModal').fadeOut(), 2000);
            }, 1500);
        }
    });
    
    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        $('#name, #email, #message').each(function() {
            const $field = $(this);
            const value = $field.val().trim();
            let error = '';
            
            if (!value) error = 'Поле обязательно для заполнения';
            else if ($field.is('#email') && !emailRegex.test(value)) error = 'Введите корректный email';
            
            if (error) {
                $field.addClass('error').siblings('.error-message').text(error);
                isValid = false;
            } else {
                $field.removeClass('error').siblings('.error-message').text('');
            }
        });
        
        return isValid;
    }
    
    function resetForm() {
        $('#feedbackForm')[0].reset();
        $('#name, #email, #message').removeClass('error');
        $('.error-message, #formMessage').text('').hide();
        $('#formMessage').removeClass('success error');
    }
});