// Dashboard functionality
$(document).ready(function() {
    // Inicializar modo oscuro
    initializeDarkMode();

    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = './index.html';
        return;
    }

    // Set user email
    $('#userEmail').text(localStorage.getItem('userEmail') || 'demo@minicrm.com');

    // Toggle dark mode
    $(document).on('click', '#darkModeToggle', function() {
        toggleDarkMode();
    });

    // Tab functionality
    $(document).on('click', '.tab-btn', function() {
        const tabName = $(this).data('tab');
        switchTab(tabName);
    });

    // Modal controls - Using event delegation
    $(document).on('click', '#addContactBtn', function() {
        openContactModal();
    });
    $(document).on('click', '#addTaskBtn', function() {
        openTaskModal();
    });
    $(document).on('click', '#addInteractionBtn', function() {
        openInteractionModal();
    });

    // Delegation for contact card click (open detail)
    $(document).on('click', '.contact-card', function(e) {
        // Avoid opening detail if edit/delete was clicked
        if ($(e.target).closest('.edit-contact, .delete-contact').length) return;
        const contactId = $(this).data('id');
        openContactDetail(contactId);
    });
    // Delegation for edit contact
    $(document).on('click', '.edit-contact', function(e) {
        e.stopPropagation();
        const contactId = $(this).data('id');
        openContactModal(contactId);
    });
    // Delegation for delete contact
    $(document).on('click', '.delete-contact', function(e) {
        e.stopPropagation();
        const contactId = $(this).data('id');
        deleteContact(contactId);
    });

    // Delegation for task card click (edit)
    $(document).on('click', '.task-card', function(e) {
        if ($(e.target).closest('.edit-task, .delete-task').length) return;
        const taskId = $(this).data('id');
        openTaskModal(taskId);
    });
    // Delegation for edit task
    $(document).on('click', '.edit-task', function(e) {
        e.stopPropagation();
        const taskId = $(this).data('id');
        openTaskModal(taskId);
    });
    // Delegation for delete task
    $(document).on('click', '.delete-task', function(e) {
        e.stopPropagation();
        const taskId = $(this).data('id');
        deleteTask(taskId);
    });

    // Delegation for add/edit interaction (for demo, just open modal)
    $(document).on('click', '.add-interaction, .edit-interaction', function(e) {
        e.stopPropagation();
        openInteractionModal();
    });

    // Close modal buttons - Fixed with event delegation
    $(document).on('click', '.close-modal', function() {
        closeAllModals();
    });
    // Close modals when clicking outside - Fixed with event delegation
    $(document).on('click', '.modal', function(e) {
        if (e.target === this) {
            closeAllModals();
        }
    });
    // Close modals with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Logout functionality
    $(document).on('click', '#logoutBtn', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = './index.html';
    });
    // Account details button
    $(document).on('click', '#accountDetailsBtn', function() {
        window.location.href = './account.html';
    });

    // Form submissions (just for UI demo)
    $(document).on('submit', '#contactForm', function(e) {
        e.preventDefault();
        alert('Contact saved successfully! (Demo)');
        closeAllModals();
    });
    $(document).on('submit', '#taskForm', function(e) {
        e.preventDefault();
        alert('Task saved successfully! (Demo)');
        closeAllModals();
    });
    $(document).on('submit', '#interactionForm', function(e) {
        e.preventDefault();
        alert('Interaction saved successfully! (Demo)');
        closeAllModals();
    });

    // Load demo data
    loadDemoData();
});

// Tab switching function
function switchTab(tabName) {
    // Update tab buttons
    $('.tab-btn').removeClass('active border-blue-500 text-blue-600')
                .addClass('border-transparent text-gray-500');
    $(`.tab-btn[data-tab="${tabName}"]`).removeClass('border-transparent text-gray-500')
                                       .addClass('active border-blue-500 text-blue-600');

    // Show/hide tab content
    $('.tab-content').addClass('hidden').removeClass('active');
    $(`#${tabName}Tab`).removeClass('hidden').addClass('active');
}

// Modal functions
function openContactModal(contactId) {
    $('#contactModalTitle').text(contactId ? 'Edit Contact' : 'New Contact');
    $('#contactForm')[0].reset();
    $('#contactModal').show();
    $('body').addClass('overflow-hidden'); // Prevent background scroll
}

function openTaskModal(taskId) {
    $('#taskModalTitle').text(taskId ? 'Edit Task' : 'New Task');
    $('#taskForm')[0].reset();
    $('#taskModal').show();
    $('body').addClass('overflow-hidden');
}

function openInteractionModal() {
    $('#interactionForm')[0].reset();
    $('#interactionDate').val(new Date().toISOString().slice(0, 16));
    $('#interactionModal').show();
    $('body').addClass('overflow-hidden');
}

function closeAllModals() {
    $('.modal').hide().addClass('hidden');
    $('body').removeClass('overflow-hidden'); // Restore background scroll
}

// Load demo data
function loadDemoData() {
    // Demo contacts
    const demoContacts = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john@example.com',
            phone: '+1 555-0123',
            company: 'Tech Solutions Inc.',
            type: 'client',
            notes: 'Main client for web development project'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@startup.com',
            phone: '+1 555-0456',
            company: 'Innovation Startup',
            type: 'prospect',
            notes: 'Interested in mobile app development'
        },
        {
            id: 3,
            name: 'Mike Wilson',
            email: 'mike@design.com',
            phone: '+1 555-0789',
            company: 'Creative Design Studio',
            type: 'supplier',
            notes: 'Graphic design services provider'
        }
    ];

    // Demo tasks
    const demoTasks = [
        {
            id: 1,
            title: 'Review project proposal',
            description: 'Review and provide feedback on the new project proposal',
            priority: 'high',
            status: 'pending',
            dueDate: '2024-01-25'
        },
        {
            id: 2,
            title: 'Client meeting preparation',
            description: 'Prepare presentation for client meeting',
            priority: 'medium',
            status: 'in_progress',
            dueDate: '2024-01-20'
        },
        {
            id: 3,
            title: 'Update portfolio',
            description: 'Add recent projects to portfolio website',
            priority: 'low',
            status: 'completed',
            dueDate: '2024-01-15'
        }
    ];

    renderContacts(demoContacts);
    renderTasks(demoTasks);
}

// Render functions
function renderContacts(contacts) {
    const contactsList = $('#contactsList');
    contactsList.empty();

    contacts.forEach(contact => {
        const contactCard = `
            <div class="card contact-card hover:shadow-md transition-shadow duration-200 cursor-pointer" data-id="${contact.id}">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                                ${contact.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div class="ml-3">
                            <h3 class="font-semibold text-gray-900 dark:text-white">${contact.name}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">${contact.company || 'No company'}</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="edit-contact text-gray-400 hover:text-blue-600" data-id="${contact.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-contact text-gray-400 hover:text-red-600" data-id="${contact.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-envelope text-gray-400 w-4 mr-2"></i>
                        <span class="text-gray-700 dark:text-gray-300">${contact.email}</span>
                    </div>
                    ${contact.phone ? `
                        <div class="flex items-center">
                            <i class="fas fa-phone text-gray-400 w-4 mr-2"></i>
                            <span class="text-gray-700 dark:text-gray-300">${contact.phone}</span>
                        </div>
                    ` : ''}
                    <div class="flex items-center">
                        <span class="px-2 py-1 text-xs rounded-full ${
                            contact.type === 'client' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                            contact.type === 'prospect' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                            'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        }">${contact.type}</span>
                    </div>
                </div>
                ${contact.notes ? `
                    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p class="text-sm text-gray-600 dark:text-gray-400">${contact.notes}</p>
                    </div>
                ` : ''}
            </div>
        `;
        contactsList.append(contactCard);
    });
}

function renderTasks(tasks) {
    const tasksList = $('#tasksList');
    tasksList.empty();

    tasks.forEach(task => {
        const taskItem = `
            <div class="card task-card ${task.status === 'completed' ? 'opacity-75' : ''}" data-id="${task.id}">
                <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-3 flex-1">
                        <button class="toggle-task-status mt-1 ${task.status === 'completed' ? 'text-green-600' : 'text-gray-400'} hover:text-green-600" data-id="${task.id}">
                            <i class="fas ${task.status === 'completed' ? 'fa-check-circle' : 'fa-circle'}"></i>
                        </button>
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-2">
                                <h3 class="font-medium text-gray-900 dark:text-white ${task.status === 'completed' ? 'line-through' : ''}">${task.title}</h3>
                                <span class="px-2 py-1 text-xs rounded-full ${
                                    task.priority === 'high' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                                    task.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                                    'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                }">${task.priority}</span>
                            </div>
                            ${task.description ? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${task.description}</p>` : ''}
                            <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                ${task.dueDate ? `
                                    <span class="flex items-center">
                                        <i class="fas fa-calendar mr-1"></i>
                                        ${new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="edit-task text-gray-400 hover:text-blue-600" data-id="${task.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-task text-gray-400 hover:text-red-600" data-id="${task.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        tasksList.append(taskItem);
    });
}

// Contact detail functions
function openContactDetail(contactId) {
    console.log('openContactDetail called with ID:', contactId);
    // Demo contact detail
    const contact = {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 555-0123',
        company: 'Tech Solutions Inc.',
        type: 'client',
        notes: 'Main client for web development project'
    };

    $('#contactDetailTitle').text(contact.name);
    $('#contactInfo').html(`
        <div class="space-y-3">
            <div class="flex items-center">
                <i class="fas fa-envelope text-gray-400 w-4 mr-3"></i>
                <span class="text-gray-700">${contact.email}</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-phone text-gray-400 w-4 mr-3"></i>
                <span class="text-gray-700">${contact.phone}</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-building text-gray-400 w-4 mr-3"></i>
                <span class="text-gray-700">${contact.company}</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-tag text-gray-400 w-4 mr-3"></i>
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">${contact.type}</span>
            </div>
            ${contact.notes ? `
                <div class="flex items-start">
                    <i class="fas fa-sticky-note text-gray-400 w-4 mr-3 mt-1"></i>
                    <span class="text-gray-700">${contact.notes}</span>
                </div>
            ` : ''}
        </div>
    `);

    // Demo interactions
    const interactions = [
        {
            date: '2024-01-20 14:30',
            type: 'call',
            description: 'Discussed project requirements and timeline'
        },
        {
            date: '2024-01-18 10:00',
            type: 'email',
            description: 'Sent project proposal and budget estimate'
        },
        {
            date: '2024-01-15 16:00',
            type: 'meeting',
            description: 'Initial meeting to understand business needs'
        }
    ];

    const interactionsList = $('#interactionsList');
    interactionsList.empty();

    interactions.forEach(interaction => {
        const typeIcons = {
            call: 'fas fa-phone',
            email: 'fas fa-envelope',
            meeting: 'fas fa-calendar-check',
            whatsapp: 'fab fa-whatsapp',
            other: 'fas fa-comment'
        };
        
        const interactionItem = `
            <div class="card">
                <div class="flex items-start space-x-3">
                    <div class="p-2 rounded-full bg-blue-100 text-blue-600">
                        <i class="${typeIcons[interaction.type]}"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <h4 class="font-medium text-gray-900 capitalize">${interaction.type}</h4>
                            <span class="text-sm text-gray-500">${interaction.date}</span>
                        </div>
                        <p class="text-sm text-gray-600">${interaction.description}</p>
                    </div>
                </div>
            </div>
        `;
        interactionsList.append(interactionItem);
    });

    $('#contactDetailModal').show();
    $('body').addClass('overflow-hidden');
    console.log('Contact detail modal should be visible now');
}

// Demo functions
function toggleTaskStatus(taskId) {
    alert('Task status toggled! (Demo)');
}

function deleteContact(contactId) {
    if (confirm('Are you sure you want to delete this contact?')) {
        alert('Contact deleted! (Demo)');
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        alert('Task deleted! (Demo)');
    }
}

// Modo oscuro
function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        $('html').addClass('dark');
        updateDarkModeIcon(true);
    } else {
        $('html').removeClass('dark');
        updateDarkModeIcon(false);
    }
}

function toggleDarkMode() {
    const isDarkMode = $('html').hasClass('dark');
    if (isDarkMode) {
        $('html').removeClass('dark');
        localStorage.setItem('darkMode', 'false');
        updateDarkModeIcon(false);
    } else {
        $('html').addClass('dark');
        localStorage.setItem('darkMode', 'true');
        updateDarkModeIcon(true);
    }
}

function updateDarkModeIcon(isDark) {
    const icon = $('#darkModeIcon');
    if (isDark) {
        icon.removeClass('fa-moon').addClass('fa-sun');
    } else {
        icon.removeClass('fa-sun').addClass('fa-moon');
    }
} 