

let recipes = [
    {id: 1, title: "Banana Cake", collection: "Cakes", collectionId: 4, image_url: "./Images/cookies.jpg", recipe: ""}, 
    {id: 2, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 3, title: "Apple Pie", collection: "Pies", collectionId: 3, image_url: "Image", recipe: ""},
    {id: 4, title: "Lemon Cake", collection: "Cakes", collectionId: 4, image_url: "Image", recipe: ""},
    {id: 5, title: "Blueberry Cheesecake", collection: "Cheesecakes", collectionId: 8, image_url: "Image", recipe: ""},
    {id: 6, title: "Caramel Slices", collection: "Slices", collectionId: 5, image_url: "Image", recipe: ""},
    {id: 7, title: "Custard Tarts", collection: "Pastries", collectionId: 7, image_url: "Image", recipe: ""},
    {id: 8, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 9, title: "Christmas Tree Pastry", collection: "Pastries", collectionId: 7, image_url: "Image", recipe: ""},
    {id: 10, title: "Red Velvet Cupcakes", collection: "Cupcakes", collectionId: 2, image_url: "Image", recipe: ""},
    {id: 11, title: "Chocolate Chip Cookies", collection: "Cookies", collectionId: 1, image_url: "Image", recipe: ""},
    {id: 12, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 13, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 14, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 15, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 16, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
];


//--COLLECTIONS------------------------------------------------------------------------------------//

// Array of each collection with an image for homepage
let collections = [ 
	{collectionId: 1, title: "Cookies", 
        image_url: "./Images/cookies.jpg",
        link_url: "./HTML/recipes.html"},
	{collectionId: 2, title: "Cupcakes", 
        image_url: "./Images/cupcakes.jpg",
        link_url: "./HTML/recipes.html"},
	{collectionId: 3, title: "Pies", 
        image_url: "./Images/pie.jpg",
        link_url: "./HTML/recipes.html"},
	{collectionId: 4, title: "Cakes", 
        image_url: "./Images/cake.jpg",
        link_url: "./HTML/recipes.html"},
    {collectionId: 5, title: "Slices",
        image_url: "./Images/brownies.jpg",
        link_url: "./HTML/recipes.html"},
    {collectionId: 6, title: "Muffins",
        image_url: "./Images/muffins.jpg",
        link_url: "./HTML/recipes.html"},
    {collectionId: 7, title: "Pastries",
        image_url: "./Images/churros.jpg",
        link_url: "./HTML/recipes.html"},
    {collectionId: 8, title: "Cheesecakes", 
        image_url: "./Images/cheesecake.jpg",
        link_url: "./HTML/recipes.html"},
];

// Function that shows the collections in the recipe boxes on section 2 of home page
function displayCollections(collectionList){
    let allCollections = "";
        for(let i=0; i < collectionList.length; i++){
            let collections = `
            `;
            allCollections += collections;
    }
    return allCollections;
}

//--RECIPE-BOXES--------------------------------------------------------------------------------//

// Creates the recipe boxes for the collection section with the collection information above
let currentPage = 0;

// Function to determine number of boxes based on screen size
function getBoxesPerPage() {
    // Media query for large screen - computers (width 769px)
    const computerQuery = window.matchMedia("(min-width: 769px)");
    // Media query for medium screen - tablets (width 426px)
    const tabletQuery = window.matchMedia("(min-width: 426px)");

    if (computerQuery.matches) {
        return 4;} // For large screens
    else if (tabletQuery.matches) {
        return 3;} // For medium screens
    else {
        return 4;} // For small screens 
}

// Call and execute function to display collections to HTML element
document.getElementById("collectionList").innerHTML = displayCollections(collections);
localStorage.setItem("storedCollectionID", 1);

// Function renders collection boxes
function renderCollectionBoxes() {
    const boxesPerPage = getBoxesPerPage(); // Gives number of boxes from getBoxesPerPage function
    const start = currentPage * boxesPerPage;
    const end = start + boxesPerPage;
    const visibleCollections = collections.slice(start, end);

    const collectionList = document.getElementById("collectionList");
    collectionList.innerHTML = "";

    visibleCollections.forEach(collections => {
        const box = document.createElement("div");
        box.className = "collectionBox";
        box.innerHTML = `
            <a href="${collections.link_url}?filter=${collections.collectionId}">
            <img src="${collections.image_url}" alt="${collections.title}">
            <p>${collections.title}</p>
            </a>
        `;
        collectionList.appendChild(box);
    });
}

// Initial render
renderCollectionBoxes();

// Button event listeners for left and right navigation
const rightButton = document.getElementById("rightButton");
const leftButton = document.getElementById("leftButton");

if (rightButton) {
    rightButton.addEventListener('click', function() {
        const boxesPerPage = getBoxesPerPage();
        console.log("Right button clicked. Current page:", currentPage, "Boxes per page:", boxesPerPage);
        console.log("Total collections:", collections.length);
        console.log("Can go right?", (currentPage + 1) * boxesPerPage < collections.length);
        
        if ((currentPage + 1) * boxesPerPage < collections.length) {
            currentPage++;
            console.log("Moving to page:", currentPage);
            renderCollectionBoxes();
            updateActiveDot();
        } else {
            console.log("Cannot go right - at last page");
        }
    });
}

if (leftButton) {
    leftButton.addEventListener('click', function() {
        const boxesPerPage = getBoxesPerPage();
        console.log("Left button clicked. Current page:", currentPage, "Boxes per page:", boxesPerPage);
        console.log("Can go left?", currentPage > 0);
        
        if (currentPage > 0) {
            currentPage--;
            console.log("Moving to page:", currentPage);
            renderCollectionBoxes();
            updateActiveDot();
        } else {
            console.log("Cannot go left - at first page");
        }
    });
}

// Listen for screen size changes
window.addEventListener("resize", () => {
    // Re-render when viewport size changes
    // Checks size and updates number of boxes
    renderCollectionBoxes();
});



//--DOT-INDICATOR------------------------------------------------------------------------//

// Dot indicator under collection recipe boxes
const dots = document.querySelectorAll('.dotContainer .dot');

// Make the first dot active on page load
if (dots.length > 0) {
    dots[0].classList.add('dotActive');
}

function updateActiveDot() {
    dots.forEach(d => d.classList.remove('dotActive'));
    if (dots[currentPage]) {
        dots[currentPage].classList.add('dotActive');
    }
}

//Dot click event
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentPage = index;
        renderCollectionBoxes();
        updateActiveDot();
    });
});


//--FEATURED------------------------------------------------------------------------------//



// Array for the featured section (3) on homepage
let featured = [ 
	{id: 1, title: "Banana Cake", image_url: "./Images/bananacake.jpg"},
	{id: 7, title: "Cinnamon Churros", image_url: "./Images/churros.jpg"},
    {id: 11, title: "Choc Chip Cookies", image_url: "./Images/cookies.jpg"},
];

// Function to respond to the click event on the featured recipe box element
function openRecipeDetailPage(selectedRecipeID) {
    // Pass the selectedRecipeID to the recipeDetail page
    // Use local storage - a browser memory to store this selectedRecipeID
    localStorage.setItem("storedRecipeID", selectedRecipeID);
    // Open the recipeDetail page (correct path from home page)
    window.open("./HTML/recipeDetail.html", "_self");
}

// Function that shows the featured recipes in the recipe boxes on section 3 of home page
function displayFeatured(featuredList){
    let allFeatured = "";
        for(let i=0; i < featuredList.length; i++){
            let featured = `
                <div class="featuredBox" onclick="openRecipeDetailPage(${featuredList[i].id})">
                    <img src="${featuredList[i].image_url}" alt="${featuredList[i].title}">
                    <p> ${featuredList[i].title}</p>
                </div>
            `;
            allFeatured += featured;
    }
    return allFeatured;
}


// Call and execute the function to display featured recipes into the HTML element          
document.getElementById("featuredList").innerHTML = displayFeatured(featured);



//--SEARCH BAR-------------------------------------------------------------------------//

// Create search suggestions based on recipes and collections
function getSearchSuggestions() {
    const suggestions = [];
    
    // Add all recipe titles
    recipes.forEach(recipe => {
        if (!suggestions.includes(recipe.title)) {
            suggestions.push(recipe.title);
        }
    });
    
    // Add all collection names
    collections.forEach(collection => {
        if (!suggestions.includes(collection.title)) {
            suggestions.push(collection.title);
        }
    });
    
    return suggestions.sort();
}

// Function to create and show dropdown
function createSearchDropdown(inputElement, suggestions) {
    // Remove existing dropdown
    const existingDropdown = document.getElementById(inputElement.id + '_dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }
    
    if (suggestions.length === 0) return;
    
    //Create dropdown container
    const dropdown = document.createElement('div');
    dropdown.id = inputElement.id + '_dropdown';
    dropdown.className = 'search-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-top: none;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    
    // Add suggestions to dropdown
    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = suggestion;
        item.style.cssText = `
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            transition: background-color 0.2s;
        `;
        
        // Hover effect
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f5f5f5';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });
        
        // Click to select
        item.addEventListener('click', () => {
            inputElement.value = suggestion;
            dropdown.remove();
            inputElement.focus();
        });
        
        dropdown.appendChild(item);
    });
    
    // Position dropdown relative to input
    const parent = inputElement.parentElement;
    parent.style.position = 'relative';
    parent.appendChild(dropdown);
}

// Function to filter suggestions based on input
function filterSuggestions(query, allSuggestions) {
    if (!query) return [];
    
    return allSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Limit to 8 suggestions
}

// Get all suggestions
const allSuggestions = getSearchSuggestions();

// Home page search bar functionality with dropdown
const homeSearchInput = document.getElementById("homeSearch");
const homeSearchBtn = document.getElementById("homeSearchBtn");

if (homeSearchInput && homeSearchBtn) {
    // Add input event for dropdown
    homeSearchInput.addEventListener("input", function() {
        const query = this.value.trim();
        const suggestions = filterSuggestions(query, allSuggestions);
        createSearchDropdown(this, suggestions);
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!homeSearchInput.contains(e.target)) {
            const dropdown = document.getElementById(homeSearchInput.id + '_dropdown');
            if (dropdown) dropdown.remove();
        }
    });
    
    homeSearchBtn.addEventListener("click", function() {
        const query = homeSearchInput.value.trim();
        if (query) {
            window.location.href = `./HTML/recipes.html?search=${encodeURIComponent(query)}`;
        }
    });

    // Allow Enter key to trigger search
    homeSearchInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            const dropdown = document.getElementById(this.id + '_dropdown');
            if (dropdown) dropdown.remove();
            homeSearchBtn.click();
        } else if (e.key === "Escape") {
            const dropdown = document.getElementById(this.id + '_dropdown');
            if (dropdown) dropdown.remove();
        }
    });
}

// Navigation search bar functionality with dropdown
const navSearchInput = document.getElementById("navSearch");
const navSearchBtn = document.getElementById("navSearchBtn");

if (navSearchInput && navSearchBtn) {
    // Add input event for dropdown
    navSearchInput.addEventListener("input", function() {
        const query = this.value.trim();
        const suggestions = filterSuggestions(query, allSuggestions);
        createSearchDropdown(this, suggestions);
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!navSearchInput.contains(e.target)) {
            const dropdown = document.getElementById(navSearchInput.id + '_dropdown');
            if (dropdown) dropdown.remove();
        }
    });
    
    navSearchBtn.addEventListener("click", function() {
        const query = navSearchInput.value.trim();
        if (query) {
            window.location.href = `./HTML/recipes.html?search=${encodeURIComponent(query)}`;
        }
    });

    // Allow Enter key to trigger navigation search
    navSearchInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            const dropdown = document.getElementById(this.id + '_dropdown');
            if (dropdown) dropdown.remove();
            navSearchBtn.click();
        } else if (e.key === "Escape") {
            const dropdown = document.getElementById(this.id + '_dropdown');
            if (dropdown) dropdown.remove();
        }
    });
}



