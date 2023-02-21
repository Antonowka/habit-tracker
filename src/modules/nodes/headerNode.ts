import { returnTokenBodyBD } from '../auth/token';
import { header } from './mainNodes';

export const nodsHeader = () => {
    let userName = localStorage.nameToDoUser;
    if (!userName) {
        const data = JSON.parse(returnTokenBodyBD() || '');
        if (data.user) {
            userName = JSON.stringify(data.user).replace(/[^\p{L}\d]/gu, '');
        }
    }
    const renderHeader = `
      <div class="nav-bar">
          <div class="logo">
            <div class="logo-img"></div>Habit Tracker
          </div>

        <div class="menu">
          <ul class="nav-links">
            <li class="nav-link"><span class="how-work">How it works</span></li>
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
