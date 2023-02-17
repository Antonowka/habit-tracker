import { header } from './mainNodes';

export const nodsHeader = () => {
    const userName = localStorage.nameToDoUser;
    const renderHeader = `
      <div class="nav-bar">
        <span class="logo">Habit Tracker</span>
  
        <div class="menu">
          <ul class="nav-links">
            <li><a href="#">How it works</a></li>
          </ul>
        </div>
  
        <div class="darkLight-searchBox">
          <div class="dark-light">
            <i class='bx bx-moon moon'></i>
            <i class='bx bx-sun sun'></i>
          </div>
          <div class="logout-wrapper">
            <p class="drop-menu login-name">${userName}<span class="drop-menu-icon">&or;</span></p>
              <div class="dropdown-content">
                <button class="logout-btn">Logout </button>
              </div>
          </div>
        </div>
      </div>
    `;
    const nodes = document.createElement('nav');
    nodes.className = 'navbar';
    nodes.innerHTML = renderHeader;
    header.appendChild(nodes);

    const logout = document.querySelector('.logout-btn');
    logout?.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
};
