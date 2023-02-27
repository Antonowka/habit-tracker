import './howItWork.css';

export function howItWorkButton() {
    const howItWork = document.querySelector('.how-work') as HTMLElement;
    const howItWorkModal = document.querySelector('.how-work-modal') as HTMLElement;
    const howItWorkModalBtnClose = document.querySelector('.btn-modal-close') as HTMLElement;
    const transparentModal = document.createElement('div') as HTMLElement;
    const bodyScroll = document.querySelector('body') as HTMLElement;
    transparentModal.className = 'transparent-modal-how';

    document.addEventListener('click', function (e) {
        if (e.target === howItWork) {
            document.body.append(transparentModal);
            transparentModal.style.display = 'block';
            bodyScroll.classList.add('stop-scroll');
            howItWorkModal.classList.add('active');
        } else if (!howItWorkModal.contains(e.target as HTMLElement)) {
            transparentModal.style.display = 'none';
            bodyScroll.classList.remove('stop-scroll');
            howItWorkModal.classList.remove('active');
        } else if (e.target === howItWorkModalBtnClose) {
            transparentModal.style.display = 'none';
            bodyScroll.classList.remove('stop-scroll');
            howItWorkModal.classList.remove('active');
        }
    });
}
