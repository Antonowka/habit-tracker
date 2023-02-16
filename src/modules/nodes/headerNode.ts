import { header } from './mainNodes';

export const nodsHeader = () => {
    const renderHeader = `
      <div class="nav-bar">
        <span class="nav-logo"><a class="logo" href="#">Habit Tracker</a></span>
  
        <div class="menu">
          <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Instruction</a></li>
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
