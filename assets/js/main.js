// ! global
var backLayer=document.getElementById("back-layer");
backLayer.classList.add("d-none");
var siteName = document.getElementById("sitename");
var siteUrl = document.getElementById("siteurl");

var bookmarkArray = [];
var namePattern = /^[a-zA-Z]{3,}$/;
var urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/.*)?$/;


// ! addFunction
function addBookmark() {
  var bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (bookmark.name === "" || bookmark.url === "") {
    backLayer.classList.remove("d-none");
  } else {
    // if (checkSiteName(bookmark.name) && isValidHttpUrl(bookmark.url))
    if (checkSiteDetails(bookmark.name, bookmark.url)) {
      bookmarkArray.push(bookmark);
      localStorage.setItem("site details", JSON.stringify(bookmarkArray));
      displayBookmark();
      clearInputs();
    } else {
      backLayer.classList.remove("d-none");
    }
  }
}

// ! deleteFunction
function deleteBookmark(index) {
  bookmarkArray.splice(index, 1);
  localStorage.setItem("site details", JSON.stringify(bookmarkArray));
  displayBookmark();
}

//! clearInputsFunction
function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}
//! displayFunction
function displayBookmark() {
  var cartoona = "";
  for (var i = 0; i < bookmarkArray.length; i++) {
    cartoona += `<tr>
    <td>${i + 1}</td>
    <td>${bookmarkArray[i].name}</td>
    <td><button class="btn btn-success"><i class="fa-solid fa-eye"></i><a href="${
      bookmarkArray[i].url
    }" target="_blank" class="text-decoration-none text-white">Visit</a></button></td>
    <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
  </tr>`;
  }
  document.getElementById("table-content").innerHTML = cartoona;
}

//! exitPopUpWindowFunction
function exitWindow() {
  backLayer.classList.add("d-none");
}

// function checkSiteName(name) {
//   var namePattern = /^[a-zA-Z]{3,}$/;
//   if (namePattern.test(name)) {
//     document.getElementById("back-layer").classList.add("d-none");
//     return true;
//   }
// }

// function isValidHttpUrl(string) {
//   try {
//     const newUrl = new URL(string);
//     return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
//   } catch (err) {
//     return false;
//   }
// }
//! checkSiteDetailsFunction
function checkSiteDetails(name, url) {
  if (namePattern.test(name) && urlPattern.test(url)) {
    backLayer.classList.add("d-none");
    return true;
  }
}

function validationOfName() {
  siteName.classList.remove('is-valid','is-invalid');
  if (namePattern.test(siteName.value)) {
    siteName.classList.add("is-valid");
  } else {
    siteName.classList.add("is-invalid");
  }
}

function validationOfUrl() {
  siteUrl.classList.remove('is-valid','is-invalid');
  if (urlPattern.test(siteUrl.value)) {
    siteUrl.classList.add("is-valid");
  } else {
    siteUrl.classList.add("is-invalid");
  }
}
