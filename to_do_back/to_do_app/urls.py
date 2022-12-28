from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('sign_up', views.sign_up, name='sign_up'),
    path('sign_in', views.log_in, name='sign_in'),
    path('sign_out', views.log_out, name='sign_out'),
    path('curr_user', views.curr_user, name='curr_user'),
    path('tasks', views.get_create_tasks),
    path('task/<int:id>', views.alter_a_task),
]
