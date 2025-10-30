let cookbooks = [
    {id: 1, title: "Cookbook 1", image_url: "../Images/cookies.jpg", price: 29.99,
        description: "This is a description"},
    {id: 2, title: "Cookbook 2", image_url: "../Images/cookies.jpg", price: 29.99,
        description: "Second description"},
    {id: 3, title: "Cookbook 3", image_url: "../Images/cookies.jpg", price: 29.99,
        description: "Also, another description here."},
];

// Function that shows the cookbooks
function displayCookbooks(cookbookList){
    let allCookbooks = "";
        for(let i=0; i < cookbookList.length; i++){;
            allCookbooks += cookbooks;
    }
    return allCookbooks;
}


let currentPage = 0;
const boxesPerPage = 3;

// Function renders collection boxes
function renderCookbookBoxes() {
    const start = currentPage * boxesPerPage;
    const end = start + boxesPerPage;
    const visibleCookbooks = cookbooks.slice(start, end);

    const cookbookList = document.getElementById("cookbookList");
    cookbookList.innerHTML = "";

    visibleCookbooks.forEach(cookbook => {
        const box = document.createElement("div");
        box.className = "cookbookBox";
        box.innerHTML = `
            <img src="${cookbook.image_url}" alt="${cookbook.title}">
            <h1>${cookbook.title}</h1>
            <br>
            <p>${cookbook.description}</p>
            <br>
            <p id="price">PRICE: $ ${cookbook.price}</p>
        `;
        cookbookList.appendChild(box);
    });
}

// Initial render
renderCookbookBoxes();
localStorage.setItem("storedCookbookID", 1);