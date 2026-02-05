// Toggle Mobile Menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Loading Animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const menu = document.querySelector(".menu-links");
            const icon = document.querySelector(".hamburger-icon");
            if (menu.classList.contains("open")) {
                menu.classList.remove("open");
                icon.classList.remove("open");
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form Submission (Basic)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-dot');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            skillLevel.style.opacity = '1';
            skillLevel.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => observer.observe(bar));

// Project cards animation on scroll
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    projectObserver.observe(card);
});
// Certificate functions
function openCertificate(pdfUrl) {
    // Open PDF in new tab
    window.open(pdfUrl, '_blank');
    
    // You can also implement a modal preview if you have PDF.js or similar
    // For now, we'll just open in new tab
}

function downloadCertificate(pdfUrl, fileName) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download success message
    showToast('Certificate download started!', 'success');
}

function viewAlisonCertificate() {
    // Since Alison certificate might be online-only, open LinkedIn or Alison profile
    const confirmation = confirm('This certificate is available on Alison/LinkedIn. Would you like to view my LinkedIn profile?');
    if (confirmation) {
        window.open('https://www.linkedin.com/in/sasikaru/', '_blank');
    }
}

function viewAchievement(title, issuer, date) {
    // Create and show achievement modal
    const modal = document.createElement('div');
    modal.className = 'certificate-modal active';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="certificate-image-container">
                        <i class="fas fa-award"></i>
                        <h4>Achievement Certificate</h4>
                    </div>
                    <div class="certificate-info">
                        <h4>Details</h4>
                        <p><strong>Title:</strong> ${title}</p>
                        <p><strong>Issued by:</strong> ${issuer}</p>
                        <p><strong>Date:</strong> ${date}</p>
                        <p><strong>Description:</strong> Academic excellence recognition for maintaining outstanding GPA of 3.9/4.0</p>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-color-2" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                        <button class="btn btn-color-1" onclick="requestCertificateCopy()">
                            <i class="fas fa-envelope"></i> Request Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.certificate-modal');
    if (modal) {
        modal.remove();
    }
}

function requestCertificateCopy() {
    const email = 'sasikaru15@gmail.com';
    const subject = 'Request: Certificate Copy';
    const body = `Hello Sasanka,\n\nI would like to request a copy of your certificate. Please share it with me.\n\nThank you!`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeModal();
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--primary-dark);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                box-shadow: var(--shadow-medium);
            }
            .toast-success {
                background: #28a745;
            }
            .toast i {
                font-size: 1.2rem;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Dean's List Images Data
const deanListImages = [
    {
        id: 1,
        year: "2023",
        title: "Dean's List Award 2023",
        description: "Academic Year 1- Semester 1 ",
        imageUrl: "./assets/certificates/11.jpg",
        alt: "Dean's List Award Certificate 2023"
    },
    {
        id: 2,
        year: "2024",
        title: "Dean's List Award 2024",
        description: "Academic Year 1- Semester 2",
        imageUrl: "./assets/certificates/12.jpg",
        alt: "Dean's List Award Certificate 2024"
    },
    {
        id: 3,
        year: "2024",
        title: "Dean's List Award 2024",
        description: "Academic Year 2- Semester 1",
        imageUrl: "./assets/certificates/21.jpeg",
        alt: "Dean's List Recognition Letter"
    },
    {
        id: 4,
        year: "2024",
        title: "Dean's List Award 2025",
        description: "Academic Year 2- Semester 2",
        imageUrl: "./assets/certificates/22.jpeg",
        alt: "Academic Excellence Award"
    }
];

let currentImageIndex = 0;

function showDeanListImages() {
    // Create gallery modal
    const galleryModal = document.createElement('div');
    galleryModal.className = 'image-gallery-modal active';
    galleryModal.innerHTML = `
        <div class="gallery-overlay">
            <div class="gallery-header">
                <h3><i class="fas fa-trophy"></i> Dean's List Awards Gallery</h3>
                <button class="gallery-close" onclick="closeGallery()">&times;</button>
            </div>
            
            <div class="gallery-body">
                <div class="main-image-container zoom-enabled" onclick="toggleZoom()">
                    <div class="image-loading">
                        <div class="spinner"></div>
                        <p>Loading image...</p>
                    </div>
                    <div class="image-caption">${deanListImages[0].title} - ${deanListImages[0].description}</div>
                </div>
                
                <div class="thumbnails-container">
                    ${deanListImages.map((image, index) => `
                        <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                             onclick="changeImage(${index})">
                            <div class="thumbnail-year">${image.year}</div>
                            <img src="${image.imageUrl}" 
                                 alt="${image.alt}"
                                 loading="lazy"
                                 onload="this.closest('.thumbnail').style.backgroundImage = 'none'"
                                 onerror="this.onerror=null; this.src='./assets/certificates/placeholder.jpg';">
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="gallery-controls">
                <div class="gallery-nav">
                    <button class="gallery-nav-btn" onclick="prevImage()" id="prevBtn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="gallery-nav-btn" onclick="nextImage()" id="nextBtn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div class="image-counter" id="imageCounter">
                    1 / ${deanListImages.length}
                </div>
                
                <div class="gallery-actions">
                    <button class="btn btn-color-2" onclick="downloadCurrentImage()">
                        <i class="fas fa-download"></i> Download Current
                    </button>
                    <button class="btn btn-color-1" onclick="downloadAllDeanListImages()">
                        <i class="fas fa-images"></i> Download All
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(galleryModal);
    
    // Load first image
    loadImage(0);
    
    // Disable/enable navigation buttons
    updateNavigationButtons();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleGalleryKeydown);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function loadImage(index) {
    const image = deanListImages[index];
    const mainImageContainer = document.querySelector('.main-image-container');
    const loadingDiv = mainImageContainer.querySelector('.image-loading');
    const imageCaption = mainImageContainer.querySelector('.image-caption');
    
    // Create image element
    const img = new Image();
    img.src = image.imageUrl;
    img.alt = image.alt;
    img.className = 'main-image';
    img.onload = function() {
        // Remove loading div
        if (loadingDiv) {
            loadingDiv.remove();
        }
        
        // Remove existing main image
        const existingImg = mainImageContainer.querySelector('.main-image');
        if (existingImg) {
            existingImg.remove();
        }
        
        // Add new image
        mainImageContainer.prepend(img);
        
        // Update caption
        imageCaption.textContent = `${image.title} - ${image.description}`;
        
        // Update counter
        document.getElementById('imageCounter').textContent = `${index + 1} / ${deanListImages.length}`;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    };
    
    img.onerror = function() {
        if (loadingDiv) {
            loadingDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Failed to load image</p>
                <button class="btn btn-color-1" onclick="retryLoadImage(${index})" style="margin-top: 1rem;">
                    Retry
                </button>
            `;
        }
    };
}

function retryLoadImage(index) {
    loadImage(index);
}

function changeImage(index) {
    currentImageIndex = index;
    loadImage(index);
    updateNavigationButtons();
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        loadImage(currentImageIndex);
        updateNavigationButtons();
    }
}

function nextImage() {
    if (currentImageIndex < deanListImages.length - 1) {
        currentImageIndex++;
        loadImage(currentImageIndex);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentImageIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentImageIndex === deanListImages.length - 1;
    }
}

function handleGalleryKeydown(e) {
    if (document.querySelector('.image-gallery-modal.active')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextImage();
                break;
            case 'Escape':
                e.preventDefault();
                closeGallery();
                break;
            case ' ':
                e.preventDefault();
                toggleZoom();
                break;
        }
    }
}

function toggleZoom() {
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.classList.toggle('zoomed');
        
        const container = document.querySelector('.main-image-container');
        if (mainImage.classList.contains('zoomed')) {
            container.style.cursor = 'zoom-out';
        } else {
            container.style.cursor = 'zoom-in';
        }
    }
}

function downloadCurrentImage() {
    const currentImage = deanListImages[currentImageIndex];
    downloadImage(currentImage.imageUrl, `Deans-List-${currentImage.year}.jpg`);
}

function downloadAllDeanListImages() {
    // Create a ZIP file with all images
    if (typeof JSZip === 'undefined') {
        // Fallback: Download images one by one
        alert('Starting download of all images...');
        deanListImages.forEach((image, index) => {
            setTimeout(() => {
                downloadImage(image.imageUrl, `Deans-List-${image.year}-${index + 1}.jpg`);
            }, index * 500);
        });
        showToast('Download started for all images!', 'success');
    } else {
        // Using JSZip library (you need to include it)
        createImageZip();
    }
}

function downloadImage(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading: ${filename}`, 'success');
}

function createImageZip() {
    const zip = new JSZip();
    const promises = deanListImages.map((image, index) => {
        return fetch(image.imageUrl)
            .then(response => response.blob())
            .then(blob => {
                zip.file(`Deans-List-${image.year}-${index + 1}.jpg`, blob);
            });
    });
    
    Promise.all(promises).then(() => {
        zip.generateAsync({type: "blob"}).then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = "Deans-List-Awards.zip";
            link.click();
            showToast('ZIP file downloaded successfully!', 'success');
        });
    }).catch(error => {
        console.error('Error creating ZIP:', error);
        showToast('Failed to create ZIP file', 'error');
    });
}

function downloadDeanListImages() {
    // This is the simpler version that downloads all images at once
    deanListImages.forEach((image, index) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = image.imageUrl;
            link.download = `Deans-List-${image.year}-${index + 1}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, index * 300);
    });
    
    showToast('Starting download of all Dean\'s List images...', 'success');
}

function closeGallery() {
    const galleryModal = document.querySelector('.image-gallery-modal');
    if (galleryModal) {
        galleryModal.remove();
    }
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleGalleryKeydown);
    
    // Restore body scroll
    document.body.style.overflow = '';
}