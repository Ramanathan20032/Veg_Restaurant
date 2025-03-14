// !--------------------------------------------------------------------------------
// sidebar icon disablity
const sidebarIcon = document.querySelector(
  ".banner-wrapper .navbar .hamburgerIcon-container"
);
const crossX = document.querySelector(
  ".side-nav .side-nav-container .sideNav-image-cross p i"
);
const sideNav = document.querySelector(".side-nav-container");

// Function to open the side navigation
sidebarIcon.addEventListener("click", () => {
  sideNav.style.display = "block";
  sideNav.style.position = "fixed";
  sideNav.style.top = "0";
  sideNav.style.right = "0";
  sideNav.style.height = "100vh";
  sideNav.style.zIndex = "2000";
});

sidebarIcon.addEventListener("click", () => {
  sideNav.classList.add("active");
});

// Function to close the side navigation
function closeSideNav() {
  sideNav.classList.remove("active");
}

// Close when clicking the cross icon
crossX.addEventListener("click", closeSideNav);

// Close when clicking outside of the sideNav
document.addEventListener("click", (event) => {
  if (!sideNav.contains(event.target) && !sidebarIcon.contains(event.target)) {
    closeSideNav();
  }
});

// Automatically close sideNav when screen size is above 768px
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeSideNav();
  }
});


// !--------------------------------------------------------------------------------
// changing the styles on scrolling - 30% from the top
document.addEventListener("DOMContentLoaded", function () {
  const scrollThreshold = window.innerHeight * 0.2;
  const navContainer = document.querySelector(".nav-container");
  const navbar = document.querySelector(".banner-wrapper .navbar");
  const links = document.querySelectorAll(
    ".banner-wrapper .navbar .nav-items .nav-item a"
  );
  const current_page = document.querySelector(".active-page");

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      navContainer.classList.add("sticky");
      navbar.style.padding = "10px 0";
      links.forEach((link) => {
        link.style.color = "#ffffff";
        link.style.fontWeight = "600";
      });
      current_page.style.color = "#85A947";
    } else {
      navContainer.classList.remove("sticky");
      navbar.style.padding = "16px 0";
      links.forEach((link) => {
        link.style.color = "#ffffff";
        link.style.fontWeight = "600";
      });
      current_page.style.color = "#85A947";
    }
  }

  // Add hover effect for both sticky and non-sticky states
  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      link.style.color = "#85A947";
    });

    link.addEventListener("mouseleave", function () {
      if (window.scrollY > scrollThreshold) {
        link.style.color = "#ffffff"; // Dark color when sticky
      } else {
        link.style.color = "#ffffff"; // White color when not sticky
      }
    });
  });

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);
});


// !--------------------------------------------------------------------------------
// Text Animation
document.addEventListener("DOMContentLoaded", function () {
  const bannerText = document.querySelector(".banner-container h1");
  const bannerPara = document.querySelector(".banner-container p");

  setTimeout(() => {
    bannerText.style.opacity = "1";
    bannerPara.style.opacity = "1";
  }, 500); // Delays animation for better effect
});


// !--------------------------------------------------------------------------------
// Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");
  const categoryButtons = document.querySelectorAll(".category-btn");

  let menuData = {};

  // Fetch JSON data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      menuData = data;
      loadMenu("all"); // Default: Show first 2 from each category
    });

  // Function to load menu items with smooth transition
  function loadMenu(category) {
    // Start fade-out effect
    menuContainer.style.opacity = "0";
    menuContainer.style.transform = "translateY(10px)";

    setTimeout(() => {
      menuContainer.innerHTML = ""; // Clear previous items

      let itemsToShow = [];

      if (category === "all") {
        // Show first 2 items from each category
        Object.values(menuData).forEach((items) => {
          itemsToShow.push(...items.slice(0, 2));
        });
      } else {
        // Show all items from the selected category
        itemsToShow = menuData[category];
      }

      // Generate and display menu cards
      itemsToShow.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add(
          "col-12",
          "col-sm-6",
          "col-md-6",
          "col-lg-3",
          "mb-3",
          "card-container"
        );

        menuItem.innerHTML = `
          <div class="card custom-card">
              <img src="${item.image}" class="card-img-top" alt="${item.name}">
              <div class="card-body text-center">
                  <h5 class="card-title m-0">${item.name}</h5>
              </div>
          </div>
        `;

        menuContainer.appendChild(menuItem);
      });

      // Apply fade-in effect after content is updated
      setTimeout(() => {
        menuContainer.style.opacity = "1";
        menuContainer.style.transform = "translateY(0)";
      }, 50);
    }, 300);
  }

  // Handle category button clicks with proper active state
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.add("btn-outline-warning");
        btn.classList.remove("btn-warning");
      });

      button.classList.add("active");
      button.classList.remove("btn-outline-warning");
      button.classList.add("btn-warning");

      const category = button.getAttribute("data-category");
      loadMenu(category);
    });
  });
});


// !--------------------------------------------------------------------------------
// Testimonial
document.addEventListener("DOMContentLoaded", function () {
  let myCarousel = document.querySelector("#testimonialCarousel");
  let carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000, // Auto-slide every 3 seconds
    ride: "carousel",
    pause: "hover",
    wrap: true,
  });
});


// !--------------------------------------------------------------------------------
// Page-Up
document.addEventListener("DOMContentLoaded", () => {
  const pageUp = document.querySelector(".page-up");

  if (!pageUp) {
    console.error("Error: .page-up element not found in the DOM");
    return;
  }

  window.addEventListener("scroll", () => {
  //   console.log("Current Scroll Position (window.scrollY):", window.scrollY); 
    if (window.scrollY >= 120) {  // Ensure visibility after 120px
      pageUp.classList.add("show");
      // console.log("page-up is now visible!"); 
    } else {
      pageUp.classList.remove("show");
      // console.log("page-up is hidden!"); 
    }
  });

  pageUp.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});  


// !--------------------------------------------------------------------------------
// About Us Animation
document.addEventListener("DOMContentLoaded", function () {
  const elementsToObserve = document.querySelectorAll(".zoom, .up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // To trigger only once
        }
      });
    },
    { threshold: 0.1 }
  );

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
});


// !--------------------------------------------------------------------------------
// Excellence Animation
document.addEventListener("DOMContentLoaded", function () {
  const elementsToObserve = document.querySelectorAll(".zoom1, .up1");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // To trigger only once
        }
      });
    },
    { threshold: 0.1 }
  );

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
});


// !--------------------------------------------------------------------------------
// Gallery In View

// Get all the images inside the gallery
const galleryImages = document.querySelectorAll(".gallery-container  img");

// Get the lightbox and lightbox image elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".lightbox .close");

// Add event listener to each image in the gallery
galleryImages.forEach((image) => {
  image.addEventListener("click", (e) => {
    // Set the clicked image source to the lightbox image
    lightboxImage.src = e.target.src;
    // Display the lightbox
    lightbox.style.display = "flex";
  });
});

// Close the lightbox when the close button is clicked
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close the lightbox if the user clicks anywhere outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});


// !--------------------------------------------------------------------------------
// Event
document.addEventListener("DOMContentLoaded", () => {
  const zoomElements = document.querySelectorAll(".event-wrapper .row .e-zoom");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // Stop observing after animation triggers
      }
    });
  });

  zoomElements.forEach((element) => {
    observer.observe(element);
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".p-right, .p-left");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.5 });

  elements.forEach((element) => {
    observer.observe(element);
  });
});