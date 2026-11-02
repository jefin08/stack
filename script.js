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

    const PROJECT_2_FULL_MARKDOWN = "# Django Project 2: Student Management Portal (FBV & Teacher Auth)\n\nProduction-style Function-Based Views (FBV) with Teacher Authentication, ModelForms, CRUD Operations, SQLite ORM, and Custom Static UI.\n\n---\n\n## 1. Project Configuration: `new/config/settings.py`\n```python\n\"\"\"\nDjango settings for config project.\n\nGenerated by 'django-admin startproject' using Django 5.2.18.\n\nFor more information on this file, see\nhttps://docs.djangoproject.com/en/5.2/topics/settings/\n\nFor the full list of settings and their values, see\nhttps://docs.djangoproject.com/en/5.2/ref/settings/\n\"\"\"\n\nfrom pathlib import Path\n\n# Build paths inside the project like this: BASE_DIR / 'subdir'.\nBASE_DIR = Path(__file__).resolve().parent.parent\n\n\n# Quick-start development settings - unsuitable for production\n# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/\n\n# SECURITY WARNING: keep the secret key used in production secret!\nSECRET_KEY = 'django-insecure-uk+i&stv*07v_8^cpgd%2=u#my6y*1ec-8%^zo)-uf$p-o@y13'\n\n# SECURITY WARNING: don't run with debug turned on in production!\nDEBUG = True\n\nALLOWED_HOSTS = []\n\n\n# Application definition\n\nINSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    'app1'\n]\n\nMIDDLEWARE = [\n    'django.middleware.security.SecurityMiddleware',\n    'django.contrib.sessions.middleware.SessionMiddleware',\n    'django.middleware.common.CommonMiddleware',\n    'django.middleware.csrf.CsrfViewMiddleware',\n    'django.contrib.auth.middleware.AuthenticationMiddleware',\n    'django.contrib.messages.middleware.MessageMiddleware',\n    'django.middleware.clickjacking.XFrameOptionsMiddleware',\n]\n\nROOT_URLCONF = 'config.urls'\n\nTEMPLATES = [\n    {\n        'BACKEND': 'django.template.backends.django.DjangoTemplates',\n        'DIRS': [BASE_DIR/'Template'],\n        'APP_DIRS': True,\n        'OPTIONS': {\n            'context_processors': [\n                'django.template.context_processors.request',\n                'django.contrib.auth.context_processors.auth',\n                'django.contrib.messages.context_processors.messages',\n            ],\n        },\n    },\n]\nSTATICFILES_DIR = [\n    BASE_DIR/'static',\n]\nWSGI_APPLICATION = 'config.wsgi.application'\n\n\n# Database\n# https://docs.djangoproject.com/en/5.2/ref/settings/#databases\n\nDATABASES = {\n    'default': {\n        'ENGINE': 'django.db.backends.sqlite3',\n        'NAME': BASE_DIR / 'db.sqlite3',\n    }\n}\n\n\n# Password validation\n# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators\n\nAUTH_PASSWORD_VALIDATORS = [\n    {\n        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',\n    },\n    {\n        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',\n    },\n    {\n        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',\n    },\n    {\n        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',\n    },\n]\n\n\n# Internationalization\n# https://docs.djangoproject.com/en/5.2/topics/i18n/\n\nLANGUAGE_CODE = 'en-us'\n\nTIME_ZONE = 'UTC'\n\nUSE_I18N = True\n\nUSE_TZ = True\n\n\n# Static files (CSS, JavaScript, Images)\n# https://docs.djangoproject.com/en/5.2/howto/static-files/\n\nSTATIC_URL = 'static/'\n\n# Default primary key field type\n# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field\n\nDEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'\n\nLOGIN_URL = 'login'\nLOGIN_REDIRECT_URL = 'student_list'\nLOGOUT_REDIRECT_URL = 'login'\n```\n\n---\n\n## 2. Root URLs: `new/config/urls.py`\n```python\n\"\"\"\nURL configuration for config project.\n\nThe `urlpatterns` list routes URLs to views. For more information please see:\n    https://docs.djangoproject.com/en/5.2/topics/http/urls/\nExamples:\nFunction views\n    1. Add an import:  from my_app import views\n    2. Add a URL to urlpatterns:  path('', views.home, name='home')\nClass-based views\n    1. Add an import:  from other_app.views import Home\n    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')\nIncluding another URLconf\n    1. Import the include() function: from django.urls import include, path\n    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))\n\"\"\"\nfrom django.contrib import admin\nfrom django.urls import path, include\n\nurlpatterns = [\n    path('admin/', admin.site.urls),\n    path('',include('app1.urls')),\n]\n```\n\n---\n\n## 3. WSGI & ASGI Handlers\n### `new/config/wsgi.py`\n```python\n\"\"\"\nWSGI config for config project.\n\nIt exposes the WSGI callable as a module-level variable named ``application``.\n\nFor more information on this file, see\nhttps://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/\n\"\"\"\n\nimport os\n\nfrom django.core.wsgi import get_wsgi_application\n\nos.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')\n\napplication = get_wsgi_application()\n```\n\n### `new/config/asgi.py`\n```python\n\"\"\"\nASGI config for config project.\n\nIt exposes the ASGI callable as a module-level variable named ``application``.\n\nFor more information on this file, see\nhttps://docs.djangoproject.com/en/5.2/howto/deployment/asgi/\n\"\"\"\n\nimport os\n\nfrom django.core.asgi import get_asgi_application\n\nos.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')\n\napplication = get_asgi_application()\n```\n\n---\n\n## 4. Student Model: `new/app1/models.py`\n```python\nfrom django.db import models\n\n# Create your models here.\nclass student(models.Model):\n    rollno = models.IntegerField(unique=True)\n    name = models.CharField(max_length=30)\n    email = models.EmailField(unique=True)\n    course = models.CharField(max_length=30)\n\n    def __str__(self):\n        return self.name\n```\n\n---\n\n## 5. ModelForm: `new/app1/forms.py`\n```python\nfrom django import forms\nfrom .models import student\n\nclass studentForm(forms.ModelForm):\n    class Meta:\n        model = student\n\n        fields = ['rollno','name','email','course']\n```\n\n---\n\n## 6. Function-Based Views: `new/app1/views.py`\n```python\nfrom django.shortcuts import render, redirect, get_object_or_404\nfrom django.contrib.auth import authenticate, login, logout\nfrom django.contrib import messages\nfrom django.contrib.auth.decorators import login_required, user_passes_test\n\nfrom .models import student\nfrom .forms import studentForm\n\n# Create your views here.\ndef teacher_login(request):\n    if request.method == 'POST':\n        user = authenticate(request, username=request.POST['username'], password = request.POST['password'])\n\n        if user and user.is_staff:\n            login(request,user)\n            return redirect('student_list')\n        messages.error(request,'Invalid')\n\n    return render(request,'login.html')\n\n@login_required\ndef teacher_logout(request):\n    logout(request)\n    return redirect('login')\n\n@login_required\ndef student_list(request):\n    students = student.objects.all()\n    return render(request, 'student_list.html',{'students':students})\n\n@login_required\ndef add_student(request):\n    form = studentForm(request.POST or None)\n    if form.is_valid():\n        form.save()\n        return redirect('student_list')\n    return render(request,'student_form.html',{'form':form, 'title':'add student'})\n\n@login_required\ndef edit_student(request, id):\n    student_obj = get_object_or_404(student, id=id)\n    form = studentForm(request.POST or None, instance=student_obj)\n    if form.is_valid():\n        form.save()\n        return redirect('student_list')\n    return render(request, 'student_form.html', {'form': form, 'title':'edit student'})\n\n\n@login_required\ndef delete_student(request, id):\n    student_obj = get_object_or_404(student, id=id)\n    if request.method == 'POST':\n        student_obj.delete()\n        return redirect('student_list')\n    return render(request, 'student_confirm_delete.html', {'student': student})\n```\n\n---\n\n## 7. App URL Routing: `new/app1/urls.py`\n```python\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n\n    path('',views.teacher_login,name ='login'),\n    path('logout/',views.teacher_logout,name ='logout'),\n    path('students/',views.student_list,name ='student_list'),\n    \n    path('add/', views.add_student, name='add_student'),\n\n    path('edit/<int:id>/', views.edit_student, name='edit_student'),\n\n    path('delete/<int:id>/', views.delete_student, name='delete_student'),\n]\n```\n\n---\n\n## 8. Admin Registration & AppConfig\n### `new/app1/admin.py`\n```python\nfrom django.contrib import admin\nfrom .models import student\n# Register your models here.\nadmin.site.register(student)\n```\n\n### `new/app1/apps.py`\n```python\nfrom django.apps import AppConfig\n\n\nclass App1Config(AppConfig):\n    default_auto_field = 'django.db.models.BigAutoField'\n    name = 'app1'\n```\n\n---\n\n## 9. Base Template: `new/template/base.html`\n```html\n<!DOCTYPE html>\n<html>\n    <head>\n        <title>student management</title>\n        <link rel=\"stylesheet\" href=\"/static/css/style.css\">\n    </head>\n    <body>\n    <nav class= 'navbar'>\n        <h2>Student MAnagemanet </h2>\n        {%if user.is_authenticated %}\n            <div>\n                <span>welcome, {{ user.username}}</span>\n                <a herf =\"{% url 'logout' %}\"> logout</a>\n            </div>\n        {% endif %}\n    </nav>\n\n    <div class=\"container\">\n\n        {% if messages %}\n\n            {% for message in messages %}\n\n                <p>{{ message }}</p>\n\n            {% endfor %}\n\n        {% endif %}\n\n        {% block content %}\n\n        {% endblock %}\n\n    </div>\n        <script src=\"\" async defer></script>\n    </body>\n</html>\n```\n\n---\n\n## 10. Teacher Login Template: `new/template/login.html`\n```html\n{% extends 'base.html' %}\n\n{% block content %}\n\n<div class=\"login-box\">\n\n    <h2>Teacher Login</h2>\n\n    <form method=\"POST\">\n\n        {% csrf_token %}\n\n        <label>Username</label>\n\n        <input type=\"text\" name=\"username\" required>\n\n        <label>Password</label>\n\n        <input type=\"password\" name=\"password\" required>\n\n        <button type=\"submit\">Login</button>\n\n    </form>\n\n</div>\n\n{% endblock %}\n```\n\n---\n\n## 11. Student List Template: `new/template/student_list.html`\n```html\n{% extends 'base.html' %}\n\n{% block content %}\n\n<h2>Student List</h2>\n\n<a href=\"{% url 'add_student' %}\" class=\"add-btn\">\n    Add Student\n</a>\n\n<table>\n\n    <thead>\n\n        <tr>\n\n            <th>Roll No</th>\n\n            <th>Name</th>\n\n            <th>Email</th>\n\n            <th>Course</th>\n\n            <th>Actions</th>\n\n        </tr>\n\n    </thead>\n\n\n    <tbody>\n\n        {% for student in students %}\n\n        <tr>\n\n            <td>{{ student.rollno }}</td>\n\n            <td>{{ student.name }}</td>\n\n            <td>{{ student.email }}</td>\n\n            <td>{{ student.course }}</td>\n\n            <td>\n\n                <a href=\"{% url 'edit_student' student.id %}\">\n                    Edit\n                </a>\n\n                |\n\n                <a href=\"{% url 'delete_student' student.id %}\">\n                    Delete\n                </a>\n\n            </td>\n\n        </tr>\n\n        {% empty %}\n\n        <tr>\n            <td colspan=\"5\">No students found</td>\n        </tr>\n\n        {% endfor %}\n\n    </tbody>\n\n</table>\n\n{% endblock %}\n```\n\n---\n\n## 12. Student Form Template: `new/template/student_form.html`\n```html\n{% extends 'base.html' %}\n\n{% block content %}\n\n<div class=\"form-box\">\n\n    <h2>{{ title }}</h2>\n\n    <form method=\"POST\">\n\n        {% csrf_token %}\n\n        {{ form.as_p }}\n\n        <button type=\"submit\">Save</button>\n\n        <a href=\"{% url 'student_list' %}\">\n            Cancel\n        </a>\n\n    </form>\n\n</div>\n\n{% endblock %}\n```\n\n---\n\n## 13. Student Confirm Delete Template: `new/template/student_confirm_delete.html`\n```html\n{% extends 'base.html' %}\n\n{% block content %}\n\n<h2>Delete Student</h2>\n\n<p>\n    Are you sure you want to delete\n    {{ student.name }}?\n</p>\n\n<form method=\"POST\">\n\n    {% csrf_token %}\n\n    <button type=\"submit\">\n        Confirm Delete\n    </button>\n\n    <a href=\"{% url 'student_list' %}\">\n        Cancel\n    </a>\n\n</form>\n\n{% endblock %}\n```\n\n---\n\n## 14. Custom Static Stylesheet: `new/static/css/style.css`\n```css\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: Arial, sans-serif;\n    background: #f4f6f9;\n}\n\n.navbar {\n    background: #222f3e;\n    color: white;\n    padding: 15px 30px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.navbar a {\n    color: white;\n    text-decoration: none;\n    margin-left: 20px;\n}\n\n.container {\n    padding: 30px;\n}\n\n.login-box,\n.form-box {\n    background: white;\n    padding: 25px;\n    max-width: 450px;\n    margin: 50px auto;\n    border-radius: 8px;\n    box-shadow: 0 2px 10px #ddd;\n}\n\ninput {\n    width: 100%;\n    padding: 10px;\n    margin: 10px 0 15px;\n    border: 1px solid #ccc;\n    border-radius: 5px;\n}\n\nbutton,\n.add-btn {\n    background: #0984e3;\n    color: white;\n    padding: 10px 15px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    text-decoration: none;\n}\n\ntable {\n    width: 100%;\n    margin-top: 25px;\n    background: white;\n    border-collapse: collapse;\n}\n\nth,\ntd {\n    padding: 14px;\n    border: 1px solid #ddd;\n    text-align: left;\n}\n\nth {\n    background: #222f3e;\n    color: white;\n}\n\ntd a {\n    text-decoration: none;\n    color: #0984e3;\n}\n```\n\n---\n\n## 15. Manage.py: `new/manage.py`\n```python\n#!/usr/bin/env python\n\"\"\"Django's command-line utility for administrative tasks.\"\"\"\nimport os\nimport sys\n\n\ndef main():\n    \"\"\"Run administrative tasks.\"\"\"\n    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')\n    try:\n        from django.core.management import execute_from_command_line\n    except ImportError as exc:\n        raise ImportError(\n            \"Couldn't import Django. Are you sure it's installed and \"\n            \"available on your PYTHONPATH environment variable? Did you \"\n            \"forget to activate a virtual environment?\"\n        ) from exc\n    execute_from_command_line(sys.argv)\n\n\nif __name__ == '__main__':\n    main()\n```\n";

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

    // Project 2 Master Copy Button
    const copyProject2Btn = document.getElementById('copyProject2MasterBtn');
    if (copyProject2Btn) {
        copyProject2Btn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(
                PROJECT_2_FULL_MARKDOWN,
                "✓ Project 2 Code Copied!",
                "Complete Student Management Portal code is saved to clipboard."
            );
        });
    }

    // Project 2 Live UI Simulator Tabs
    document.querySelectorAll('.p2-sim-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const simTarget = btn.getAttribute('data-sim');
            if (!simTarget) return;

            document.querySelectorAll('.p2-sim-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.p2-sim-tab-content').forEach(tab => {
                tab.style.display = 'none';
            });

            const activeTab = document.getElementById(`simView-${simTarget}`);
            if (activeTab) {
                activeTab.style.display = 'block';
            }
        });
    });

    const simAddBtn = document.getElementById('simAddBtn');
    if (simAddBtn) {
        simAddBtn.addEventListener('click', () => {
            const formBtn = document.querySelector('.p2-sim-btn[data-sim="form"]');
            if (formBtn) formBtn.click();
        });
    }

    const simLogoutLink = document.getElementById('simLogoutLink');
    if (simLogoutLink) {
        simLogoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            const loginBtn = document.querySelector('.p2-sim-btn[data-sim="login"]');
            if (loginBtn) loginBtn.click();
        });
    }


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
        'db': { folder: 'root', file: 'db.sqlite3', lang: 'SQLite', icon: '🗄️', iconClass: 'db-icon' },

        // Project 2: Student Portal (FBV & Teacher Auth)
        'p2_guide': { folder: 'docs', file: 'Student_Portal_Guide.md', lang: 'Markdown', icon: 'M↓', iconClass: 'md-icon' },
        'p2_settings': { folder: 'new/config', file: 'settings.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_config_urls': { folder: 'new/config', file: 'urls.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_wsgi': { folder: 'new/config', file: 'wsgi.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_asgi': { folder: 'new/config', file: 'asgi.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_models': { folder: 'new/app1', file: 'models.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_views': { folder: 'new/app1', file: 'views.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_forms': { folder: 'new/app1', file: 'forms.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_urls': { folder: 'new/app1', file: 'urls.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_admin': { folder: 'new/app1', file: 'admin.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_apps': { folder: 'new/app1', file: 'apps.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_base_html': { folder: 'new/template', file: 'base.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'p2_login_html': { folder: 'new/template', file: 'login.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'p2_list_html': { folder: 'new/template', file: 'student_list.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'p2_form_html': { folder: 'new/template', file: 'student_form.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'p2_delete_html': { folder: 'new/template', file: 'student_confirm_delete.html', lang: 'HTML', icon: '<>', iconClass: 'html-icon' },
        'p2_css': { folder: 'new/static/css', file: 'style.css', lang: 'CSS', icon: '#', iconClass: 'css-icon' },
        'p2_manage': { folder: 'new', file: 'manage.py', lang: 'Python', icon: '🐍', iconClass: 'py-icon' },
        'p2_db': { folder: 'new', file: 'db.sqlite3', lang: 'SQLite', icon: '🗄️', iconClass: 'db-icon' }
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
