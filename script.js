// JavaScript ضخم ومعقد للغاية للموقع

document.addEventListener('DOMContentLoaded', function() {
    console.log('موقع BELMO & TARIQ - جاري التحميل...');
    
    // تهيئة جميع المكونات
    initPreloader();
    initParticles();
    initTheme();
    initNavigation();
    initTabs();
    initCounters();
    initProjects();
    initContactForm();
    initScrollEffects();
    initBackToTop();
    initAnimations();
    
    console.log('جميع المكونات جاهزة!');
});

// ==================== Preloader ====================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (!preloader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = 'auto';
                
                // إطلاق بعض الرسوم المتحركة بعد التحميل
                setTimeout(() => {
                    document.querySelectorAll('.animate-on-load').forEach(el => {
                        el.classList.add('animated');
                    });
                }, 300);
            }, 500);
        }
    }, 100);
}

// ==================== Particle Background ====================
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#64ffda"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64ffda",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ==================== Theme Toggle ====================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // التحقق من تفضيلات المستخدم
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // تطبيق السمة المحفوظة أو تفضيل النظام
    if (savedTheme === 'light' || (!savedTheme && !prefersDarkScheme.matches)) {
        body.setAttribute('data-theme', 'light');
    }
    
    // تبديل السمة
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // تأثيرات بصرية إضافية
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// ==================== Navigation ====================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // تبديل القائمة الجوالة
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // إغلاق القائمة الجوالة
    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // تحديث الروابط النشطة
            mobileLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // تحديث روابط التنقل الرئيسية
            const navId = link.getAttribute('href')?.substring(1);
            if (navId) {
                navLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === `#${navId}`) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // تحديث الروابط النشطة عند التمرير
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==================== Tabs ====================
function initTabs() {
    // تبويبات "من نحن"
    const aboutTabButtons = document.querySelectorAll('.tab-button');
    const aboutTabPanes = document.querySelectorAll('.tab-pane');
    
    aboutTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // تحديث الأزرار النشطة
            aboutTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // تحديد المحتوى النشط
            aboutTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `tab-${tabId}`) {
                    pane.classList.add('active');
                }
            });
            
            // تأثيرات بصرية
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // تبويبات "خبراتنا"
    const expertiseTabHeaders = document.querySelectorAll('.tab-header-item');
    const expertiseTabPanes = document.querySelectorAll('.tab-content-pane');
    
    expertiseTabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tabId = header.getAttribute('data-tab');
            
            // تحديد الرؤوس النشطة
            expertiseTabHeaders.forEach(h => h.classList.remove('active'));
            header.classList.add('active');
            
            // تحديد المحتوى النشط
            expertiseTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${tabId}-tab`) {
                    pane.classList.add('active');
                }
            });
            
            // تأثيرات بصرية
            header.style.transform = 'scale(0.95)';
            setTimeout(() => {
                header.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ==================== Counters ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const startCounting = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const count = parseInt(element.innerText);
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            element.innerText = count + increment;
            setTimeout(() => startCounting(element), 10);
        } else {
            element.innerText = target;
        }
    };
    
    // بدء العد عند التمرير إلى القسم
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    startCounting(counter);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// ==================== Projects ====================
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsLoading = document.getElementById('projectsLoading');
    
    if (!projectsGrid) return;
    
    // بيانات المشاريع (يمكن جلبها من ملف JSON)
    const projects = [
        {
            id: 1,
            title: "نظام توصيات ذكي للتجارة الإلكترونية",
            description: "نظام ذكاء اصطناعي يقدم توصيات منتجات مخصصة بناءً على سلوك المستخدم وتفضيلاته.",
            category: "ai",
            tech: ["Python", "TensorFlow", "React", "Node.js"],
            image: "ai-project-1"
        },
        {
            id: 2,
            title: "منصة تعليمية تفاعلية",
            description: "منصة تعليمية متكاملة مع واجهة مستخدم جذابة ونظام إدارة محتوى متقدم.",
            category: "web",
            tech: ["JavaScript", "React", "MongoDB", "Express"],
            image: "web-project-1"
        },
        {
            id: 3,
            title: "هوية بصرية لمطعم راقي",
            description: "تصميم هوية بصرية متكاملة تشمل الشعار والمواد التسويقية وتصميم الموقع.",
            category: "design",
            tech: ["Adobe Illustrator", "Photoshop", "Figma"],
            image: "design-project-1"
        },
        {
            id: 4,
            title: "متجر إلكتروني متقدم",
            description: "متجر إلكتروني سريع الاستجابة مع نظام دفع آمن وإدارة مخزون ذكية.",
            category: "ecommerce",
            tech: ["React", "Node.js", "MongoDB", "Stripe API"],
            image: "ecommerce-project-1"
        },
        {
            id: 5,
            title: "لوحة تحليل بيانات الأعمال",
            description: "لوحة تحكم تفاعلية تعرض مؤشرات الأداء الرئيسية باستخدام الرسوم البيانية المتقدمة.",
            category: "ai",
            tech: ["Python", "D3.js", "React", "FastAPI"],
            image: "ai-project-2"
        },
        {
            id: 6,
            title: "موقع شركة تكنولوجيا",
            description: "موقع شركة حديث مع تصميم جرافيكي متميز وتجربة مستخدم محسنة.",
            category: "web",
            tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
            image: "web-project-2"
        },
        {
            id: 7,
            title: "تطبيق ويب تقدمي للأخبار",
            description: "تطبيق ويب يعمل دون اتصال مع ميزات إشعارات فنية وتحديثات تلقائية.",
            category: "web",
            tech: ["PWA", "React", "Service Workers", "IndexedDB"],
            image: "web-project-3"
        },
        {
            id: 8,
            title: "حملة إعلانية متكاملة",
            description: "تصميم مواد إعلانية متكاملة لمنتج جديد يشمل فيديو ورسوم متحركة.",
            category: "design",
            tech: ["After Effects", "Illustrator", "Premiere Pro"],
            image: "design-project-2"
        }
    ];
    
    // عرض المشاريع
    function displayProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <div class="project-category">${getCategoryName(project.category)}</div>
                </div>
                <div class="project-content">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <a href="#" class="project-link">
                        <span>عرض المشروع</span>
                        <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            `;
            
            // إضافة تأثيرات بصرية للصورة حسب الفئة
            const projectImage = projectCard.querySelector('.project-image');
            projectImage.style.background = getProjectGradient(project.category);
            
            projectsGrid.appendChild(projectCard);
        });
        
        // إخفاء مؤشر التحميل
        if (projectsLoading) {
            projectsLoading.style.display = 'none';
        }
        
        // إضافة تأثير الظهور
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach(card => {
                card.classList.add('visible');
            });
        }, 100);
    }
    
    // وظائف مساعدة
    function getCategoryName(category) {
        const categories = {
            'ai': 'ذكاء اصطناعي',
            'web': 'تطوير ويب',
            'design': 'تصميم جرافيكي',
            'ecommerce': 'متجر إلكتروني'
        };
        return categories[category] || category;
    }
    
    function getProjectGradient(category) {
        const gradients = {
            'ai': 'linear-gradient(135deg, #64ffda 0%, #52d1b2 100%)',
            'web': 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
            'design': 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
            'ecommerce': 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)'
        };
        return gradients[category] || 'var(--gradient-primary)';
    }
    
    // تهيئة المشاريع
    displayProjects();
    
    // إضافة معالجات الأحداث لأزرار الفلترة
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // تحديث الأزرار النشطة
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // عرض المشاريع المصفاة
            displayProjects(filter);
            
            // تأثيرات بصرية
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ==================== Contact Form ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // الحصول على بيانات النموذج
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // التحقق من صحة البيانات
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // محاكاة إرسال النموذج
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // في الواقع، هنا سيتم إرسال البيانات إلى الخادم
            console.log('تم إرسال النموذج:', formData);
            
            // إظهار رسالة النجاح
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // استعادة حالة الزر
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // تأثيرات حقول الإدخال
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function showNotification(message, type) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إضافة حدث الإغلاق
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // إزالة الإشعار تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ==================== Scroll Effects ====================
function initScrollEffects() {
    // إضافة تأثيرات الظهور عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر التي تحتوي على تأثير الظهور
    const scrollElements = document.querySelectorAll('.team-member, .service-card, .showcase-item, .timeline-item, .benefit-item');
    scrollElements.forEach(el => observer.observe(el));
    
    // تأثير التعتيم للهيدر عند التمرير
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// ==================== Back to Top ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== Animations ====================
function initAnimations() {
    // رسوم متحركة للعناصر العائمة
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach((shape, index) => {
        // إضافة تأخيرات مختلفة لكل شكل
        shape.style.animationDelay = `${index * 2}s`;
    });
    
    // تأثير الكتابة للنص في التيرمينال
    const terminalCode = document.querySelector('.terminal-body code');
    if (terminalCode) {
        const originalCode = terminalCode.textContent;
        terminalCode.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalCode.length) {
                terminalCode.textContent += originalCode.charAt(i);
                i++;
                setTimeout(typeWriter, 10);
            }
        }
        
        // بدء تأثير الكتابة عند التمرير إلى القسم
        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    terminalObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        terminalObserver.observe(document.querySelector('.code-terminal'));
    }
    
    // تأثيرات اهتزاز للأيقونات
    const icons = document.querySelectorAll('.service-icon, .showcase-icon, .benefit-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'shake 0.5s ease';
        });
        
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
    
    // إضافة CSS للاهتزاز
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: var(--text-primary);
            padding: 15px 20px;
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            border-left: 4px solid var(--accent-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left-color: var(--success-color);
        }
        
        .notification.error {
            border-left-color: var(--highlight-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification.success .notification-content i {
            color: var(--success-color);
        }
        
        .notification.error .notification-content i {
            color: var(--highlight-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 5px;
            margin-right: 10px;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: var(--text-primary);
        }
        
        .form-group.focused label {
            color: var(--accent-color);
        }
        
        .in-view {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// ==================== Window Load Event ====================
window.addEventListener('load', function() {
    // تحديث الأحجام بعد تحميل جميع الصور
    setTimeout(() => {
        // تحديث أرقام العد
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            if (counter.textContent === '0') {
                counter.textContent = counter.getAttribute('data-count');
            }
        });
    }, 1000);
    
    // إضافة تأثيرات إضافية بعد التحميل الكامل
    document.body.classList.add('fully-loaded');
});

// ==================== Challenge System ====================
class ChallengeSystem {
    constructor() {
        this.currentTime = 300; // 5 دقائق بالثواني
        this.timerInterval = null;
        this.isRunning = false;
        this.canvas = null;
        this.ctx = null;
        this.currentTool = 'pen';
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.init();
    }

    init() {
        this.initCanvas();
        this.setupEventListeners();
        this.updateTimerDisplay();
    }

    initCanvas() {
        this.canvas = document.getElementById('designCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
        
        // إعداد أحداث الرسم
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // أحداث اللمس
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.startDrawing(touch);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.draw(touch);
        });
        this.canvas.addEventListener('touchend', () => this.stopDrawing());
    }

    setCanvasSize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth - 40;
        this.canvas.height = 400;
    }

    setupEventListeners() {
        // أدوات المؤقت
        document.getElementById('btnStartTimer')?.addEventListener('click', () => this.startTimer());
        document.getElementById('btnPauseTimer')?.addEventListener('click', () => this.pauseTimer());
        document.getElementById('btnResetTimer')?.addEventListener('click', () => this.resetTimer());
        
        // أدوات الرسم
        document.querySelectorAll('.tool').forEach(tool => {
            tool.addEventListener('click', (e) => {
                this.setTool(e.currentTarget.dataset.tool);
            });
        });
        
        // أدوات التحكم بالرسم
        document.getElementById('btnClearCanvas')?.addEventListener('click', () => this.clearCanvas());
        document.getElementById('btnSaveCanvas')?.addEventListener('click', () => this.saveCanvas());
        document.getElementById('btnShareCanvas')?.addEventListener('click', () => this.shareCanvas());
        
        // تحديث حجم الـ canvas عند تغيير حجم النافذة
        window.addEventListener('resize', () => this.setCanvasSize());
    }

    startTimer() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timerInterval = setInterval(() => {
            if (this.currentTime > 0) {
                this.currentTime--;
                this.updateTimerDisplay();
                
                // تحذير عندما يتبقى 30 ثانية
                if (this.currentTime === 30) {
                    this.showTimeWarning();
                }
                
                // انتهاء الوقت
                if (this.currentTime === 0) {
                    this.endChallenge();
                }
            }
        }, 1000);
    }

    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.currentTime = 300;
        this.updateTimerDisplay();
        this.clearCanvas();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        
        document.getElementById('timerMinutes').textContent = 
            minutes.toString().padStart(2, '0');
        document.getElementById('timerSeconds').textContent = 
            seconds.toString().padStart(2, '0');
        
        // تحديث دائرة المؤقت
        const circle = document.querySelector('.timer-circle circle');
        if (circle) {
            const circumference = 2 * Math.PI * 54;
            const offset = circumference - (this.currentTime / 300) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        }
    }

    setTool(tool) {
        this.currentTool = tool;
        
        // تحديث الواجهة
        document.querySelectorAll('.tool').forEach(t => {
            t.classList.remove('active');
        });
        document.querySelector(`.tool[data-tool="${tool}"]`)?.classList.add('active');
        
        // تغيير مؤشر الماوس
        const cursorMap = {
            pen: 'crosshair',
            shapes: 'cell',
            text: 'text',
            gradient: 'grab',
            effects: 'pointer'
        };
        this.canvas.style.cursor = cursorMap[tool] || 'default';
    }

    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
    }

    draw(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.getToolColor();
        
        switch (this.currentTool) {
            case 'pen':
                this.ctx.moveTo(this.lastX, this.lastY);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                break;
                
            case 'shapes':
                this.ctx.rect(x - 25, y - 25, 50, 50);
                this.ctx.stroke();
                break;
                
            case 'text':
                this.ctx.font = '20px Arial';
                this.ctx.fillStyle = this.getToolColor();
                this.ctx.fillText('نص', x, y);
                break;
                
            case 'gradient':
                const gradient = this.ctx.createLinearGradient(this.lastX, this.lastY, x, y);
                gradient.addColorStop(0, this.getToolColor());
                gradient.addColorStop(1, '#ff6b6b');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x - 30, y - 30, 60, 60);
                break;
        }
        
        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    getToolColor() {
        const colors = {
            pen: '#64ffda',
            shapes: '#2196F3',
            text: '#333',
            gradient: '#FF9800',
            effects: '#9C27B0'
        };
        return colors[this.currentTool] || '#64ffda';
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    saveCanvas() {
        const link = document.createElement('a');
        link.download = 'تصميم-التحدي.png';
        link.href = this.canvas.toDataURL('image/png');
        link.click();
        
        this.showNotification('تم حفظ التصميم بنجاح!', 'success');
    }

    async shareCanvas() {
        if (navigator.share) {
            try {
                const blob = await new Promise(resolve => 
                    this.canvas.toBlob(resolve, 'image/png')
                );
                const file = new File([blob], 'تصميم.png', { type: 'image/png' });
                
                await navigator.share({
                    title: 'تصميمي في تحدي BELMO & TARIQ',
                    text: 'شاهد التصميم الذي أنشأته!',
                    files: [file]
                });
            } catch (err) {
                console.error('Error sharing:', err);
                this.showNotification('لم يتم المشاركة', 'error');
            }
        } else {
            this.showNotification('المشاركة غير مدعومة في متصفحك', 'info');
        }
    }

    showTimeWarning() {
        // تأثير صوتي (يمكن استبداله بملف صوتي)
        const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
        audio.volume = 0.5;
        audio.play().catch(() => {});
        
        // تأثير بصري
        document.querySelector('.timer-circle').style.animation = 'pulse 1s infinite';
        
        this.showNotification('⏰ بقي 30 ثانية فقط!', 'warning');
    }

    endChallenge() {
        this.pauseTimer();
        this.showNotification('⏰ انتهى الوقت! أحسنت العمل', 'success');
        
        // عرض النتيجة
        const score = this.calculateScore();
        this.showResult(score);
    }

    calculateScore() {
        // حساب النقاط بناءً على الوقت والجودة (محاكاة)
        const timeBonus = Math.min(this.currentTime * 2, 200);
        const complexityBonus = 500; // محاكاة
        return 300 + timeBonus + complexityBonus;
    }

    showResult(score) {
        const modal = document.createElement('div');
        modal.className = 'challenge-result-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🎉 أحسنت! اكتمل التحدي</h3>
                <div class="score-display">
                    <div class="score-value">${score}</div>
                    <div class="score-label">نقطة</div>
                </div>
                <p>لقد أكملت التحدي بنجاح! شارك تصميمك مع الأصدقاء.</p>
                <div class="modal-actions">
                    <button class="btn-modal" id="btnShareResult">مشاركة</button>
                    <button class="btn-modal" id="btnNewChallenge">تحدي جديد</button>
                    <button class="btn-modal" id="btnCloseModal">إغلاق</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // إضافة الأنماط
        const style = document.createElement('style');
        style.textContent = `
            .challenge-result-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: var(--primary-color);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                border: 3px solid var(--accent-color);
                animation: slideUp 0.5s ease;
            }
            
            .score-display {
                margin: 30px 0;
            }
            
            .score-value {
                font-size: 4rem;
                font-weight: 900;
                color: var(--accent-color);
                text-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
            }
            
            .modal-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .btn-modal {
                padding: 12px 25px;
                background: var(--accent-color);
                color: var(--primary-color);
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-modal:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(100, 255, 218, 0.3);
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // أحداث الأزرار
        document.getElementById('btnShareResult')?.addEventListener('click', () => this.shareCanvas());
        document.getElementById('btnNewChallenge')?.addEventListener('click', () => {
            modal.remove();
            this.resetTimer();
            this.startTimer();
        });
        document.getElementById('btnCloseModal')?.addEventListener('click', () => modal.remove());
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = 'challenge-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : 
                        type === 'warning' ? '#FF9800' : '#64ffda'};
            color: #0a192f;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// تهيئة نظام التحديات
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('challenges')) {
        new ChallengeSystem();
    }
});

// ==================== AI Chat Assistant ====================
class AIChatAssistant {
    constructor() {
        this.messages = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialMessage();
    }

    setupEventListeners() {
        // زر الإرسال
        document.getElementById('btnSendAI')?.addEventListener('click', () => this.sendMessage());
        
        // إدخال النص (Enter للإرسال)
        document.getElementById('aiInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // الأزرار السريعة
        document.querySelectorAll('.quick-action').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });
        
        // زر الصوت
        document.getElementById('btnVoice')?.addEventListener('click', () => this.toggleVoiceInput());
    }

    loadInitialMessage() {
        this.addMessage('ai', 'مرحباً! أنا مساعد BELMO الذكي. كيف يمكنني مساعدتك اليوم؟');
    }

    addMessage(sender, content) {
        const messagesContainer = document.getElementById('aiChatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">الآن</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ sender, content, time: new Date() });
    }

    sendMessage() {
        const input = document.getElementById('aiInput');
        if (!input || !input.value.trim()) return;
        
        const message = input.value.trim();
        this.addMessage('user', message);
        input.value = '';
        
        // محاكاة الرد الذكي
        setTimeout(() => {
            this.generateAIResponse(message);
        }, 1000);
    }

    generateAIResponse(userMessage) {
        let response = '';
        
        if (userMessage.includes('تصميم') || userMessage.includes('شعار') || userMessage.includes('ألوان')) {
            response = this.generateDesignResponse();
        } else if (userMessage.includes('كود') || userMessage.includes('برمجة') || userMessage.includes('جافاسكريبت')) {
            response = this.generateCodeResponse();
        } else if (userMessage.includes('فكرة') || userMessage.includes('مشروع') || userMessage.includes('ابداع')) {
            response = this.generateIdeaResponse();
        } else {
            response = this.generateGeneralResponse();
        }
        
        this.addMessage('ai', response);
    }

    generateDesignResponse() {
        const colors = ['#64ffda', '#ff6b6b', '#2196F3', '#9C27B0', '#FF9800'];
        const fonts = ['Cairo', 'Tajawal', 'Arial', 'Helvetica'];
        const tips = [
            'جرب استخدام التباين العالي بين الألوان لزيادة الوضوح',
            'الألوان المتناسقة تعزز التجربة البصرية للمستخدم',
            'استخدم المساحات البيضاء (White Space) لتحسين القراءة',
            'التباين بين الأحجام يساعد في إنشاء تسلسل هرمي بصري'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        return `🎨 اقتراح تصميمي: 
• لوحة ألوان: ${randomColor} مع الأبيض والأسود
• خطوط: ${randomFont} للعناوين و Arial للنصوص
• نصيحة: ${randomTip}
هل تريد المزيد من التفاصيل؟`;
    }

    generateCodeResponse() {
        const codeExamples = [
            `// تأثير ظهور عند التمرير
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
});`,
            `// توليد لون عشوائي
function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return \`hsl(\${hue}, 70%, 50%)\`;
}`,
            `// تحقق من صحة البريد الإلكتروني
function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}`
        ];
        
        const randomCode = codeExamples[Math.floor(Math.random() * codeExamples.length)];
        return `💻 اقتراح كود:\n\`\`\`javascript\n${randomCode}\n\`\`\``;
    }

    generateIdeaResponse() {
        const ideas = [
            'موقع تعليمي تفاعلي لتعليم البرمجة للمبتدئين',
            'تطبيق لإدارة المهام مع ميزات الذكاء الاصطناعي',
            'منصة لعرض أعمال المصممين مع نظام تقييم ذكي',
            'متجر إلكتروني متخصص في المنتجات التقنية',
            'لوحة تحكم لتحليل بيانات وسائل التواصل الاجتماعي'
        ];
        
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        return `💡 فكرة مشروع: ${randomIdea}\n\nيمكننا تطوير هذا المشروع باستخدام React للواجهة الأمامية وNode.js للخلفية مع قاعدة بيانات MongoDB.`;
    }

    generateGeneralResponse() {
        const responses = [
            'يمكنني مساعدتك في تصميم واجهات المستخدم وتطوير الويب وحلول الذكاء الاصطناعي.',
            'هل تحتاج مساعدة في مشروع معين؟ أخبرني بالمزيد لأقدم لك المساعدة المناسبة.',
            'كخبير في الذكاء الاصطناعي، يمكنني مساعدتك في تحليل البيانات وبناء النماذج الذكية.',
            'تخصص TARIQ في التصميم الجرافيكي يمكن أن يساعد في إنشاء هوية بصرية مميزة لمشروعك.'
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleQuickAction(action) {
        const actions = {
            design: 'أريد اقتراح تصميم لواجهة مستخدم حديثة',
            code: 'أحتاج كود JavaScript لتأثير ظهور عند التمرير',
            color: 'اقترح لي لوحة ألوان متناسقة لموقع تقني',
            idea: 'أعطني فكرة مشروع مبتكر يمكن تنفيذه'
        };
        
        const message = actions[action] || actions.design;
        document.getElementById('aiInput').value = message;
        this.sendMessage();
    }

    toggleVoiceInput() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'ar-SA';
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('aiInput').value = transcript;
            };
            
            recognition.start();
        } else {
            this.addMessage('ai', 'ميزة التعرف على الصوت غير مدعومة في متصفحك.');
        }
    }
}

// تهيئة مساعد الذكاء الاصطناعي
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ai-interactive')) {
        new AIChatAssistant();
    }
});