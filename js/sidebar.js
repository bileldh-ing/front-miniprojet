/**
 * Enhanced Sidebar Management System
 * This file handles the sidebar functionality for admin, department, and teacher sections
 * with improved animations and interactions
 */

// Sidebar Management
class SidebarManager {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.toggle = document.querySelector('.sidebar-toggle');
        this.navItems = document.querySelectorAll('.nav-item');
        this.isMobile = window.innerWidth <= 768;
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isCollapsed = false;

        // Initialize
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setActiveNavItem();
        this.setupGlassEffect();
        this.setupAnimations();
        this.setupDarkModeListener();
    }

    setupEventListeners() {
        // Toggle sidebar
        this.toggle.addEventListener('click', () => {
            this.isCollapsed = !this.isCollapsed;

            if (this.isMobile) {
                // On mobile, toggle between hidden and visible
                this.sidebar.classList.toggle('active');
                document.body.classList.toggle('sidebar-open');

                // Add animation class
                if (this.sidebar.classList.contains('active')) {
                    this.sidebar.classList.add('sidebar-animate-in');
                    this.sidebar.classList.remove('sidebar-animate-out');
                } else {
                    this.sidebar.classList.add('sidebar-animate-out');
                    this.sidebar.classList.remove('sidebar-animate-in');
                }
            } else {
                // On desktop, toggle between collapsed and expanded
                this.sidebar.classList.toggle('collapsed');

                // Toggle text visibility
                const navTexts = this.sidebar.querySelectorAll('.nav-item span');
                navTexts.forEach(text => {
                    text.style.display = this.isCollapsed ? 'none' : 'inline';
                });

                // Toggle header title visibility
                const headerTitle = this.sidebar.querySelector('.sidebar-header h2');
                if (headerTitle) {
                    headerTitle.style.display = this.isCollapsed ? 'none' : 'block';
                }

                // Toggle user info visibility
                const userInfo = this.sidebar.querySelector('.user-info');
                if (userInfo) {
                    userInfo.style.display = this.isCollapsed ? 'none' : 'block';
                }

                // Adjust main content margin
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.style.marginLeft = this.isCollapsed ? '80px' : '280px';
                }
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (this.isMobile &&
                !this.sidebar.contains(e.target) &&
                !this.toggle.contains(e.target) &&
                this.sidebar.classList.contains('active')) {
                this.sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
                this.sidebar.classList.add('sidebar-animate-out');
                this.sidebar.classList.remove('sidebar-animate-in');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;

            if (wasMobile !== this.isMobile) {
                // Reset sidebar state when switching between mobile and desktop
                if (this.isMobile) {
                    this.sidebar.classList.remove('collapsed');
                    this.sidebar.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                    this.sidebar.classList.remove('sidebar-animate-in', 'sidebar-animate-out');

                    // Reset text visibility
                    const navTexts = this.sidebar.querySelectorAll('.nav-item span');
                    navTexts.forEach(text => {
                        text.style.display = 'inline';
                    });

                    // Reset header title visibility
                    const headerTitle = this.sidebar.querySelector('.sidebar-header h2');
                    if (headerTitle) {
                        headerTitle.style.display = 'block';
                    }

                    // Reset user info visibility
                    const userInfo = this.sidebar.querySelector('.user-info');
                    if (userInfo) {
                        userInfo.style.display = 'block';
                    }
                } else {
                    this.sidebar.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                    this.sidebar.classList.remove('sidebar-animate-in', 'sidebar-animate-out');
                }
            }
        });

        // Add hover effect to nav items
        this.navItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'translateX(5px)';
                }
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'translateX(0)';
                }
            });

            // Add click animation
            item.addEventListener('click', (e) => {
                // Only add animation if it's not the current page
                if (!item.classList.contains('active')) {
                    const ripple = document.createElement('span');
                    ripple.classList.add('nav-ripple');

                    // Position the ripple at the click point
                    const rect = item.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;

                    item.appendChild(ripple);

                    // Remove ripple after animation
                    setTimeout(() => {
                        ripple.remove();
                    }, 1000);
                }
            });
        });

        // Add hover effect to user profile
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            userProfile.addEventListener('mouseenter', () => {
                userProfile.style.transform = 'translateY(-2px)';
            });

            userProfile.addEventListener('mouseleave', () => {
                userProfile.style.transform = 'translateY(0)';
            });
        }
    }

    setActiveNavItem() {
        // Get current path
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop();

        // Set active class on current page nav item
        this.navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === fileName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    setupGlassEffect() {
        // Add glass effect to sidebar
        this.sidebar.classList.add('glass');

        // Add glass shine effect
        const sidebarHeader = this.sidebar.querySelector('.sidebar-header');
        if (sidebarHeader) {
            sidebarHeader.classList.add('glass-shine');
        }

        // Add glass effect to toggle button
        this.toggle.classList.add('glass');
    }

    setupAnimations() {
        // Add entrance animation to sidebar
        this.sidebar.classList.add('fade-in');

        // Add entrance animation to nav items with delay
        this.navItems.forEach((item, index) => {
            item.classList.add('nav-item-animate');
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Add entrance animation to user profile
        const userProfile = this.sidebar.querySelector('.user-profile');
        if (userProfile) {
            userProfile.classList.add('slide-up');
            userProfile.style.animationDelay = '0.5s';
        }
    }

    setupDarkModeListener() {
        // Listen for dark mode changes
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addListener((e) => {
            this.isDarkMode = e.matches;
            this.updateTheme();
        });
    }

    updateTheme() {
        // Update theme based on dark mode preference
        if (this.isDarkMode) {
            this.sidebar.classList.add('dark-theme');
            this.sidebar.classList.remove('light-theme');
        } else {
            this.sidebar.classList.add('light-theme');
            this.sidebar.classList.remove('dark-theme');
        }
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sidebarManager = new SidebarManager();
}); 