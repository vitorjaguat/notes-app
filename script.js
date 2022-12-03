const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
    <div class="tools">
        <button class="save" title="save">
            <i class="fa-solid fa-floppy-disk"></i>
        </button>
        <button class="edit" title="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete" title="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
    `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const saveBtn = note.querySelector('.save');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked.parse(text);
  //shows the text fomatted as Markdown

  deleteBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
    <div class="inside-modal">
        <p>Delete this note?</p>
        <div class="modal-options">
          <button class="no">No</button>
          <button class="yes">Yes</button>
        </div>
    </div>
    `;
    const yesBtn = modal.querySelector('.yes');
    yesBtn.addEventListener('click', () => {
      note.remove();
      updateLS();
      modal.remove();
    });
    const noBtn = modal.querySelector('.no');
    noBtn.addEventListener('click', () => {
      modal.remove();
    });
    document.body.appendChild(modal);
  });

  editBtn.addEventListener('click', () => {
    textArea.classList.remove('hidden');
    main.classList.add('hidden');
  });

  saveBtn.addEventListener('click', () => {
    main.classList.remove('hidden');
    textArea.classList.add('hidden');
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updateLS();
  });

  document.body.appendChild(note);
}

//Using localStorage native API:

// localStorage.setItem('key', 'value');
// localStorage.getItem('key');
// localStorage.removeItem('key');

// localStorage only stores strings as values. If you want to store an object:
// localStorage.setItem('key', JSON.stringify({id: 'xxx', name: 'Brad'}));
// JSON.parse(localStorage.getItem('key'));

// To see stored items on the borwser, go to Inspect / Application / Storage

function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem('notes', JSON.stringify(notes));
}
