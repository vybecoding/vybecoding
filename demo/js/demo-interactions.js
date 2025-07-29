// Demo interaction functions for prototype

// Members page functions
function searchMembers(query) {
    console.log('Searching members:', query);
    // Demo functionality - would normally filter members
}

function performMembersSearch() {
    const searchInput = document.getElementById('members-search');
    if (searchInput) {
        console.log('Performing member search:', searchInput.value);
    }
}

function bookSession(mentorId) {
    console.log('Booking session with mentor:', mentorId);
    // Navigate to profile page with booking tab
    if (window.vybeApp && window.vybeApp.getNavigation) {
        window.vybeApp.getNavigation().navigateTo('profile');
        setTimeout(() => {
            if (typeof window.showProfileTab === 'function') {
                window.showProfileTab('booking');
            }
        }, 500);
    } else {
        // Fallback
        window.location.href = '#profile';
    }
}

// Filter dropdown functions
const activeFilters = {
    members: {
        skills: [],
        tier: [],
        services: []
    }
};

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(`${dropdownId}-dropdown`);
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
    
    // Close other dropdowns
    document.querySelectorAll('.filter-dropdown').forEach(d => {
        if (d.id !== `${dropdownId}-dropdown`) {
            d.classList.remove('active');
        }
    });
}

function toggleMultiSelect(category, value) {
    const [page, filterType] = category.split('-');
    
    if (!activeFilters[page]) {
        activeFilters[page] = {};
    }
    if (!activeFilters[page][filterType]) {
        activeFilters[page][filterType] = [];
    }
    
    const index = activeFilters[page][filterType].indexOf(value);
    if (index > -1) {
        activeFilters[page][filterType].splice(index, 1);
    } else {
        activeFilters[page][filterType].push(value);
    }
    
    // Update UI
    updateFilterCounter(category);
    updateFilterCheckboxes(category, value);
}

function updateFilterCounter(category) {
    const [page, filterType] = category.split('-');
    const counter = document.getElementById(`${category}-counter`);
    
    if (counter && activeFilters[page] && activeFilters[page][filterType]) {
        const count = activeFilters[page][filterType].length;
        if (count > 0) {
            counter.textContent = count;
            counter.classList.remove('hidden');
        } else {
            counter.classList.add('hidden');
        }
    }
}

function updateFilterCheckboxes(category, value) {
    // This would update the checkbox UI in a real implementation
    console.log('Updating filter:', category, value);
}

function selectFilter(category, value) {
    console.log('Selected filter:', category, value);
    // Update the dropdown button text
    const dropdown = document.getElementById(`${category}-dropdown`);
    if (dropdown) {
        const button = dropdown.querySelector('.filter-dropdown-button span');
        if (button) {
            button.textContent = value.charAt(0).toUpperCase() + value.slice(1);
        }
        dropdown.classList.remove('active');
    }
}

function clearAllFilters(page) {
    activeFilters[page] = {
        skills: [],
        tier: [],
        services: []
    };
    
    // Reset all counters
    document.querySelectorAll(`.filter-selection-counter`).forEach(counter => {
        counter.classList.add('hidden');
    });
    
    // Reset all checkboxes
    document.querySelectorAll('.multi-select-checkbox').forEach(checkbox => {
        checkbox.classList.remove('checked');
    });
    
    console.log('Cleared all filters for:', page);
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown')) {
        document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});