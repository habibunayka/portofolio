document.addEventListener("DOMContentLoaded", () => {
    let lastScrollTop = 0;
    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 

        header.classList.toggle("sticky", window.scrollY > 0);
    });
    
    document.getElementById('scrollArrow').addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };
    const optionsPhoto = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
    };

    const observers = {
        projectStrip: new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("project-strip-visible");
                    observers.projectStrip.unobserve(entry.target);
                }
            });
        }, options),
        aboutStrip: new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("about-strip-visible");
                    observers.aboutStrip.unobserve(entry.target);
                }
            });
        }, options),
        photo: new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("about-photo-visible");
                    observers.photo.unobserve(entry.target);
                }
            });
        }, optionsPhoto),
        card: new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("about-card-visible");
                    observers.card.unobserve(entry.target);
                }
            });
        }, options),
        desc: new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("about-desc-visible");
                    observers.desc.unobserve(entry.target);
                }
            });
        }, options),
        floating: new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("floating-visible");
                    observers.floating.unobserve(entry.target);
                }
            });
        }, options),
        aboutBody: new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll(".floating").forEach(el => observers.floating.observe(el));
                    document.querySelectorAll(".about-photo").forEach(el => observers.photo.observe(el));
                    document.querySelectorAll(".about-card").forEach(el => observers.card.observe(el));
                    document.querySelectorAll(".about-desc").forEach(el => observers.desc.observe(el));
                    observers.aboutBody.unobserve(entry.target);
                }
            });
        }, options)
    };

    const projectItems = document.querySelectorAll(".project-item");
    let delay = 0;

    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, delay);
                delay += 200;
                projectObserver.unobserve(entry.target);
            }
        });
    }, options);

    projectItems.forEach(item => projectObserver.observe(item));

    document.querySelectorAll(".project-strip").forEach(el => observers.projectStrip.observe(el));
    document.querySelectorAll(".about-strip").forEach(el => observers.aboutStrip.observe(el));
    document.querySelectorAll(".about-body").forEach(el => observers.aboutBody.observe(el));

    const modal = document.getElementById("project-modal");
    const iframe = document.getElementById("project-iframe");
    const closeBtn = document.querySelector(".close-btn");

    projectItems.forEach(item => {
        item.addEventListener("click", () => {
            const url = item.getAttribute("data-url");
            iframe.src = url;
            modal.style.display = "block";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        iframe.src = "";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            iframe.src = "";
        }
    });
});
