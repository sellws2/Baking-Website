//Array of recipe information (id, title, collection, etc)
let recipes = [
    {id: 1, title: "Banana Cake", collection: "Cakes", collectionId: 4, image_url: "../Images/bananacake.jpg", 
        time: "30-45 minutes"}, 
    {id: 2, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 3, title: "Apple Pie", collection: "Pies", collectionId: 3, image_url: "Image", recipe: ""},
    {id: 4, title: "Lemon Cake", collection: "Cakes", collectionId: 4, image_url: "Image", recipe: ""},
    {id: 5, title: "Blueberry Cheesecake", collection: "Cheesecakes", collectionId: 8, image_url: "Image", recipe: ""},
    {id: 6, title: "Caramel Slices", collection: "Slices", collectionId: 5, image_url: "Image", recipe: ""},
    {id: 7, title: "Custard Tarts", collection: "Pastries", collectionId: 7, image_url: "Image", recipe: ""},
    {id: 8, title: "Pie", collection: "Pies", collectionId: 3, image_url: "Image", recipe: ""},
    {id: 9, title: "Nutella Xmas Tree", collection: "Pastries", collectionId: 7, image_url: "Image", recipe: ""},
    {id: 10, title: "Red Velvet Cupcakes", collection: "Cupcakes", collectionId: 2, image_url: "Image", recipe: ""},
    {id: 11, title: "Choc Chip Cookies", collection: "Cookies", collectionId: 1, image_url: "Image", recipe: ""},
    {id: 12, title: "Brownies", collection: "Slices", collectionId: 5, image_url: "Image", recipe: ""},
    {id: 13, title: "Cupcakes", collection: "Cupcakes", collectionId: 2, image_url: "Image", recipe: ""},
    {id: 14, title: "Cheesecake", collection: "Cheesecakes", collectionId: 8, image_url: "Image", recipe: ""},
    {id: 15, title: "Muffins", collection: "Muffins", collectionId: 6, image_url: "Image", recipe: ""},
    {id: 16, title: "Cookies", collection: "Cookies", collectionId: 1, image_url: "Image", recipe: ""},
];


let collections = [ 
	{collectionId: 1, title: "Cookies", 
        image_url: "../Images/cookies.jpg", link_url: "recipes.html"},
	{collectionId: 2, title: "Cupcakes", 
        image_url: "../Images/cupcakes.jpg", link_url: "recipes.html"},
	{collectionId: 3, title: "Pies", 
        image_url: "../Images/pie.jpg", link_url: "recipes.html"},
	{collectionId: 4, title: "Cakes", 
        image_url: "../Images/cake.jpg", link_url: "recipes.html"},
    {collectionId: 5, title: "Slices", 
        image_url: "../Images/brownies.jpg", link_url: "recipes.html"},
    {collectionId: 6, title: "Muffins", 
        image_url: "../Images/muffins.jpg", link_url: "recipes.html"},
    {collectionId: 7, title: "Pastries", 
        image_url: "../Images/churros.jpg", link_url: "recipes.html"},
    {collectionId: 8, title: "Cheesecakes", 
        image_url: "../Images/cheesecake.jpg", link_url: "recipes.html"},
];



// Get the container element where recipes will be rendered
const recipeContainer = document.getElementById('recipesList');
// Get all filter buttons using the correct class
const filterButtons = document.querySelectorAll('.filterBtn');

// Function to display list of items with pagination
function displayRecipes(recipesList) {
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recipesToShow = recipesList.slice(startIndex, endIndex);
    
    let allRecipes = "";
    for(let i=0; i < recipesToShow.length; i++) {
        let recipe = `
            <div class="recipesBox">
                <img class="hover" src="${recipesToShow[i].image_url}" alt="${recipesToShow[i].title}"
                onclick="openRecipeDetailPage(${recipesToShow[i].id})">
                <p class="hover" onclick="openRecipeDetailPage(${recipesToShow[i].id})"> ${recipesToShow[i].title} </p>                
            </div>
        `;        
        allRecipes += recipe;
    }
    
    // Update pagination buttons
    updatePaginationButtons(recipesList.length);
    
    return allRecipes;
}

//Display 4 recipes per page, split into pages

const itemsPerPage = 4;
let currentPage = 1;
let currentRecipes = recipes; // Store current filtered recipes for pagination

//#pageLeft button #pageRight button
const pageLeft = document.getElementById("pageLeft");
const pageRight = document.getElementById("pageRight");

// Function to update pagination button states
function updatePaginationButtons(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Update button states
    if (pageLeft) {
        pageLeft.disabled = currentPage <= 1;
    }
    if (pageRight) {
        pageRight.disabled = currentPage >= totalPages;
    }
}

// Function to go to previous page
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        recipeContainer.innerHTML = displayRecipes(currentRecipes);
    }
}

// Function to go to next page
function goToNextPage() {
    const totalPages = Math.ceil(currentRecipes.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        recipeContainer.innerHTML = displayRecipes(currentRecipes);
    }
}

// Add event listeners for pagination buttons
if (pageLeft) {
    pageLeft.addEventListener('click', goToPreviousPage);
}
if (pageRight) {
    pageRight.addEventListener('click', goToNextPage);
}



// Function to handle filtering and display
function filterAndDisplay(filterId) {
    let filteredRecipes;
    // Check if the filterId is "0"
    if (filterId === 0) {
        filteredRecipes = recipes; // Show all recipes
    } else {
        // Filter the recipes where the collectionId matches the button's ID
        filteredRecipes = recipes.filter(recipe => recipe.collectionId === filterId);
    }
    
    // Reset to first page when filtering
    currentPage = 1;
    currentRecipes = filteredRecipes;
    
    // Update the HTML content with the filtered list
    recipeContainer.innerHTML = displayRecipes(filteredRecipes);
}


// Add click event listeners to the buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Manage active class on buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 2. Get the collectionId from the button as a number and filter
        const filterId = parseInt(button.getAttribute('collectionId'));
        filterAndDisplay(filterId);
    });
});

// Function to handle search functionality
function searchRecipes(searchQuery) {
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.collection.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Reset to first page when searching
    currentPage = 1;
    currentRecipes = filteredRecipes;
    
    // Clear any active filter buttons since we're searching
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Update the display
    recipeContainer.innerHTML = displayRecipes(filteredRecipes);
    
    // Show search results message
    console.log(`Found ${filteredRecipes.length} recipes matching "${searchQuery}"`);
}

//Initial render: displays all recipes when the page loads
document.addEventListener('DOMContentLoaded', () => {
    //Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const searchParam = urlParams.get('search');
    
    if (searchParam) {
        // Handle search query
        searchRecipes(searchParam);
    } else if (filterParam) {
        //Apply filters from URL parameter
        const filterId = parseInt(filterParam);
        filterAndDisplay(filterId);
        
        //Set the corresponding filter button as active
        const activeButton = document.querySelector(`[collectionId="${filterId}"]`);
        if (activeButton) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            activeButton.classList.add('active');
        }
    } else {
        //Display all recipes initially if no filter parameter
        filterAndDisplay(0);
    }
});

// Add search functionality for the navigation search bar on recipes page
document.addEventListener('DOMContentLoaded', () => {
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
        
        // Create dropdown container
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
                // Trigger search immediately when suggestion is selected
                searchRecipes(suggestion);
                // Update URL to reflect search
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('search', suggestion);
                newUrl.searchParams.delete('filter');
                window.history.pushState({}, '', newUrl);
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

    const navSearchBtn = document.getElementById("navSearchBtn");
    const navSearchInput = document.getElementById("navSearch");
    
    if (navSearchBtn && navSearchInput) {
        const allSuggestions = getSearchSuggestions();
        
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
                searchRecipes(query);
                // Update URL to reflect search
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('search', query);
                newUrl.searchParams.delete('filter');
                window.history.pushState({}, '', newUrl);
            }
        });

        // Allow Enter key to trigger search
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
});

// Function to respond to the click event on the recipe box element
function openRecipeDetailPage(selectedRecipeID) {
    // Pass the selectedRecipeID to the recipeDetail page
    // Use local storage - a browser memory to store this selectedRecipeID
    localStorage.setItem("storedRecipeID", selectedRecipeID);
    // Open the recipeDetail page
    window.open("recipeDetail.html", "_self");
}