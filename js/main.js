AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 120,
});

document.addEventListener("DOMContentLoaded", function () {
  const MIN_FONT_SIZE = 80;
  const MAX_FONT_SIZE = 130;
  const FONT_STEP = 10;

  let currentFontSize = parseInt(localStorage.getItem("fontLevel")) || 100;

  if (currentFontSize < MIN_FONT_SIZE) currentFontSize = MIN_FONT_SIZE;
  if (currentFontSize > MAX_FONT_SIZE) currentFontSize = MAX_FONT_SIZE;

  const increaseBtn = document.getElementById("increaseFont");
  const decreaseBtn = document.getElementById("decreaseFont");
  const html = document.documentElement;

  let styleElement = document.getElementById("dynamic-font-scale");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "dynamic-font-scale";
    document.head.appendChild(styleElement);
  }

  function applyFontSize() {
    currentFontSize = Math.max(
      MIN_FONT_SIZE,
      Math.min(MAX_FONT_SIZE, currentFontSize)
    );

    const scaleFactor = currentFontSize / 100;
    html.style.setProperty("--font-scale", scaleFactor);

    if (currentFontSize === 100) {
      styleElement.textContent = "";
      document.body.style.removeProperty("zoom");
      localStorage.removeItem("fontLevel");
    } else {
      styleElement.textContent = `body { zoom: ${scaleFactor}; }`;
      localStorage.setItem("fontLevel", currentFontSize);
    }

    updateButtons();
  }

  document.body.style.removeProperty("zoom");

  if (currentFontSize !== 100) {
    applyFontSize();
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentFontSize < MAX_FONT_SIZE) {
        currentFontSize += FONT_STEP;
        applyFontSize();
      }
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentFontSize > MIN_FONT_SIZE) {
        currentFontSize -= FONT_STEP;
        applyFontSize();
      }
    });
  }

  function updateButtons() {
    if (increaseBtn) {
      const isMaxed = currentFontSize >= MAX_FONT_SIZE;
      increaseBtn.style.opacity = isMaxed ? "0.5" : "1";
      increaseBtn.style.cursor = isMaxed ? "not-allowed" : "pointer";
      increaseBtn.disabled = isMaxed;
    }
    if (decreaseBtn) {
      const isMinned = currentFontSize <= MIN_FONT_SIZE;
      decreaseBtn.style.opacity = isMinned ? "0.5" : "1";
      decreaseBtn.style.cursor = isMinned ? "not-allowed" : "pointer";
      decreaseBtn.disabled = isMinned;
    }
  }

  updateButtons();
});

const isInvestirPage = window.location.pathname.includes("investir.html");
const header = document.querySelector("header");

if (isInvestirPage) {
  if (header) {
    header.classList.add("at-top");
  }
} else {
  let lastScrollTop = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll === 0) {
      header.classList.remove("hide-header", "show-header");
      header.classList.add("at-top");
    } else {
      header.classList.remove("at-top");

      if (currentScroll > lastScrollTop) {
        header.classList.remove("show-header");
        header.classList.add("hide-header");
      } else {
        header.classList.remove("hide-header");
        header.classList.add("show-header");
      }
    }

    lastScrollTop = currentScroll;
  }

  window.addEventListener("scroll", handleScroll);
}

document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.querySelector(".language-toggle");
  const languageMenu = document.querySelector(".language-menu");

  if (languageToggle && languageMenu) {
    languageToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      languageToggle.classList.toggle("active");
      languageMenu.classList.toggle("show");
    });

    document.addEventListener("click", function () {
      languageToggle.classList.remove("active");
      languageMenu.classList.remove("show");
    });

    const languageLinks = document.querySelectorAll(".language-menu a");
    languageLinks.forEach((link) => {
      link.addEventListener("click", function () {
        languageToggle.classList.remove("active");
        languageMenu.classList.remove("show");
      });
    });
  }

  const toggleMode = document.querySelector(".toggle-mode");
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }

  if (toggleMode) {
    toggleMode.addEventListener("click", function (e) {
      e.preventDefault();
      const isCurrentlyDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", isCurrentlyDark);
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  }
});

$(document).ready(function () {
  const searchButton = $(".search-bar a");
  const searchBox = $("#searchBox");
  const closeSearchBox = $(".close-search-box");

  searchButton.on("click", function (e) {
    e.preventDefault();
    searchBox.toggleClass("active");
    $("body").toggleClass("open-menu", searchBox.hasClass("active"));
    if (searchBox.hasClass("active")) {
      searchBox.find("input").focus();
    }
  });

  closeSearchBox.on("click", function () {
    searchBox.removeClass("active");
    $("body").removeClass("open-menu");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#searchBox, .search-bar").length) {
      searchBox.removeClass("active");
      $("body").removeClass("open-menu");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButton = document.querySelector("[data-filter-toggle]");
  const filterOptions = document.querySelector("[data-filter-options]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const filterSelects = document.querySelectorAll(".filter-select select");

  if (!filterButton || !filterOptions) return;

  let isFilterOpen = false;

  function toggleFilters() {
    isFilterOpen = !isFilterOpen;

    if (isFilterOpen) {
      filterButton.classList.add("active");
      filterOptions.classList.add("show");

      filterItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-in");
        }, 100 + index * 100);
      });
    } else {
      filterButton.classList.remove("active");

      filterItems.forEach((item) => {
        item.classList.remove("animate-in");
      });

      setTimeout(() => {
        filterOptions.classList.remove("show");
      }, 200);
    }
  }

  filterButton.addEventListener("click", function (e) {
    e.preventDefault();
    toggleFilters();
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".filter-controls") && isFilterOpen) {
      toggleFilters();
    }
  });

  function filterContent(filters) {
    const contentItems = document.querySelectorAll(
      ".content-item, .document-item"
    );

    contentItems.forEach((item) => {
      let shouldShow = true;

      if (filters.ano) {
        const itemYear =
          item.getAttribute("data-year") ||
          item.querySelector("[data-year]")?.getAttribute("data-year");
        if (itemYear && itemYear !== filters.ano) {
          shouldShow = false;
        }
      }

      if (filters.tipo) {
        const itemType =
          item.getAttribute("data-type") ||
          item.querySelector("[data-type]")?.getAttribute("data-type");
        if (itemType && itemType !== filters.tipo) {
          shouldShow = false;
        }
      }

      if (filters.data) {
        // Implementação futura para filtro de data
      }

      if (shouldShow) {
        item.style.display = "";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(-10px)";
        setTimeout(() => {
          if (item.style.opacity === "0") {
            item.style.display = "none";
          }
        }, 300);
      }
    });
  }

  function applyFilters() {
    const filters = {};
    filterSelects.forEach((select) => {
      if (select.value) {
        filters[select.name] = select.value;
      }
    });
    filterContent(filters);
  }

  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      if (this.value) {
        this.style.color = "#3b3b3b";
        this.style.fontWeight = "500";
      } else {
        this.style.color = "#6e6e6e";
        this.style.fontWeight = "400";
      }

      applyFilters();
    });

    select.addEventListener("focus", function () {
      const svg = this.parentElement.querySelector("svg");
      if (svg) {
        svg.style.color = "#ea7425";
      }
    });

    select.addEventListener("blur", function () {
      const svg = this.parentElement.querySelector("svg");
      if (svg) {
        svg.style.color = "#6e6e6e";
      }
    });
  });

  function clearAllFilters() {
    filterSelects.forEach((select) => {
      select.value = "";
      select.style.color = "#6e6e6e";
      select.style.fontWeight = "400";
    });

    const contentItems = document.querySelectorAll(
      ".content-item, .document-item"
    );
    contentItems.forEach((item) => {
      item.style.display = "";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });

    if (isFilterOpen) {
      toggleFilters();
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (isFilterOpen) {
        toggleFilters();
      } else {
        clearAllFilters();
      }
    }
  });

  function initializeFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let hasFilters = false;

    filterSelects.forEach((select) => {
      const paramValue = urlParams.get(select.name);
      if (paramValue) {
        select.value = paramValue;
        select.style.color = "#3b3b3b";
        select.style.fontWeight = "500";
        hasFilters = true;
      }
    });

    if (hasFilters && !isFilterOpen) {
      setTimeout(() => {
        toggleFilters();
      }, 500);
    }

    if (urlParams.toString()) {
      applyFilters();
    }
  }

  initializeFiltersFromURL();

  function updateFilterButton() {
    if (!filterButton) return;

    const activeFilters = Array.from(filterSelects).filter(
      (select) => select.value
    );

    if (activeFilters.length > 0) {
      filterButton.classList.add("has-active-filters");
      filterButton.style.position = "relative";
    } else {
      filterButton.classList.remove("has-active-filters");
      const badge = filterButton.querySelector(".filter-badge");
      if (badge) {
        badge.remove();
      }
    }
  }

  filterSelects.forEach((select) => {
    select.addEventListener("change", updateFilterButton);
  });

  updateFilterButton();
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navigation = document.querySelector(".navigation");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const body = document.body;

  function isMobileMode() {
    return window.innerWidth <= 1200;
  }

  function toggleMobileMenu() {
    const isActive = mobileMenuToggle.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileMenuToggle.classList.add("active");
    navigation.classList.add("mobile-active");
    body.style.overflow = "hidden";

    const logoImg = document.querySelector(".logo img");
    if (logoImg) {
      logoImg.style.filter = "grayscale(1) brightness(14)";
    }
  }

  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    navigation.classList.remove("mobile-active");
    body.style.overflow = "";

    const logoImg = document.querySelector(".logo img");
    if (logoImg) {
      logoImg.style.filter = "";
    }

    if (isMobileMode()) {
      dropdownToggles.forEach((toggle) => {
        const dropdownMenu = toggle.nextElementSibling;
        toggle.setAttribute("aria-expanded", "false");
        if (dropdownMenu) {
          dropdownMenu.classList.remove("mobile-show");
        }
      });
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (navigation) {
    navigation.addEventListener("click", function (e) {
      if (isMobileMode() && e.target === navigation) {
        closeMobileMenu();
      }
    });
  }

  // Accordion functionality for dropdowns in mobile mode
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (isMobileMode()) {
        e.preventDefault();
        e.stopPropagation();

        const dropdownMenu = this.nextElementSibling;
        const isExpanded = this.getAttribute("aria-expanded") === "true";

        // Close all other dropdowns (accordion behavior)
        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== this) {
            const otherMenu = otherToggle.nextElementSibling;
            otherToggle.setAttribute("aria-expanded", "false");
            if (otherMenu) {
              otherMenu.classList.remove("mobile-show");
            }
          }
        });

        // Toggle current dropdown
        if (isExpanded) {
          this.setAttribute("aria-expanded", "false");
          dropdownMenu.classList.remove("mobile-show");
        } else {
          this.setAttribute("aria-expanded", "true");
          dropdownMenu.classList.add("mobile-show");
        }
      }
    });
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (isMobileMode()) {
        setTimeout(() => {
          closeMobileMenu();
        }, 100);
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navigation.classList.contains("mobile-active")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200) {
      closeMobileMenu();
      // Reset all accordion states when switching to desktop
      dropdownToggles.forEach((toggle) => {
        const dropdownMenu = toggle.nextElementSibling;
        toggle.setAttribute("aria-expanded", "false");
        if (dropdownMenu) {
          dropdownMenu.classList.remove("mobile-show");
        }
      });
    }
  });

  // Improved touch handling for mobile menu scrolling
  let touchStartY = 0;

  if (navigation) {
    navigation.addEventListener("touchstart", function (e) {
      if (isMobileMode() && navigation.classList.contains("mobile-active")) {
        touchStartY = e.touches[0].clientY;
      }
    });

    navigation.addEventListener("touchmove", function (e) {
      if (isMobileMode() && navigation.classList.contains("mobile-active")) {
        const touchY = e.touches[0].clientY;
        const touchDelta = touchY - touchStartY;

        const targetScrollable = e.target.closest(".dropdown-menu.mobile-show");
        const scrollContainer = targetScrollable || this;

        const atTop = scrollContainer.scrollTop === 0;
        const atBottom =
          scrollContainer.scrollTop >=
          scrollContainer.scrollHeight - scrollContainer.clientHeight;

        if ((atTop && touchDelta > 0) || (atBottom && touchDelta < 0)) {
          e.preventDefault();
        }
      }
    });
  }
});

function initTextCarousel() {
  const SLIDE_INTERVAL = 3000;
  const SLIDE_DURATION = 800;

  const titleSlide = document.querySelector(".title-slide");
  if (!titleSlide) return;

  const wrapper = titleSlide.querySelector(".title-slide-wrapper");
  const texts = titleSlide.querySelectorAll("h1");
  if (!wrapper || texts.length === 0) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let currentIndex = 0;
  let intervalId = null;
  let isPaused = false;
  let isTransitioning = false;

  const slideHeight = texts[0].offsetHeight;
  const firstSlideClone = texts[0].cloneNode(true);
  wrapper.appendChild(firstSlideClone);

  function showNextSlide() {
    if (isPaused || isTransitioning) return;

    isTransitioning = true;
    currentIndex++;

    const offset = -currentIndex * slideHeight;
    wrapper.style.transform = `translate3d(0, ${offset}px, 0)`;

    if (currentIndex === texts.length) {
      setTimeout(() => {
        wrapper.style.transition = "none";
        currentIndex = 0;
        wrapper.style.transform = `translate3d(0, 0, 0)`;

        setTimeout(() => {
          wrapper.style.transition = "";
          isTransitioning = false;
        }, 50);
      }, SLIDE_DURATION);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, SLIDE_DURATION);
    }
  }

  function startCarousel() {
    if (intervalId) return;
    intervalId = setInterval(
      showNextSlide,
      prefersReducedMotion ? SLIDE_DURATION : SLIDE_INTERVAL
    );
  }

  function stopCarousel() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function pauseCarousel() {
    isPaused = true;
  }

  function resumeCarousel() {
    isPaused = false;
  }

  titleSlide.addEventListener("mouseenter", pauseCarousel);
  titleSlide.addEventListener("mouseleave", resumeCarousel);
  titleSlide.addEventListener("focusin", pauseCarousel);
  titleSlide.addEventListener("focusout", resumeCarousel);

  texts.forEach((text) => {
    text.setAttribute("tabindex", "0");
  });

  startCarousel();

  window.addEventListener("beforeunload", stopCarousel);
}

document.addEventListener("DOMContentLoaded", initTextCarousel);

function animateCounter(element) {
  const target = element.getAttribute("data-target");
  if (!target) return;

  const prefix = target.includes("+") ? "+" : "";
  const numericValue = parseInt(target.replace(/\D/g, ""));
  const duration = 2000;
  const increment = numericValue / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < numericValue) {
      element.textContent = prefix + Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    const originalValue = counter.textContent;
    counter.setAttribute("data-target", originalValue);
    counter.textContent = counter.textContent.includes("+") ? "+0" : "0";
    observer.observe(counter);
  });
}

document.addEventListener("DOMContentLoaded", initCounters);

document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.querySelector(".back-to-top");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Initialize Bootstrap tooltips
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: "hover",
      boundary: "window",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const tabHeaders = document.querySelectorAll(".table-header");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      tabHeaders.forEach((header) => header.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(targetTab).classList.add("active");

      const targetHeader = document.querySelector(
        `.table-header[data-header="${targetTab}"]`
      );
      if (targetHeader) {
        targetHeader.classList.add("active");
      }
    });
  });

  const stickyHeader = document.querySelector(".table-sticky-header");
  if (stickyHeader) {
    const parentSection = stickyHeader.closest(".all-nossos-fundos");
    let headerOffset = null;

    function handleScroll() {
      if (!headerOffset) {
        headerOffset = parentSection.offsetTop;
      }

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > headerOffset) {
        stickyHeader.classList.add("is-sticky");
      } else {
        stickyHeader.classList.remove("is-sticky");
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fundosNavItems = document.querySelectorAll(".fundos-nav-item");
  const fundosContentItems = document.querySelectorAll(".fundos-content-item");
  const fundosSidebar = document.querySelector(".fundos-sidebar");

  if (!fundosNavItems.length || !fundosContentItems.length) return;

  function switchTab(targetFund) {
    fundosNavItems.forEach((item) => item.classList.remove("active"));
    fundosContentItems.forEach((content) => content.classList.remove("active"));

    const activeNavItem = document.querySelector(
      `.fundos-nav-item[data-fund="${targetFund}"]`
    );
    const activeContentItem = document.getElementById(targetFund);

    if (activeNavItem && activeContentItem) {
      activeNavItem.classList.add("active");
      activeContentItem.classList.add("active");

      const contentElement = document.querySelector(".fundos-content");
      if (contentElement && window.innerWidth <= 991) {
        const yOffset = -20;
        const y =
          contentElement.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }

  fundosNavItems.forEach((navItem) => {
    navItem.addEventListener("click", function (e) {
      e.preventDefault();
      const targetFund = this.getAttribute("data-fund");
      switchTab(targetFund);
    });
  });

  function updateSidebarSticky() {
    if (fundosSidebar && window.innerWidth > 991) {
      const mainHeader = document.querySelector(".main-header");
      const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
      fundosSidebar.style.top = `${headerHeight + 20}px`;
    } else if (fundosSidebar) {
      fundosSidebar.style.top = "0";
    }
  }

  updateSidebarSticky();
  window.addEventListener("resize", updateSidebarSticky);

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateSidebarSticky, 100);
  });

  const fileUploadInput = document.getElementById("fileUpload");
  if (fileUploadInput) {
    fileUploadInput.addEventListener("change", function () {
      const uploadText = document.querySelector(".form-upload-text");
      console.log("Arquivo selecionado:", this.files);
      console.log("Elemento de texto encontrado:", uploadText);

      if (this.files && this.files.length > 0) {
        const file = this.files[0];
        const fileName = file.name;
        const fileSizeKB = (file.size / 1024).toFixed(2);
        const fileSizeText =
          fileSizeKB < 1024
            ? fileSizeKB + " KB"
            : (fileSizeKB / 1024).toFixed(2) + " MB";

        console.log("Nome do arquivo:", fileName);
        console.log("Tamanho:", fileSizeText);

        if (uploadText) {
          uploadText.textContent = fileName + " (" + fileSizeText + ")";
          console.log("Texto atualizado para:", uploadText.textContent);
        }
      } else if (uploadText) {
        uploadText.textContent = "Selecione um arquivo";
      }
    });
  } else {
    console.log("Input de upload não encontrado!");
  }
});
