'use strict';

// Utility function to toggle an element's class
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter functionality
const filterItems = document.querySelectorAll(".project-item");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Call filterFunc with "all" to display all projects initially
filterFunc("all");

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// JavaScript for lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxBody = document.getElementById('lightbox-body');
const lightboxClose = document.getElementById('lightbox-close');
const projectLinks = document.querySelectorAll('[data-lightbox]');

projectLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const projectItem = link.closest('.project-item');
    const projectTitle = projectItem.querySelector('.project-title').textContent;
    const projectCategory = projectItem.querySelector('.project-category').textContent;
    const projectImgSrc = projectItem.querySelector('img').src;
        
    lightboxBody.innerHTML = `
    <h2>${projectTitle}</h2>
    <p>Category: ${projectCategory}</p>
    <img src="${projectImgSrc}" alt="${projectTitle}">
    `;

    lightbox.style.display = 'flex';
    });
  });

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
  });

lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
