const BtnEl = document.getElementById("btn"); // khai báo nút button
const appEl = document.getElementById("app"); //Khai báo Dom của phần tử app
// Đọc dữ liệu lưu trong storage local ra giao diện
const notes = getNote();
notes.forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, BtnEl);
});

function addNote() {
  // Hàm thêm note khi ấn vào nút button
  const notes = getNote(); // Khai báo biến notes bằng dữ liệu đọc từ local storage (dữ liệu là 1 mảng)
  const noteObj = {
    id: Math.floor(Math.random() * 100000), // id được tạo ngẫu nhiên
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content); // tạo ra 1 text area mới
  appEl.insertBefore(noteEl, BtnEl); // thêm noteEl vào trước btnEl
  notes.push(noteObj); // đẩy vào mảng notes
  saveNote(notes); // Lưu vào local storage
}
// Hàm lưu vào local storage trả về 1 chuỗi
function saveNote(note) {
  localStorage.setItem("Note-App", JSON.stringify(note));
}
// Hàm lấy dữ liệu từ local storage trả về một mảng
function getNote() {
  return JSON.parse(localStorage.getItem("Note-App") || "[]");
}
// Hàm tạo node
function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("DO you want to delete this note ?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", (e) => {
    updateNote(id, element.value);
  });
  return element;
}
// Hàm xóa node
function deleteNote(id, element) {
  const notes = getNote().filter((note) => {
    return note.id != id;
  });
  saveNote(notes);
  appEl.removeChild(element);
}
// Hàm cập nhật Note
function updateNote(id, element) {
  const note = getNote();
  note.forEach((note) => {
    if (note.id === id) {
      note.content = element;
    }
  });
  saveNote(note);
}
// Xử lý sự kiện khi click vào button
BtnEl.addEventListener("click", addNote);
