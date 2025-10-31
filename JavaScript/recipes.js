//Array of recipe information (id, title, collection, etc)
let recipes = [
    {id: 1, title: "Banana Cake", collection: "Cakes", collectionId: 4, image_url: "../Images/bananacake.jpg"},  
    {id: 2, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6, image_url: "../Images/muffins.jpg"},
    {id: 3, title: "Apple Pie", collection: "Pies", collectionId: 3, image_url: "../Images/applePie.jpg"},
    {id: 4, title: "Chocolate Cake", collection: "Cakes", collectionId: 4, image_url: "../Images/chocCake.jpg"},
    {id: 5, title: "Blueberry Cheesecake", collection: "Cheesecakes", collectionId: 8, image_url: "../Images/blueberryCheesecake.jpg"},
    {id: 6, title: "Caramel Slices", collection: "Slices", collectionId: 5, image_url: "../Images/caramelSlices.jpg"},
    {id: 7, title: "Custard Tarts", collection: "Pastries", collectionId: 7, image_url: "../Images/custardTarts.jpg"},
    {id: 8, title: "Mini Blueberry Pies", collection: "Pies", collectionId: 3, image_url: "../Images/blueberryPie.jpg"},
    {id: 9, title: "Cinnamon Raisin Rolls", collection: "Pastries", collectionId: 7, image_url: "../Images/cinnamonRolls.jpg"},
    {id: 10, title: "Red Velvet Cupcakes", collection: "Cupcakes", collectionId: 2, image_url: "../Images/redCupcake.jpg"},
    {id: 11, title: "Choc Chip Cookies", collection: "Cookies", collectionId: 1, image_url: "../Images/chocCookies.jpg"},
    {id: 12, title: "Brownies", collection: "Slices", collectionId: 5, image_url: "../Images/brownie.jpg"},
    {id: 13, title: "Vanilla Cupcakes", collection: "Cupcakes", collectionId: 2, image_url: "../Images/vanillaCupcakes.jpg"},
    {id: 14, title: "Strawberry Cheesecake", collection: "Cheesecakes", collectionId: 8, image_url: "../Images/cheesecake.jpg"},
    {id: 15, title: "Chocolate Muffins", collection: "Muffins", collectionId: 6, image_url: "../Images/chocMuffin.jpg"},
    {id: 16, title: "Macaroons", collection: "Cookies", collectionId: 1, image_url: "../Images/macaroons.jpg"},
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
    // Calculate pagination using dynamic items per page
    const itemsPerPage = getItemsPerPage();
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

//Display recipes per page based on screen size

// Function to determine number of recipes based on screen size
function getItemsPerPage() {
    // Media query for large screen - computers (width 769px and above)
    const computerQuery = window.matchMedia("(min-width: 769px)");
    // Media query for medium screen - tablets (width 426px to 768px)
    const tabletQuery = window.matchMedia("(min-width: 426px) and (max-width: 768px)");

    if (computerQuery.matches) {
        return 8; // For large screens (PC)
    } else if (tabletQuery.matches) {
        return 6; // For medium screens (tablets)
    } else {
        return 4; // For small screens (mobile)
    }
}

let currentPage = 1;
let currentRecipes = recipes; // Store current filtered recipes for pagination

//#pageLeft button #pageRight button
const pageLeft = document.getElementById("pageLeft");
const pageRight = document.getElementById("pageRight");

// Function to update pagination button states
function updatePaginationButtons(totalItems) {
    const itemsPerPage = getItemsPerPage();
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
    const itemsPerPage = getItemsPerPage();
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

// Listen for screen size changes and re-render
window.addEventListener("resize", () => {
    // Reset to first page when screen size changes to avoid pagination issues
    currentPage = 1;
    // Re-render with new items per page
    recipeContainer.innerHTML = displayRecipes(currentRecipes);
});



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

//-----------------------OPENS-RECIPE DETAIL---------------------------------------

// Function to respond to the click event on the recipe box element
function openRecipeDetailPage(selectedRecipeID) {
    // Pass the selectedRecipeID to the recipeDetail page
    // Use local storage - a browser memory to store this selectedRecipeID
    localStorage.setItem("storedRecipeID", selectedRecipeID);
    // Open the recipeDetail page
    window.open("recipeDetail.html", "_self");
}





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

//---------------------search bar---------------------


// Clear all search inputs when page loads to prevent browser caching
document.addEventListener('DOMContentLoaded', function() {
    const homeSearch = document.getElementById("homeSearch");
    const navSearch = document.getElementById("navSearch");
    
    if (homeSearch) {
        homeSearch.value = '';
        homeSearch.setAttribute('autocomplete', 'off');
    }
    if (navSearch) {
        navSearch.value = '';
        navSearch.setAttribute('autocomplete', 'off');
    }
});

// Also clear on page show (handles back/forward navigation)
window.addEventListener('pageshow', function() {
    const homeSearch = document.getElementById("homeSearch");
    const navSearch = document.getElementById("navSearch");
    
    if (homeSearch) homeSearch.value = '';
    if (navSearch) navSearch.value = '';
});

// Clear inputs immediately when page loads (before DOMContentLoaded)
const homeSearchClear = document.getElementById("homeSearch");
const navSearchClear = document.getElementById("navSearch");
if (homeSearchClear) homeSearchClear.value = '';
if (navSearchClear) navSearchClear.value = '';


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
            const selectedSuggestion = suggestion;
            dropdown.remove();
            
            // Clear the input immediately before navigating
            inputElement.value = '';
            
            // Navigate to search results
            window.location.href = `recipes.html?search=${encodeURIComponent(selectedSuggestion)}`;
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
            // Clear the search input before navigating
            homeSearchInput.value = '';
            window.location.href = `recipes.html?search=${encodeURIComponent(query)}`;
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
            // Clear input when escape is pressed
            homeSearchInput.value = '';
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
            // Clear the search input before navigating
            navSearchInput.value = '';
            window.location.href = `recipes.html?search=${encodeURIComponent(query)}`;
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
            // Clear input when escape is pressed
            navSearchInput.value = '';
        }
    });
}

//--NEWSLETTER------------------------------------------------------------------------//

// Simple newsletter functionality
document.addEventListener("DOMContentLoaded", function() {
    const newsletterInput = document.getElementById("newsletterBar");
    const newsletterBtn = document.getElementById("newsletterBtn");

    function showNotification(message, isSuccess) {
        // Remove existing notification
        const existing = document.querySelector('.newsletter-notification');
        if (existing) existing.remove();

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'newsletter-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 1000;
            padding: 10px 15px; border-radius: 5px; font-size: 12px;
            font-family: Verdana; border: 1px solid #ccc;
            color: ${isSuccess ? '#4CAF50' : '#f44336'};
        `;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => notification.remove(), 3000);
    }

    function handleSubscription() {
        const email = newsletterInput.value.trim();
        if (email && email.includes('@')) {
            newsletterInput.value = '';
            showNotification('Subscribed successfully!', true);
            console.log("Newsletter subscription:", email);
        } else {
            showNotification('Please enter a valid email', false);
        }
    }

    newsletterBtn.addEventListener("click", function(e) {
        e.preventDefault();
        handleSubscription();
    });

    newsletterInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubscription();
        }
    });
});




