// ===== 載入畫面控制 =====
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // 如果有載入畫面，就等2秒後顯示；如果沒有載入畫面，直接顯示內容
    if (loadingScreen) {
        // 有載入畫面的頁面（index.html）
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            if (mainContent) {
                mainContent.classList.add('visible');
            }
        }, 2000);
    } else {
        // 沒有載入畫面的頁面（boosters.html, pricing.html）
        if (mainContent) {
            mainContent.classList.add('visible');
        }
    }
});

// ===== 導航欄滾動效果 =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== 手機版選單切換 =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        const navButtons = document.querySelector('.nav-buttons');
        
        if (navMenu) {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        }
        if (navButtons) {
            navButtons.style.display = navButtons.style.display === 'flex' ? 'none' : 'flex';
        }
        
        this.classList.toggle('active');
    });
}

// ===== 平滑滾動 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FAQ 展開/收合 =====
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // 關閉所有其他的 FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 如果點擊的項目原本不是展開的，就展開它
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===== 影片自動播放控制 =====
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    // 確保影片循環播放
    heroVideo.loop = true;
    
    // 當影片載入完成後開始播放
    heroVideo.addEventListener('loadeddata', function() {
        heroVideo.play().catch(function(error) {
            console.log('自動播放被阻擋:', error);
        });
    });
    
    // 當影片結束時重新播放（備用方案）
    heroVideo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
}

// ===== 滾動動畫效果 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 為所有卡片元素添加滾動動畫
document.querySelectorAll('.feature-card, .event-card, .booster-card, .pricing-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== 按鈕點擊效果 =====
document.querySelectorAll('.nav-btn, .hero-btn, .event-btn, .booster-btn, .pricing-btn, .table-btn, .service-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // 創建漣漪效果
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== 按鈕漣漪效果樣式（動態添加） =====
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== 頁面載入時的導航連結狀態 =====
window.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ===== 滾動到頂部按鈕 =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: var(--dark-bg);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(112, 204, 225, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 8px 30px rgba(112, 204, 225, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 5px 20px rgba(112, 204, 225, 0.3)';
});

// ===== 數字動畫效果 =====
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 當統計數字進入視窗時觸發動畫
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateNumber(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(stat => {
    const value = stat.textContent.replace(/\D/g, '');
    if (value) {
        stat.setAttribute('data-target', value);
        stat.textContent = '0';
        statsObserver.observe(stat);
    }
});

// ===== 預加載圖片 =====
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

preloadImages();

// ===== 表單驗證（如果有表單） =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            alert('表單提交成功！我們會盡快與您聯繫。');
            this.reset();
        } else {
            alert('請填寫所有必填欄位');
        }
    });
});

// ===== 控制台訊息 =====
console.log('%c迴響電競', 'color: rgb(112, 204, 225); font-size: 24px; font-weight: bold;');
console.log('%c專業電競陪玩工作室', 'color: #b0b8c8; font-size: 14px;');
console.log('%c網站已完全載入', 'color: rgb(112, 204, 225); font-size: 12px;');