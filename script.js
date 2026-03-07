'use strict';

let memos = [];

const form = document.getElementById("memoForm");
const input = document.getElementById("memoInput");
const list = document.getElementById("memoList");

let editingId = null;


// メモ追加処理
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  if (editingId) {
    memos = memos.map(memo => memo.id === editingId
      ? { ...memo, text: text }
      : memo
    );
    editingId = null;
  } else {
    const newMemo = {
      id: Date.now(),
      text: text,
      important: false,
      completed: false
    };
    memos.push(newMemo);
  }

  saveMemos();
  updateCount();
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

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = memo.completed;

  checkbox.addEventListener("change", function () {
    memos = memos.map(m =>
      m.id === memo.id
        ? { ...m, completed: !m.completed }
        : m
    );
    saveMemos();
    render();
  });

  if (memo.completed) {
    textSpan.classList.add("completed");
  }

  if (memo.important) {
    textSpan.classList.add("important");
  }

  const left = document.createElement("div");
  left.classList.add("memo-left");

  left.appendChild(checkbox);
  left.appendChild(textSpan);

  li.appendChild(left);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.classList.add("delete-btn");
  li.appendChild(deleteBtn);

  list.appendChild(li);

  // 重要に変換
  textSpan.addEventListener("click", () => {
    memo.important = !memo.important;
    saveMemos();
    render();
  });

  // 編集
  textSpan.addEventListener("dblclick", () => {
    input.value = memo.text;
    editingId = memo.id;
    input.focus();
  });
}

// 保存データ復元
const savedMemos = localStorage.getItem("memos");

if (savedMemos) {
  memos = JSON.parse(savedMemos);
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