'use strict';

// const form = document.getElementById("memoForm");
// const input = document.getElementById("memoInput");
// const list = document.getElementById("memoList");

// let memos = [];

// function render() {
//   list.innerHTML = "";

//   memos.forEach(memo => {
//     const li = document.createElement("li");
//     li.textContent = memo.text;

//     li.dataset.id = memo.id;

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "❌";

//     li.appendChild(deleteBtn);
//     list.appendChild(li);
//   });
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   if (input.value === "") return;

//   memos.push({
//     id: Date.now(),
//     text: input.value
//   });

//   input.value = "";

//   render();
// })

// const input = document.getElementById("memoInput");
// const form = document.getElementById("memoForm");
// const list = document.getElementById("memoList");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (input.value === "") return;

//   const text = input.value;

//   const li = document.createElement("li");
//   li.textContent = text;


//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "×";

//   deleteBtn.addEventListener("click",function(e) {
//     const li = e.target.closest("li");
//     li.remove();
//   });

//   li.appendChild(deleteBtn);

//   list.appendChild(li);

//   input.value = "";

// });

const form = document.getElementById("memoForm");
const input = document.getElementById("memoInput");
const list = document.getElementById("memoList");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const text = input.value;

  if(text === "") return;

  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  li.appendChild(textSpan);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.classList.add("delete-btn");
  li.appendChild(deleteBtn);

  list.appendChild(li);

  input.value = "";
});

list.addEventListener("click",function(e) {

  const deleteBtn = e.target.closest(".delete-btn");
  if(!deleteBtn) return;

  deleteBtn.closest("li").remove();
})