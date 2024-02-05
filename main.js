//----localStorage ekleme

// localStorage.setItem("users", "rıdvan-1");

//----localStorage alma
// console.log(localStorage.getItem("users"));

// localStorage tablosu
const localStorageKey = "users_list_01";

// eğer içi dolu ise karışma boş obje olsun
let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

// console.log(users);

// kullanıcı ekleme
function addUser() {
  // html kodu içerisinden elementleri aşdık
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (name == "") {
    alert("Username Boş Olamaz...");
  } else if (email == "") {
    alert("Email Adresi Boş Olamaz...");
  } else {
    const mevcutUsers = users.find((user) => user.email === email);
    if (mevcutUsers) {
      mevcutUsers.name = name;
    } else {
      // mevcutta kullanıcı yoksa ekle
      users.push({ name, email });
    }

    localStorage.setItem(localStorageKey, JSON.stringify(users));
  }

  console.log(localStorage.getItem(localStorageKey));
}

function displayUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user) => {
    // item lar için li objesi oluştur
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    Kullanıcı Adı : ${user.name}
    <br/>
    E-Posta Adresi : ${user.email}
    <br/>
    <button onclick="editUser('${user.email}')">Düzenle</button>
    <button onclick="deleteUser('${user.email}')">Sil</button>
    <br/>
    <br/>
    
    <div>----------------------</div>
    
    
    `;
    userList.appendChild(listItem);
  });
}

displayUsers();

// kullanıcı düzenleme fonksiyonu
function editUser(email) {
  const userToEdit = users.find((user) => user.email === email);
  if (userToEdit) {
    document.getElementById("username").value = userToEdit.name;
    document.getElementById("email").value = userToEdit.email;
  }
}

//kullanıcı silme fonksiyonu

function deleteUser(email) {
  users = users.filter((user) => user.email !== email);
  localStorage.setItem(localStorageKey, JSON.stringify(users));
  displayUsers();
}

function temizle() {
  // LOCAL STORAGE TEMİZLE
  localStorage.clear();
}
