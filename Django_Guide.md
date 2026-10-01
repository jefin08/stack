# Full-Stack Python Learning Path: Django from Zero

The simplest path is **Python + Django + HTML/CSS + JavaScript + SQLite**, without adding unnecessary technologies at the beginning.

We can learn it **by building one complete project from zero**, step by step.

---

## Step 1 — Setup

Install:

```bash
python --version
```

Create project folder:

```bash
mkdir django_project
cd django_project
```

Create virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install Django:

```bash
pip install django
```

Check:

```bash
django-admin --version
```

---

## Step 2 — Create Django Project

```bash
django-admin startproject config .
```

You will get:

```text
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
```

Start server:

```bash
python manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/
```

---

## Step 3 — Understand the Project

The important files are:

```text
settings.py  → project configuration
urls.py      → URL routing
models.py    → database structure
views.py     → application logic
forms.py     → forms and validation
templates/   → HTML pages
```

The basic flow is:

```text
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
```

---

## Step 4 — Create an App

For example, create a **Student Management** application.

```bash
python manage.py startapp students
```

Now:

```text
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
```

---

## Step 5 — Register the App

Open:

```text
config/settings.py
```

Find:

```python
INSTALLED_APPS = [
```

Add:

```python
'students',
```

So:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'students',
]
```

---

## Step 6 — Create Student Model

Open:

```text
students/models.py
```

Add:

```python
from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    course = models.CharField(max_length=100)
    age = models.IntegerField()

    def __str__(self):
        return self.name
```

Our database will have:

```text
Student
│
├── name
├── email
├── course
└── age
```

---

## Step 7 — Create Database

Run:

```bash
python manage.py makemigrations
```

Then:

```bash
python manage.py migrate
```

This creates the database: `db.sqlite3`.

---

## Step 8 — Register Model in Admin

Open:

```text
students/admin.py
```

Add:

```python
from django.contrib import admin
from .models import Student

admin.site.register(Student)
```

Now Django knows about the Student model.

---

## Step 9 — Create Admin User

Run:

```bash
python manage.py createsuperuser
```

Enter:

```text
Username:
Email:
Password:
```

Start server:

```bash
python manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/admin/
```

Login. You can now add students through the Django admin.

---

## Step 10 — Create Forms

Create:

```text
students/forms.py
```

Use the shortcut:

```python
from django.forms import ModelForm
from .models import Student


class StudentForm(ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
```

Django automatically creates: Name, Email, Course, Age.

---

## Step 11 — Create Views

Open:

```text
students/views.py
```

We'll use Django's generic views to keep the code small:

```python
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
```

---

## Step 12 — Create App URLs

Create:

```text
students/urls.py
```

Add:

```python
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
```

---

## Step 13 — Connect App URLs

Open:

```text
config/urls.py
```

Change it to:

```python
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('students.urls')),
]
```

Now:

```text
/              → Student List
/add/          → Add Student
/edit/1/       → Edit Student
/delete/1/     → Delete Student
/admin/        → Admin
```

---

## Step 14 — Create Templates

Inside `students`, create:

```text
templates/
```

Inside that:

```text
students/
```

Your structure:

```text
students/
│
├── templates/
│   └── students/
│       ├── base.html
│       ├── student_list.html
│       ├── student_form.html
│       └── student_delete.html
│
├── models.py
├── views.py
├── urls.py
└── admin.py
```

---

## Step 15 — Create base.html

Create:

```text
students/templates/students/base.html
```

Add:

```html
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
```

---

## Step 16 — Student List

Create:

```text
students/templates/students/student_list.html
```

Add:

```html
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
```

---

## Step 17 — Student Form

Create:

```text
students/templates/students/student_form.html
```

Add:

```html
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
```

---

## Step 18 — Delete Student

Create:

```text
students/templates/students/student_delete.html
```

Add:

```html
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
```

---

## Step 20 — Add Login

Django already has authentication built in.

Open:

```text
config/urls.py
```

Change:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include('students.urls')),
]
```

Now Django provides:

```text
/accounts/login/
/accounts/logout/
```

---

## Step 21 — Create Login Page

Create:

```text
students/templates/registration/login.html
```

Add:

```html
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
```

---

## Step 22 — Configure Login

Open:

```text
config/settings.py
```

At the bottom:

```python
LOGIN_URL = '/accounts/login/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/accounts/login/'
```

---

## Step 24 — Add Login/Logout to Navbar

Update `base.html`:

```html
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
```
