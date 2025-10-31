//--DATABASE---------------------------------------------------------------------------------------//
//import supabase library and setup the connection to database
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
let supabaseURL = 'https://bokfydvnukbsveefvbbt.supabase.co';
let supabaseAPI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJva2Z5ZHZudWtic3ZlZWZ2YmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjIzMzgsImV4cCI6MjA3NjI5ODMzOH0.QHMHbQbgxU0_9vGEkYp2xeKxk-HImPvtFB_PAsFud4s';
//create a connection to the backend: database
let supabase = createClient(supabaseURL, supabaseAPI);

//-------------------------------------------------------------------------------------------------//

// Recipe and collection data for search functionality
let recipes = [
    {id: 1, title: "Banana Cake", collection: "Cakes", collectionId: 4}, 
    {id: 2, title: "Blueberry Muffins", collection: "Muffins", collectionId: 6},
    {id: 3, title: "Apple Pie", collection: "Pies", collectionId: 3},
    {id: 4, title: "Lemon Cake", collection: "Cakes", collectionId: 4},
    {id: 5, title: "Blueberry Cheesecake", collection: "Cheesecakes", collectionId: 8},
    {id: 6, title: "Caramel Slices", collection: "Slices", collectionId: 5},
    {id: 7, title: "Custard Tarts", collection: "Pastries", collectionId: 7},
    {id: 8, title: "Pie", collection: "Pies", collectionId: 3},
    {id: 9, title: "Nutella Xmas Tree", collection: "Pastries", collectionId: 7},
    {id: 10, title: "Red Velvet Cupcakes", collection: "Cupcakes", collectionId: 2},
    {id: 11, title: "Choc Chip Cookies", collection: "Cookies", collectionId: 1},
    {id: 12, title: "Brownies", collection: "Slices", collectionId: 5},
    {id: 13, title: "Cupcakes", collection: "Cupcakes", collectionId: 2},
    {id: 14, title: "Cheesecake", collection: "Cheesecakes", collectionId: 8},
    {id: 15, title: "Muffins", collection: "Muffins", collectionId: 6},
    {id: 16, title: "Cookies", collection: "Cookies", collectionId: 1},
];

let collections = [ 
	{collectionId: 1, title: "Cookies"},
	{collectionId: 2, title: "Cupcakes"},
	{collectionId: 3, title: "Pies"},
	{collectionId: 4, title: "Cakes"},
    {collectionId: 5, title: "Slices"},
    {collectionId: 6, title: "Muffins"},
    {collectionId: 7, title: "Pastries"},
    {collectionId: 8, title: "Cheesecakes"},
];















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




