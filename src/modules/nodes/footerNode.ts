import { footer } from './mainNodes';

export const nodsFooter = () => {
    const renderFooter = `
    <div class="footer-links">
      <div class="footer-icon icon-school"><a class="footer-icon-link" target="_blank" href="https://rs.school/js/"></a></div>
      <div class="footer-icon icon-github"><a class="footer-icon-link" target="_blank" href="https://github.com/Antonowka"></a></div>
      <div class="footer-icon icon-github"><a class="footer-icon-link" target="_blank" href="https://github.com/max7394"></a></div>
      <div class="footer-icon icon-github"><a class="footer-icon-link" target="_blank" href="https://github.com/Sergey-Lesnevskiy"></a></div>
      <div class="footer-icon icon-youtube"><a class="footer-icon-link" target="_blank" href="https://www.youtube.com/@RollingScopesSchool"></a>
      </div>
    </div>
    <p class="copyright"> © Copyright 2022
      <a class="copyright-link" target="_blank" href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md"> Rs-s Clone</a>
    </p>
  `;
    const nodes = document.createElement('div');
    nodes.className = 'footer-wrapper';
    nodes.innerHTML = renderFooter;
    footer.appendChild(nodes);
};
