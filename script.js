
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
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const backToStartButtons = document.querySelectorAll('.back-to-start');
    const continueButtons = document.querySelectorAll('.continue-btn');
    const progressBar = document.getElementById('progress');
    const currentStepElement = document.getElementById('current-step');
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextLocationId = this.getAttribute('data-next');
            const direction = this.getAttribute('data-direction');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showLocation(nextLocationId);
                updateProgress(nextLocationId);
                
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 200);
            
            console.log(`Пользователь выбрал направление: ${direction}`);
        });
    });
    
    backToStartButtons.forEach(button => {
        button.addEventListener('click', function() {
            showLocation('1');
            updateProgress('1');
            
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    });
    
    continueButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextLocationId = this.getAttribute('data-next');
            showLocation(nextLocationId);
            updateProgress(nextLocationId);
            
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    });
    
    function showLocation(locationId) {
        document.querySelectorAll('.location').forEach(location => {
            location.classList.remove('active');
        });
        
        const targetLocation = document.getElementById(`location-${locationId}`);
        if (targetLocation) {
            targetLocation.classList.add('active');
        }
    }
    
    function updateProgress(locationId) {
        let progress = 25;
        let step = 1;
        
        if (locationId === '1') {
            progress = 25;
            step = 1;
        } else if (locationId === '2' || locationId === '3' || locationId === '4') {
            progress = 100;
            step = 4;
        }
        
        progressBar.style.width = `${progress}%`;
        
        if (currentStepElement) {
            currentStepElement.textContent = step;
        }
    }
    
    updateProgress('1');
    
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
}