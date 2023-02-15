import { header } from './mainNodes';

export const nodsHeader = () => {
    const renderHeader = `
      <div class="nav-bar">
        <i class='bx bx-menu sidebarOpen'></i>
        <span class="logo navLogo"><a href="#">Habit Tracker</a></span>
  
        <div class="menu">
          <div class="logo-toggle">
            <span class="logo"><a href="#">Навигация</a></span>
            <i class='bx bx-x siderbarClose'></i>
          </div>
  
          <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Portfolio</a></li>
          </ul>
        </div>
  
        <div class="darkLight-searchBox">
          <div class="dark-light">
            <i class='bx bx-moon moon'></i>
            <i class='bx bx-sun sun'></i>
          </div>
        </div>
      </div>
    `;
    const nodes = document.createElement('nav');
    nodes.className = 'navbar';
    nodes.innerHTML = renderHeader;
    header.appendChild(nodes);
};
