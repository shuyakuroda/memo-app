'use strict';

let memos = [];

const form = document.getElementById("memoForm");
const input = document.getElementById("memoInput");
const list = document.getElementById("memoList");


// メモ追加処理
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const newMemo = {
    id: Date.now(),
    text: text,
    important: false
  };

  memos.push(newMemo);
  saveMemos();
  updateCount();
  // createMemoElement(newMemo);
  render();

  input.value = "";
});


// 削除処理（イベント委任）
list.addEventListener("click", function (e) {

  const deleteBtn = e.target.closest(".delete-btn");
  if (!deleteBtn) return;

  const li = deleteBtn.closest("li");
  const id = Number(li.dataset.id);

  memos = memos.filter(memo => memo.id !== id);
  saveMemos();
  updateCount();
  // li.remove();
  render();
});

// 保存処理
function saveMemos() {
  localStorage.setItem("memos", JSON.stringify(memos));
}

// DOM生成関数
function createMemoElement(memo) {
  const li = document.createElement("li");

  li.dataset.id = memo.id;

  const textSpan = document.createElement("span");
  textSpan.textContent = memo.text;

  if(memo.important) {
    textSpan.classList.add("important");
  }

  li.appendChild(textSpan);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.classList.add("delete-btn");
  li.appendChild(deleteBtn);

  list.appendChild(li);

  textSpan.addEventListener("click", () => {
    memo.important = !memo.important;
    textSpan.classList.toggle("important");
    saveMemos();
  });
}

// 保存データ復元
const savedMemos = localStorage.getItem("memos");

if (savedMemos) {
  memos = JSON.parse(savedMemos);
  // memos.forEach(createMemoElement);
  render();
  updateCount();
}

function updateCount() {
  const count = document.getElementById("memoCount");
  count.textContent = `メモ ${memos.length}件`;
}



function render() {
  list.innerHTML = "";
  memos.forEach(createMemoElement);
}