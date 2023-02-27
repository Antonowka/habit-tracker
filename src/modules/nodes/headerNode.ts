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

        <div class="how-work-modal">
          <div class="how-work-wrapper">
            <div class="modal-header-how">How it works?</div>
            <button class="btn-modal-close">X</button>
            <div class="modal-howTo-text">
              <h3 class="subtitle">Habit Tracker works on three principles:</h3>
              <p>1) Habits should be formed for life, until they become like brushing teeth.</p>
              <p>2) Goals should be flexible. You don’t need to try and maintain streaks. Just set a realistic
              and achievable goal and try to achieve it.</p>
              <p>3) Make notes as your journey progresses. The purpose is to self-reflect on your
              success/failure as you try to get better.</p>
              <h3 class="subtitle">Get started:</h3>
              <p>1) Set your habits by clicking on "+ New Habit".</p>
              <figure class="animation">
                <img src="./assets/gif/pushHabitButton.gif" alt="pushHabitButton">
              </figure>
              <p>2) Set goals for each habit.</p>
              <p>3) Click on any empty block in the calendar to mark a habit as done. Click again to toggle.</p>
              <figure class="animation">
                <img src="./assets/gif/markHabit.gif" alt="markHabit">
              </figure>
              <h3 class="subtitle">Why set goals</h3>
              <p>Goals are based on the concept of flexible consistency.</p>
              <p>While other habit trackers force you to maintain streaks, which add pressure to your
              life instead of taking it away, goals are based on the idea that “life keeps happening”
              and you may miss a day or two. But even if you do miss a day, you should just keep going.</p>
              <p>To do that, you set a goal, i.e. how many times a month do you want to perform an activity.
              For eg., “exercise 15 times a month”.</p>
              <p>Now you can perform the activity every alternate day or just on certain days of the week.
              The purpose is to do it 15 times a month.</p>
              <h3 class="subtitle">When to make notes</h3>
              <p>Create your notes by clicking on "+ New Note".</p>
              <figure class="animation">
                <img src="./assets/gif/pushNoteButton.gif" alt="pushNoteButton">
              </figure>
              <p>Self-reflection is the best way to improve. You know where you’re doing well, and where
              you need to get better.</p>
              <p>Notes is an easy way to record your progress. It could be positive thoughts like “I have
              been exercising regularly this month and it feels great.”</p>
              <p>It could even be constructive thoughts like “I’m sleeping late, and not being able to wake
              up on time. I need to fix my sleeping habit.”</p>
              <p>Write notes to keep a track of your progress and as a way to set checkpoints in your journey.</p>
            </div>
          </div>
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
