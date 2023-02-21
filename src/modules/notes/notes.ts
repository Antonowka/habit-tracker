import './notes.css';
import { divTranspModal, btnModalClose, habitModalHeader, closeModal } from '../habit/modalHabit';
import { UPDATE } from '../dataChangeLocal/dataChange';

const newNoteBtn = document.createElement('button');
newNoteBtn.className = 'btn-new-note';
newNoteBtn.innerHTML = '+ New Note';
newNoteBtn.addEventListener('click', clickBtnNote);

export const divNoteModal = document.createElement('div');
divNoteModal.className = 'modal-add-note';

const noteModalInput = document.createElement('textarea');
noteModalInput.className = 'modal-note-input';
noteModalInput.id = 'modal-note-input';
noteModalInput.placeholder = 'Type note HERE';
noteModalInput.maxLength = 125;

const btnModalNoteSave = document.createElement('button');
btnModalNoteSave.className = 'btn-modal-note-save';

if (localStorage.getItem('RS-notes') === null) {
    localStorage.setItem('RS-notes', JSON.stringify([]));
    UPDATE();
}

const currDate = new Date().toISOString().slice(0, 10);

export const allNotes = JSON.parse(localStorage.getItem('RS-notes') || '');

const colorsNotes = ['#ffe76e', '#a2f09c', '#ffb1e0', '#d8b1ff', '#9fe0ff'];

export function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function insertAddNoteBtn() {
    return newNoteBtn;
}

export function clickBtnNote() {
    document.body.append(divTranspModal, divNoteModal);
    habitModalHeader.innerHTML = 'Create New Note';
    document
        .querySelector('.modal-add-note')
        ?.append(habitModalHeader, btnModalClose, noteModalInput, btnModalNoteSave);
    (document.querySelector('.transparent-modal') as HTMLElement).style.display = 'block';
    (document.querySelector('.modal-add-note') as HTMLElement).style.display = 'block';
    (document.getElementById('modal-note-input') as HTMLInputElement).value = '';
    btnModalNoteSave.innerHTML = 'Save';
    btnModalNoteSave.addEventListener('click', saveNoteModal);
}

function saveNoteModal() {
    closeModal();
    fillDBNotes();
    createNotes();
}

function fillDBNotes() {
    const inputNote = (document.getElementById('modal-note-input') as HTMLInputElement).value;

    allNotes.push({
        text: String(inputNote),
        date: String(currDate),
        color: colorsNotes[getRndInteger(0, 4)],
        posLeft: document.documentElement.scrollWidth / 2 - 100,
        posTop: document.documentElement.scrollHeight / 2,
        zIndex: 200,
        degRotate: getRndInteger(-3, 3),
    });

    localStorage.setItem('RS-notes', JSON.stringify(allNotes));
    UPDATE();
}

export function createNotes() {
    document.querySelectorAll('.sticky-note').forEach((el) => el.remove());

    for (let i = 0; i < allNotes.length; i++) {
        const newDivNote = document.createElement('div');
        const newDivNoteHeader = document.createElement('div');
        const noteContent = document.createElement('div');
        const noteBtnClose = document.createElement('button');
        const noteBtnEdit = document.createElement('button');
        const headerDate = document.createElement('span');

        noteContent.className = 'note-body';

        noteBtnClose.className = 'btn-note-close';
        noteBtnEdit.className = 'btn-note-edit';

        noteBtnClose.innerHTML = 'X';
        noteBtnEdit.innerHTML = '&#9999;';

        noteBtnClose.addEventListener('click', deleteNote);
        noteBtnEdit.addEventListener('click', editNote);

        headerDate.innerHTML = allNotes[i].date;

        newDivNoteHeader.className = 'note-header';
        newDivNoteHeader.append(headerDate, noteBtnEdit, noteBtnClose);

        newDivNote.className = 'sticky-note';
        newDivNote.id = `note-${i + 1}`;
        newDivNote.append(newDivNoteHeader, noteContent);
        newDivNote.style.backgroundColor = allNotes[i].color;
        newDivNote.style.zIndex = allNotes[i].zIndex;
        newDivNote.style.transform = `rotate(${allNotes[i].degRotate}deg)`;

        noteContent.innerHTML = allNotes[i].text.replace(/\n/g, '<br>');
        newDivNote.style.left = allNotes[i].posLeft + 'px';
        newDivNote.style.top = allNotes[i].posTop + 'px';
        document.body.append(newDivNote);

        //*********Move Notes
        newDivNoteHeader.onpointerdown = function (e: Event) {
            const shiftX = (e as PointerEvent).clientX - newDivNote.getBoundingClientRect().left;
            const shiftY = (e as PointerEvent).clientY - newDivNote.getBoundingClientRect().top;

            //*****Change Z-index
            const noteIdNumber = Number(newDivNote.id.slice(5));
            const allZindexes = [];
            for (let i = 0; i < allNotes.length; i++) {
                allZindexes.push(allNotes[i].zIndex);
            }
            const maxZindex = Math.max(...allZindexes);
            ((e.target as HTMLElement).offsetParent as HTMLElement).style.zIndex = `${maxZindex + 1}`;

            allNotes[noteIdNumber - 1].zIndex = maxZindex + 1;
            localStorage.setItem('RS-notes', JSON.stringify(allNotes));
            UPDATE();
            //*****Change Z-index

            moveAt((e as PointerEvent).pageX, (e as PointerEvent).pageY);

            function moveAt(pageX: number, pageY: number) {
                newDivNote.style.left = pageX - shiftX + 'px';
                newDivNote.style.top = pageY - shiftY + 'px';
            }

            function onPointerMove(e: Event) {
                moveAt((e as PointerEvent).pageX, (e as PointerEvent).pageY);
            }

            document.addEventListener('pointermove', onPointerMove);

            newDivNote.onpointerup = function () {
                document.removeEventListener('pointermove', onPointerMove);
                newDivNote.onpointerup = null;
            };

            newDivNote.ondragstart = function () {
                return false;
            };

            document.addEventListener('pointerup', onPointerUp);

            function onPointerUp() {
                adjustStickCoords();
                document.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('pointerup', onPointerUp);

                //****Update DB
                const noteIdNumber = Number(newDivNote.id.slice(5));
                allNotes[noteIdNumber - 1].posLeft = Number(newDivNote.offsetLeft);
                allNotes[noteIdNumber - 1].posTop = Number(newDivNote.offsetTop);
                localStorage.setItem('RS-notes', JSON.stringify(allNotes));
                UPDATE();
                //****Update DB

                function adjustStickCoords() {
                    const coords = newDivNote.getBoundingClientRect();
                    let left;
                    let top;
                    const clientWidth = document.documentElement.clientWidth;
                    const clientHeight = document.documentElement.clientHeight;

                    if (coords.left < 0) {
                        left = 0;
                    } else if (coords.right > clientWidth) {
                        left = clientWidth - coords.width;
                    }

                    if (coords.top < 0) {
                        top = 0;
                    } else if (coords.bottom > clientHeight) {
                        top = clientHeight - coords.height;
                    }

                    newDivNote.style.left = left + 'px';
                    newDivNote.style.top = top + 'px';
                }
            }
        };
        //*********Move Notes
    }
}

function deleteNote(e: Event) {
    const noteIdNumber = Number(((e.target as HTMLElement).parentElement?.parentElement as HTMLElement).id.slice(5));
    allNotes.splice(noteIdNumber - 1, 1);
    localStorage.setItem('RS-notes', JSON.stringify(allNotes));
    UPDATE();
    createNotes();
}

function editNote(e: Event) {
    const noteIdNumber = Number(((e.target as HTMLElement).parentElement?.parentElement as HTMLElement).id.slice(5));
    clickBtnNote();
    habitModalHeader.innerHTML = 'Edit Note';
    noteModalInput.value = allNotes[noteIdNumber - 1].text;

    btnModalNoteSave.innerHTML = 'Edit';
    btnModalNoteSave.removeEventListener('click', saveNoteModal);
    btnModalNoteSave.addEventListener('click', editNoteBtn);

    function editNoteBtn() {
        closeModal();
        allNotes[noteIdNumber - 1].text = String(noteModalInput.value);
        allNotes[noteIdNumber - 1].date = String(currDate);
        localStorage.setItem('RS-notes', JSON.stringify(allNotes));
        UPDATE();
        createNotes();
        btnModalNoteSave.removeEventListener('click', editNoteBtn);
    }
}
