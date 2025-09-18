(() => {

  const openNav = document.querySelector (".open-menu"),
    closeNav = document.querySelector (".close-menu"),
    navMenu = document.querySelector (".nav-links-container");
    mediaSize = 992;
  
  openNav.addEventListener("click", toggleMenu);
  closeNav.addEventListener("click", toggleMenu);
  
  function toggleMenu () {
    navMenu.classList.toggle("open");
  }
  
  navMenu.addEventListener("click", (event) => {
  
    if (
      event.target.hasAttribute("data-toggle") &&
      window.innerWidth <= mediaSize
    ) {
      event.preventDefault();
      const dropdownMenuBranch = event.target.parentElement;
  
      if (dropdownMenuBranch.classList.contains("active")) {
        collapseDropdownMenu();
      } else {
        if (navMenu.querySelector(".dropdown-menu-branch.active")) {
        collapseDropdownMenu();
        }
        dropdownMenuBranch.classList.add("active");
        const dropdownMenu = dropdownMenuBranch.querySelector(".dropdown-menu")
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
      }
     }
   });
  
  function collapseDropdownMenu() {
      navMenu
      .querySelector(".dropdown-menu-branch.active .dropdown-menu")
      .removeAttribute("style")
      navMenu
      .querySelector(".dropdown-menu-branch.active")
      .classList.remove("active")
  }
  })();
  
  const tabsContainer = document.querySelector(".tabs-container"); 
  const tabsList = tabsContainer.querySelector(".tabs-list");
  const tabButtons = tabsList.querySelectorAll(".tabs-button");
  const tabPanels = tabsContainer.querySelectorAll(".tabs__panels > div");
  
  tabsList.setAttribute("role", "tablist");
  
  tabsList.querySelectorAll("li").forEach((listitem) => {
    listitem.setAttribute("role", "presentation");
  });
  
  tabButtons.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    if (index === 0) {
      tab.setAttribute("aria-selected", "true");
    } else {
      tab.setAttribute("tabindex", "-1");
      tabPanels[index].setAttribute("hidden", "");
    }
  });
  
  tabPanels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("tabindex", "0");
  });
  
  // Click event listener
  tabsContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("a");
    if (!clickedTab) return;
  
    // Check if the clicked element is a tab button
    if (clickedTab.classList.contains("tabs-button")) {
      e.preventDefault();
      switchTab(clickedTab);
    }
  
    // Check if the clicked element is a "Schedule a visit" button
    if (clickedTab.closest('.calltoAction')) {
      // This will let the link navigate to the contact page
      return;
    }
  });
  
  // Keyboard navigation
  tabsContainer.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "Home":
        e.preventDefault();
        switchTab(tabButtons[0]);
        break;
      case "End":
        e.preventDefault();
        switchTab(tabButtons[tabButtons.length - 1]);
        break;
    }
  });
  
  function moveLeft() {
    const currentTab = document.activeElement;
    if (!currentTab.parentElement.previousElementSibling) {
      switchTab(tabButtons[tabButtons.length - 1]);
    } else {
      switchTab(currentTab.parentElement.previousElementSibling.querySelector("a"));
    }
  }
  
  function moveRight() {
    const currentTab = document.activeElement;
    if (!currentTab.parentElement.nextElementSibling) {
      switchTab(tabButtons[0]);
    } else {
      switchTab(currentTab.parentElement.nextElementSibling.querySelector("a"));
    }
  }
  
  function switchTab(newTab) {
    const activePanelId = newTab.getAttribute('href');
    const activePanel = tabsContainer.querySelector(activePanelId);
  
    tabButtons.forEach((button) => {
      button.setAttribute("aria-selected", false);
      button.setAttribute("tabindex", "-1");
    });
  
    tabPanels.forEach((panel) => {
      panel.setAttribute("hidden", true);
    });
    activePanel.removeAttribute("hidden");
  
    newTab.setAttribute("aria-selected", true);
    newTab.setAttribute("tabindex", "0");
    newTab.focus();
  }
  
  
    const body = document.querySelector('body');
      
  document.addEventListener('scroll' , () => {
    const header = document.querySelector('header');
  
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  
  });
  
  function toggle() {
    var trailer = document.querySelector(".trailer");
    var video = document.querySelector("video");
    trailer.classList.toggle("active");
    if (!trailer.classList.contains("active")) {
      video.pause();
      video.currentTime = 0;
    }
  }