/*-----------------------Variables-------------------------*/
var Product_Name = document.getElementById("Product-Name");
var Product_price = document.getElementById("Product-price");
var Product_Category = document.getElementById("Product-Category");
var Product_Desc = document.getElementById("Product-Desc");
var search_Product = document.getElementById(`search`);
var main_bnt = document.getElementById(`main-btn`);
var contaner;

if (localStorage.getItem("Product_list") == null) {
    contaner = [];
} else {
    contaner = JSON.parse(localStorage.getItem("Product_list"));
}

/*-----------------------Main function-------------------------*/
function ProductFun() {
    if (check() == true) {
        var Product = {
            Name: Product_Name.value,
            price: Product_price.value,
            Category: Product_Category.value,
            Description: Product_Desc.value,
        };
        contaner.push(Product);
        clear();
        takeTable();
    } else {
        show();
    }
}

/*-----------------------End Main function---------------------*/

function check() {
    if (
        Product_Name.value != "" &&
        Product_price.value != "" &&
        Product_Category.value != "" &&
        Product_Desc.value != ""
    ) {
        return true;
    } else {
        return false;
    }
}

function clear() {
    (Product_Name.value = ""),
    (Product_price.value = ""),
    (Product_Category.value = ""),
    (Product_Desc.value = "");
}

function takeTable() {
    var box = ``;
    for (var i = 0; i < contaner.length; i++) {
        box +=
            `<tr>
        <td> ${i + 1}</td>
        <td> ${contaner[i].Name}</td>
        <td> ${contaner[i].price}</td>
        <td> ${contaner[i].Category}</td>
        <td> ${contaner[i].Description}</td>
        <td><button onclick="update_product(` +
            i +
            `) ;" type="button" class="btn btn-outline-success">update</button></td>
        <td><button onclick=" delete_product(${i}) ;" type="button" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
    }
    document.getElementById(`table`).innerHTML = box;
}

function delete_product(index) {
    contaner.splice(index, 1);
    localStorage.setItem("Product_list", JSON.stringify(contaner));
    takeTable();
}

function searchpro() {
    var term = search_Product.value;
    var box = ``;
    for (var i = 0; i < contaner.length; i++) {
        if (
            contaner[i].Name.toLowerCase().includes(term.toLowerCase()) == true ||
            contaner[i].Category.toLowerCase().includes(term.toLowerCase()) == true ||
            contaner[i].Description.toLowerCase().includes(term.toLowerCase()) ==
            true ||
            contaner[i].price.includes(term) == true
        ) {
            box += `<tr>
            <td>${i}</td>
            <td>${contaner[i].Name}</td>
            <td> ${contaner[i].price}</td>
            <td> ${contaner[i].Category}</td>
            <td> ${contaner[i].Description}</td>
            <td><button onclick=" ;" type="button" class="btn btn-outline-success">update</button></td>
            <td><button onclick=" delete_roduct(${i}) ;" type="button" class="btn btn-outline-danger">delete</button></td>
            </tr>`;
        }
    }
    document.getElementById(`table`).innerHTML = box;
}

function update_product(index) {
    Product_Name.value = contaner[index].Name;
    Product_price.value = contaner[index].price;
    Product_Category.value = contaner[index].Category;
    Product_Desc.value = contaner[index].Description;
    delete_product(index);
}

function show() {
    document.getElementById("wrong").style.display = "block";
    document.getElementById("wrong").style.transition = "all , 0.5s";
}

function hiden() {
    document.getElementById("wrong").style.display = "none";
    document.getElementById("wrong").style.transition = "all , 0.5s";
}