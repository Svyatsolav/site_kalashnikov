
function initMainPage() {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.querySelector('.modal-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');
            
            if (img && caption) {
                modalImage.src = img.src;
                modalTitle.textContent = caption.querySelector('h4').textContent;
                modalDesc.textContent = caption.querySelector('p').textContent;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentGalleryIndex = 0;
    const galleryItemsArray = Array.from(galleryItems);
    
    function updateGallery() {
        
        galleryItemsArray.forEach(item => {
            item.style.display = 'none';
        });
        
        
        if (galleryItemsArray[currentGalleryIndex]) {
            galleryItemsArray[currentGalleryIndex].style.display = 'block';
        }
        
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentGalleryIndex);
        });
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryItemsArray.length) % galleryItemsArray.length;
            updateGallery();
        });
        
        nextBtn.addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryItemsArray.length;
            updateGallery();
        });
    }
    
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentGalleryIndex = index;
            updateGallery();
        });
    });
    
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            
            console.log('Форма отправлена:', { name, email, message });
            
            
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            
            
            contactForm.reset();
        });
    }
    
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
    
    
    const routeSelectButtons = document.querySelectorAll('.route-select-btn');
    routeSelectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const route = this.getAttribute('data-route');
            
            localStorage.setItem('selectedRoute', route);
        });
    });
    
    
    const startButtons = document.querySelectorAll('a[href="journey.html"]');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const route = button.getAttribute('data-route') || localStorage.getItem('selectedRoute');
            if (route) {
                localStorage.setItem('selectedRoute', route);
            }
        });
    });
}


if (!document.querySelector('.journey-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        initMainPage();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('.info-section').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
    
    
    if (document.querySelector('.journey-page')) {
        initJourneyPage();
    }
});


function initJourneyPage() {
    
    const state = {
        currentRoute: null, 
        currentLocationIndex: 0, 
        routeNames: {
            'left': 'Правительство → Музей → Сквер Победы',
            'forward': 'Музей Калашникова → Собор → Мотомузей',
            'right': 'Ижик → Монумент → Смотровая площадка'
        },
        routeLocations: {
            'left': ['left-1', 'left-2', 'left-3'],
            'forward': ['forward-1', 'forward-2', 'forward-3'],
            'right': ['right-1', 'right-2', 'right-3']
        }
    };
    
    
    const routeInfo = document.getElementById('route-info');
    const currentRouteElement = routeInfo ? routeInfo.querySelector('.current-route') : null;
    const currentLocationElement = document.getElementById('current-location');
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const moveForwardButtons = document.querySelectorAll('.move-forward');
    const changeRouteButtons = document.querySelectorAll('.change-route');
    const restartButtons = document.querySelectorAll('.restart-journey');
    
    
    updateUI();
    
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const route = this.getAttribute('data-route');
            state.currentRoute = route;
            state.currentLocationIndex = 0; 
            
            
            const firstLocationId = state.routeLocations[route][0];
            
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showLocation(firstLocationId);
                updateUI();
                
                
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 200);
            
            
            console.log(`Пользователь выбрал маршрут: ${route}`);
        });
    });
    
    
    moveForwardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextLocation = this.getAttribute('data-next');
            
            
            const route = nextLocation.split('-')[0];
            const locationNum = parseInt(nextLocation.split('-')[1]);
            
            state.currentRoute = route;
            state.currentLocationIndex = locationNum - 1; 
            
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showLocation(nextLocation);
                updateUI();
                
                
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 200);
        });
    });
    
    
    changeRouteButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                
                
                state.currentRoute = null;
                state.currentLocationIndex = 0;
                
                showLocation('start');
                updateUI();
                
                
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 200);
        });
    });
    
    
    restartButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                
                
                state.currentRoute = null;
                state.currentLocationIndex = 0;
                
                showLocation('start');
                updateUI();
                
                
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 200);
        });
    });
    
    
    function showLocation(locationId) {
        
        document.querySelectorAll('.location').forEach(location => {
            location.classList.remove('active');
        });
        
        
        const targetLocation = document.getElementById(`location-${locationId}`);
        if (targetLocation) {
            
            setTimeout(() => {
                targetLocation.classList.add('active');
            }, 50);
        } else {
            console.error(`Локация с ID location-${locationId} не найдена`);
        }
    }
    
    
    function updateUI() {
        
        if (currentRouteElement) {
            if (state.currentRoute) {
                currentRouteElement.textContent = state.routeNames[state.currentRoute];
                currentRouteElement.style.color = '#3498db';
                currentRouteElement.style.fontWeight = 'bold';
            } else {
                currentRouteElement.textContent = 'Маршрут не выбран';
                currentRouteElement.style.color = '#7f8c8d';
                currentRouteElement.style.fontWeight = 'normal';
            }
        }
        
        
        if (currentLocationElement) {
            if (state.currentRoute) {
                
                currentLocationElement.textContent = state.currentLocationIndex + 1;
            } else {
                
                currentLocationElement.textContent = '1';
            }
        }
    }
    
    
    const locationImages = document.querySelectorAll('.location-image img');
    locationImages.forEach(img => {
        img.addEventListener('click', function() {
            
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            modal.style.cursor = 'pointer';
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.objectFit = 'contain';
            modalImg.style.borderRadius = '5px';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
    
    
    const startLocation = document.getElementById('location-start');
    if (startLocation) {
        startLocation.style.opacity = '1';
        startLocation.style.transform = 'translateY(0)';
    }
}