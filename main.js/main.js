let price = document.getElementById('price');
let texes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
//get total
function getTotal() {
  if (price.value != '') {
    let result = +price.value + +texes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#a00d02';
  }
}

//create product
var dataPro = [];
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    discount: discount.value,
    texes: texes.value,
    ads: ads.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };

  //count
  if (title.value != '' && price.value != '' && newPro.count < 100) {
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      mood = 'create';
      submit.innerHTML = 'create';
      count.style.display = 'block';
    }
    clearData();
  }
  //save local storage
  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
};
//clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  discount.value = '';
  texes.value = '';
  ads.value = '';
  count.value = '';
  category.value = '';
  total.innerHTML = '';
}
//read
function showData() {
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].texes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>
            <button class="update" onclick = "editData(${i})">update</button>
            </td>
            <td>
            <button class="delete" onclick = "deleteData(${i})" >delete</button>
            </td>
        </tr>`;
    getTotal();
  }
  document.getElementById('tbody').innerHTML = table;

  let btnDlete = document.getElementById('dleteAll');
  if (dataPro.length > 0) {
    btnDlete.innerHTML = `<button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    btnDlete.innerHTML = '';
  }
}
showData();
//delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//deleteall
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
//search
let moodSearch = 'title';
function getSearchMood(id) {
  let sarch = document.getElementById('search');
  if (id == 'searchtitle') {
    moodSearch = 'title';
  } else {
    moodSearch = 'category';
  }
  sarch.placeholder = 'search by ' + moodSearch;
  sarch.focus();
  sarch.value = '';
  showData();
}
function searchData(value) {
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    if (moodSearch == 'title') {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].texes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td>
                    <button class="update" onclick = "editData(${i})">update</button>
                    </td>
                    <td>
                    <button class="delete" onclick = "deleteData(${i})" >delete</button>
                    </td>
                </tr>`;
      } else {
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
                  <tr>
                      <td>${i}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].texes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td>
                      <button class="update" onclick = "editData(${i})">update</button>
                      </td>
                      <td>
                      <button class="delete" onclick = "deleteData(${i})" >delete</button>
                      </td>
                  </tr>`;
      } else {
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}

//update
function editData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  texes.value = dataPro[i].texes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'update';
  mood = 'update';
  temp = i;
  scroll({
    top: 0,
  });
  getTotal();
}
