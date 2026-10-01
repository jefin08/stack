/**
 * VS Code Theme Interactive Guide Controller & Clipboard Engine
 * Django Full-Stack Python Learning Path (Steps 1 to 18)
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Full Raw Guide Markdown Source (Clean & Complete)
    // -------------------------------------------------------------------------
    const FULL_GUIDE_MARKDOWN = `# Full-Stack Python Learning Path: Django from Zero

The simplest path is **Python + Django + HTML/CSS + JavaScript + SQLite**, without adding unnecessary technologies at the beginning.
We can learn it **by building one complete project from zero**, step by step.

---

### Step 1 — Setup

Install & Check:
\`\`\`bash
python --version
\`\`\`

Create project folder:
\`\`\`bash
mkdir django_project
cd django_project
\`\`\`

Create virtual environment:
\`\`\`bash
python -m venv venv
\`\`\`

Activate it on Windows:
\`\`\`bash
venv\\Scripts\\activate
\`\`\`

Install Django:
\`\`\`bash
pip install django
\`\`\`

Check:
\`\`\`bash
django-admin --version
\`\`\`

---

# Step 2 — Create Django Project

\`\`\`bash
django-admin startproject config .
\`\`\`

You will get:
\`\`\`text
django_project/
│
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── manage.py
└── venv/
\`\`\`

Start server:
\`\`\`bash
python manage.py runserver
\`\`\`

Open:
\`\`\`text
http://127.0.0.1:8000/
\`\`\`

---

# Step 3 — Understand the Project

The important files are:
\`\`\`text
settings.py  → project configuration
urls.py      → URL routing
models.py    → database structure
views.py     → application logic
forms.py     → forms and validation
templates/   → HTML pages
\`\`\`

The basic flow is:
\`\`\`text
Browser
   ↓
URL
   ↓
View
   ↓
Model / Database
   ↓
View
   ↓
HTML Template
   ↓
Browser
\`\`\`

---

# Step 4 — Create an App

For example, create a **Student Management** application:
\`\`\`bash
python manage.py startapp students
\`\`\`

Now:
\`\`\`text
django_project/
│
├── config/
│
├── students/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
│
└── manage.py
\`\`\`

---

# Step 5 — Register the App

Open: \`config/settings.py\`
Find: \`INSTALLED_APPS = [\`
Add: \`'students',\`

\`\`\`python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'students',
]
\`\`\`

---

# Step 6 — Create Student Model

Open: \`students/models.py\`
Add:

\`\`\`python
from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    course = models.CharField(max_length=100)
    age = models.IntegerField()

    def __str__(self):
        return self.name
\`\`\`

Our database will have:
\`\`\`text
Student
│
├── name
├── email
├── course
└── age
\`\`\`

---

# Step 7 — Create Database

Run:
\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\`

This creates the database: \`db.sqlite3\`.

---

# Step 8 — Register Model in Admin

Open: \`students/admin.py\`
Add:

\`\`\`python
from django.contrib import admin
from .models import Student

admin.site.register(Student)
\`\`\`

Now Django knows about the Student model.

---

# Step 9 — Create Admin User

Run:
\`\`\`bash
python manage.py createsuperuser
\`\`\`

Enter:
\`\`\`text
Username:
Email:
Password:
\`\`\`

Start server:
\`\`\`bash
python manage.py runserver
\`\`\`

Open: \`http://127.0.0.1:8000/admin/\`
Login to add and manage students.

---

# Step 10 — Create Forms

Create: \`students/forms.py\`
Use the shortcut:

\`\`\`python
from django.forms import ModelForm
from .models import Student


class StudentForm(ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
\`\`\`

Django automatically creates: Name, Email, Course, Age.

---

# Step 11 — Create Views

Open: \`students/views.py\`
We'll use Django's generic views to keep the code small:

\`\`\`python
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from .models import Student


class StudentList(ListView):
    model = Student
    template_name = 'students/student_list.html'
    context_object_name = 'students'


class StudentCreate(CreateView):
    model = Student
    fields = '__all__'
    template_name = 'students/student_form.html'
    success_url = reverse_lazy('student_list')


class StudentUpdate(UpdateView):
    model = Student
    fields = '__all__'
    template_name = 'students/student_form.html'
    success_url = reverse_lazy('student_list')


class StudentDelete(DeleteView):
    model = Student
    template_name = 'students/student_delete.html'
    success_url = reverse_lazy('student_list')
\`\`\`

Notice that generic views do not require a separate forms.py.

---

# Step 12 — Create App URLs

Create: \`students/urls.py\`
Add:

\`\`\`python
from django.urls import path
from .views import (
    StudentList,
    StudentCreate,
    StudentUpdate,
    StudentDelete
)


urlpatterns = [
    path('', StudentList.as_view(), name='student_list'),
    path('add/', StudentCreate.as_view(), name='student_add'),
    path('edit/<int:pk>/', StudentUpdate.as_view(), name='student_edit'),
    path('delete/<int:pk>/', StudentDelete.as_view(), name='student_delete'),
]
\`\`\`

---

# Step 13 — Connect App URLs

Open: \`config/urls.py\`
Change it to:

\`\`\`python
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('students.urls')),
]
\`\`\`

Now:
\`\`\`text
/              → Student List
/add/          → Add Student
/edit/1/       → Edit Student
/delete/1/     → Delete Student
/admin/        → Admin
\`\`\`

---

# Step 14 — Create Templates

Inside \`students\`, create:
\`\`\`text
templates/
└── students/
    ├── base.html
    ├── student_list.html
    ├── student_form.html
    └── student_delete.html
\`\`\`

---

# Step 15 — Create base.html

Create: \`students/templates/students/base.html\`
Add:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Student Management</title>
</head>

<body>

<nav>
    <a href="{% url 'student_list' %}">Students</a>
    |
    <a href="{% url 'student_add' %}">Add Student</a>
    |
    <a href="/admin/">Admin</a>
</nav>

<hr>

{% block content %}
{% endblock %}

</body>
</html>
\`\`\`

---

# Step 16 — Student List

Create: \`students/templates/students/student_list.html\`
Add:

\`\`\`html
{% extends 'students/base.html' %}

{% block content %}

<h1>Students</h1>

<a href="{% url 'student_add' %}">
    Add Student
</a>

<br><br>

<table border="1">

    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Course</th>
        <th>Age</th>
        <th>Actions</th>
    </tr>

    {% for student in students %}

    <tr>
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.course }}</td>
        <td>{{ student.age }}</td>

        <td>
            <a href="{% url 'student_edit' student.pk %}">
                Edit
            </a>

            <a href="{% url 'student_delete' student.pk %}">
                Delete
            </a>
        </td>
    </tr>

    {% empty %}

    <tr>
        <td colspan="5">
            No students found.
        </td>
    </tr>

    {% endfor %}

</table>

{% endblock %}
\`\`\`

---

# Step 17 — Student Form

Create: \`students/templates/students/student_form.html\`
Add:

\`\`\`html
{% extends 'students/base.html' %}

{% block content %}

<h1>Student</h1>

<form method="POST">

    {% csrf_token %}

    {{ form.as_p }}

    <button type="submit">
        Save
    </button>

</form>

{% endblock %}
\`\`\`

Handles both Add Student and Edit Student.

---

# Step 18 — Delete Student

Create: \`students/templates/students/student_delete.html\`
Add:

\`\`\`html
{% extends 'students/base.html' %}

{% block content %}

<h1>Delete Student</h1>

<p>
    Delete {{ object.name }}?
</p>

<form method="POST">

    {% csrf_token %}

    <button type="submit">
        Yes, Delete
    </button>

</form>

<a href="{% url 'student_list' %}">
    Cancel
</a>

{% endblock %}
\`\`\`

---

# Step 20 — Add Login

Django already has authentication built in.

Open:

config/urls.py

Change:

\`\`\`python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include('students.urls')),
]
\`\`\`

Now Django provides:
- \`/accounts/login/\`
- \`/accounts/logout/\`

---

# Step 21 — Create Login Page

Create: \`students/templates/registration/login.html\`

Add:

\`\`\`html
{% extends 'students/base.html' %}

{% block content %}

<h1>Login</h1>

<form method="POST">

    {% csrf_token %}

    {{ form.as_p }}

    <button type="submit">
        Login
    </button>

</form>

{% endblock %}
\`\`\`

---

# Step 22 — Configure Login

Open: \`config/settings.py\`

At the bottom:

\`\`\`python
LOGIN_URL = '/accounts/login/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/accounts/login/'
\`\`\`

---

# Step 24 — Add Login/Logout to Navbar

Update: \`students/templates/students/base.html\`

\`\`\`html
<nav>

    <a href="{% url 'student_list' %}">
        Students
    </a>

    |

    <a href="{% url 'student_add' %}">
        Add Student
    </a>

    |

    {% if user.is_authenticated %}

        <span>
            Hello {{ user.username }}
        </span>

        <form method="POST" action="{% url 'logout' %}" style="display:inline;">
            {% csrf_token %}
            <button type="submit">Logout</button>
        </form>

    {% else %}

        <a href="{% url 'login' %}">
            Login
        </a>

    {% endif %}

</nav>
\`\`\`
`;

    // -------------------------------------------------------------------------
    // 2. Clipboard Engine with Visual Toast
    // -------------------------------------------------------------------------
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMessage');
    let toastTimeout = null;

    function showToast(title, message) {
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }
        toastTitle.textContent = title;
        toastMsg.textContent = message;
        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    async function copyToClipboard(text, title = "Copied to Clipboard!", message = "Ready to paste (Ctrl+V)") {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for non-https/local file environments
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.left = '-999999px';
                textarea.style.top = '-999999px';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            showToast(title, message);
            return true;
        } catch (err) {
            console.error('Failed to copy: ', err);
            showToast("Copy failed", "Please allow clipboard permissions.");
            return false;
        }
    }

    // -------------------------------------------------------------------------
    // 3. Connect All Master Copy Buttons
    // -------------------------------------------------------------------------
    const copyMasterButtons = [
        document.getElementById('copyFullGuideBtn'),
        document.getElementById('heroCopyBtn'),
        document.getElementById('copyAllSidebarBtn'),
        document.getElementById('copyAllContentBtnTop'),
        document.getElementById('footerCopyBtn'),
        document.getElementById('statusBarCopyGuide'),
        document.getElementById('act-copy-all')
    ];

    copyMasterButtons.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(
                FULL_GUIDE_MARKDOWN,
                "✓ Full Guide Copied!",
                "All steps and code snippets are in your clipboard."
            );
        });
    });

    // -------------------------------------------------------------------------
    // 4. Code Snippet & Step Copy Buttons
    // -------------------------------------------------------------------------
    // Code snippet copy buttons
    document.querySelectorAll('.copy-snippet-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let codeText = '';
            
            // Check if button points to an element ID
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                const targetEl = document.getElementById(targetId);
                if (targetEl) codeText = targetEl.innerText;
            } else {
                // Sibling code element inside parent block
                const container = btn.closest('.code-block-container') || btn.closest('.file-view') || btn.closest('.flow-diagram-box');
                if (container) {
                    const codeEl = container.querySelector('code, pre');
                    if (codeEl) codeText = codeEl.innerText;
                }
            }

            if (codeText) {
                copyToClipboard(codeText.trim(), "✓ Snippet Copied!", "Code is saved to your clipboard.");
                
                // Visual feedback on button
                const originalText = btn.innerHTML;
                btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }
        });
    });

    // Step copy buttons (copies that step's entire text & commands)
    document.querySelectorAll('.copy-step-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const stepNum = btn.getAttribute('data-step');
            const stepCard = document.getElementById(`step-${stepNum}`);
            if (stepCard) {
                const stepText = stepCard.innerText;
                copyToClipboard(stepText, `✓ Step ${stepNum} Copied!`, `Step instructions and code copied.`);
                
                const orig = btn.textContent;
                btn.textContent = "✓ Copied";
                setTimeout(() => { btn.textContent = orig; }, 2000);
            }
        });
    });

    // Copy Current Open File Content Button
    const copyCurrentViewBtn = document.getElementById('copyCurrentViewBtn');
    if (copyCurrentViewBtn) {
        copyCurrentViewBtn.addEventListener('click', () => {
            const activeView = document.querySelector('.file-view.active');
            if (activeView) {
                const text = activeView.innerText;
                copyToClipboard(text, "✓ File Content Copied!", "Active file contents placed on clipboard.");
            }
        });
    }

    // -------------------------------------------------------------------------
    // 5. File Explorer Navigation & Tab Switching
    // -------------------------------------------------------------------------
    const tabsContainer = document.getElementById('editorTabs');
    const bcFolder = document.getElementById('bc-folder');
    const bcFile = document.getElementById('bc-file');
    const statusLang = document.getElementById('statusLangBadge');

    const fileMeta = {
        'guide': { folder: 'docs', file: 'Django_Guide.md', lang: 'Markdown', icon: 'M↓', iconClass: 'md-icon' },
        'flow': { folder: 'docs', file: 'Architecture_Flow.txt', lang: 'Plain Text', icon: '⚙', iconClass: 'txt-icon' },
        'settings': { folder: 'config', file: 'settings.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'config_urls': { folder: 'config', file: 'urls.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'models': { folder: 'students', file: 'models.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'admin': { folder: 'students', file: 'admin.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'forms': { folder: 'students', file: 'forms.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'views': { folder: 'students', file: 'views.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'student_urls': { folder: 'students', file: 'urls.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'base_html': { folder: 'students/templates', file: 'base.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'list_html': { folder: 'students/templates', file: 'student_list.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'form_html': { folder: 'students/templates', file: 'student_form.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'delete_html': { folder: 'students/templates', file: 'student_delete.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'login_html': { folder: 'students/templates/registration', file: 'login.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'manage': { folder: 'root', file: 'manage.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'db': { folder: 'root', file: 'db.sqlite3', lang: 'SQLite', icon: '🗄️', iconClass: 'db-icon' }
    };

    function activateView(fileKey) {
        // Hide all views
        document.querySelectorAll('.file-view').forEach(view => view.classList.remove('active'));
        
        // Show requested view
        const targetView = document.getElementById(`view-${fileKey}`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Highlight tree item
        document.querySelectorAll('.tree-item').forEach(item => {
            if (item.getAttribute('data-file') === fileKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Breadcrumbs & Status Bar
        const meta = fileMeta[fileKey] || { folder: 'root', file: fileKey, lang: 'Code', icon: '📄', iconClass: '' };
        if (bcFolder) bcFolder.textContent = meta.folder;
        if (bcFile) bcFile.textContent = meta.file;
        if (statusLang) statusLang.textContent = meta.lang;

        // Ensure Tab exists and is active
        ensureTab(fileKey, meta);
    }

    function ensureTab(fileKey, meta) {
        let existingTab = document.querySelector(`.editor-tab[data-tab="${fileKey}"]`);
        
        // Deactivate all tabs
        document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));

        if (!existingTab) {
            existingTab = document.createElement('div');
            existingTab.className = 'editor-tab active';
            existingTab.setAttribute('data-tab', fileKey);
            existingTab.innerHTML = `
                <span class="file-icon ${meta.iconClass}">${meta.icon}</span>
                <span class="tab-title">${meta.file}</span>
                <span class="tab-close" title="Close">✕</span>
            `;
            tabsContainer.appendChild(existingTab);

            // Tab click event
            existingTab.addEventListener('click', (e) => {
                if (e.target.classList.contains('tab-close')) {
                    e.stopPropagation();
                    closeTab(fileKey);
                } else {
                    activateView(fileKey);
                }
            });
        } else {
            existingTab.classList.add('active');
        }

        existingTab.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }

    function closeTab(fileKey) {
        const tabToClose = document.querySelector(`.editor-tab[data-tab="${fileKey}"]`);
        if (!tabToClose) return;

        const isCurrentlyActive = tabToClose.classList.contains('active');
        tabToClose.remove();

        if (isCurrentlyActive) {
            // Activate the last remaining tab, or guide
            const remainingTabs = document.querySelectorAll('.editor-tab');
            if (remainingTabs.length > 0) {
                const nextKey = remainingTabs[remainingTabs.length - 1].getAttribute('data-tab');
                activateView(nextKey);
            } else {
                activateView('guide');
            }
        }
    }

    // Attach tree-item click listener
    document.querySelectorAll('.tree-item').forEach(item => {
        item.addEventListener('click', () => {
            const fileKey = item.getAttribute('data-file');
            if (fileKey) activateView(fileKey);
        });
    });

    // Existing initial tab click listener
    document.querySelectorAll('.editor-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const fileKey = tab.getAttribute('data-tab');
            if (e.target.classList.contains('tab-close')) {
                e.stopPropagation();
                closeTab(fileKey);
            } else {
                activateView(fileKey);
            }
        });
    });

    // -------------------------------------------------------------------------
    // 6. Smooth Scroll to Steps Outline
    // -------------------------------------------------------------------------
    document.querySelectorAll('.step-nav-item').forEach(stepBtn => {
        stepBtn.addEventListener('click', () => {
            const targetId = stepBtn.getAttribute('data-target');
            activateView('guide');
            
            setTimeout(() => {
                const stepCard = document.getElementById(targetId);
                if (stepCard) {
                    stepCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    stepCard.style.borderColor = '#007acc';
                    stepCard.style.boxShadow = '0 0 16px rgba(0, 122, 204, 0.35)';
                    setTimeout(() => {
                        stepCard.style.borderColor = '';
                        stepCard.style.boxShadow = '';
                    }, 1400);
                }
            }, 60);
        });
    });

    // -------------------------------------------------------------------------
    // 7. Tree Folders Collapsible Behavior
    // -------------------------------------------------------------------------
    document.querySelectorAll('.tree-group-header, .folder-header').forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('collapsed');
        });
    });

    const collapseAllBtn = document.getElementById('collapseAllBtn');
    if (collapseAllBtn) {
        let isCollapsed = false;
        collapseAllBtn.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            document.querySelectorAll('.folder-header').forEach(f => {
                if (isCollapsed) f.classList.add('collapsed');
                else f.classList.remove('collapsed');
            });
        });
    }

    // -------------------------------------------------------------------------
    // 8. Search & Filter Input in Sidebar
    // -------------------------------------------------------------------------
    const searchInput = document.getElementById('stepSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput && clearSearchBtn) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            if (val.length > 0) {
                clearSearchBtn.style.display = 'block';
            } else {
                clearSearchBtn.style.display = 'none';
            }

            // Filter tree items and steps
            document.querySelectorAll('.tree-item, .step-nav-item').forEach(el => {
                const text = el.innerText.toLowerCase();
                if (text.includes(val)) {
                    el.style.display = 'flex';
                } else {
                    el.style.display = 'none';
                }
            });
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            document.querySelectorAll('.tree-item, .step-nav-item').forEach(el => {
                el.style.display = 'flex';
            });
            searchInput.focus();
        });
    }

    // Quick open button opens guide and focuses search
    const quickOpenBtn = document.getElementById('quickOpenBtn');
    if (quickOpenBtn) {
        quickOpenBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        });
    }

    // Keyboard Shortcut Ctrl+P or Ctrl+Shift+C
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });

    // Viewport cursor line update simulation
    const editorViewport = document.getElementById('editorViewport');
    const statusLnCol = document.getElementById('statusLnCol');
    if (editorViewport && statusLnCol) {
        editorViewport.addEventListener('scroll', () => {
            const line = Math.max(1, Math.floor(editorViewport.scrollTop / 24) + 1);
            statusLnCol.textContent = `Ln ${line}, Col 1`;
        });
    }
});
