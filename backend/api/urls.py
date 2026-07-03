from django.urls import path
from .views import (
    EmployeeCreateView,
    EmployeeListView,
    EmployeeDetailView,
    EmployeeUpdateView,
    EmployeeDeleteView
)

urlpatterns = [

    path("employees/create/", EmployeeCreateView.as_view()),

    path("employees/list/", EmployeeListView.as_view()),

    path("employees/<int:pk>/", EmployeeDetailView.as_view()),

    path("employees/update/<int:pk>/", EmployeeUpdateView.as_view()),

    path("employees/delete/<str:emp_id>/", EmployeeDeleteView.as_view()),

]