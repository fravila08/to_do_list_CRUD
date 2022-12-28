
# To Do List 

https://user-images.githubusercontent.com/105952966/209764267-aa499aa9-22f3-497f-a46b-0db816d76915.mp4


This application uses React.js in the front-end, PostgreSQL as a 
Database, and Django in the Back-end. The To Do List application
allows for user sign up, sign in, log out functions and allows the
user to Create, Read, Update, and Delete (CRUD) tasks to display in their 
To Do list.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`django` from `settings.py` in to_do_back directory.



## API References

### Sign Up/In/Out API Reference

#### Sign up to use the API

```
  POST http://127.0.0.1:8000/sign_up, {name:string, email:string, password:string}
```

#### Sign in to use the API

```
  POST http://127.0.0.1:8000/sign_in, {email:string, password:string}
```

#### Get current user on the API

```
  GET http://127.0.0.1:8000/curr_user
```

#### Sign Out from the API

```
  POST http://127.0.0.1:8000/sign_out
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. ensure it is in email format |
| `password` | `string` | **Required**.   |
| `name` | `string` | **Required** will be used to confirm you've logged in to your and have access to your tasks |

### Tasks API Reference

#### Get all tasks belonging to user

```
  GET http://127.0.0.1:8000/tasks
```

#### Create a task

```
  POST http://127.0.0.1:8000/tasks, {title:string, description:string, date:string}
```

#### Read a task

```
  GET http://127.0.0.1:8000/task/<int:id>
```

#### Update a task

```
  GET http://127.0.0.1:8000/task/<int:id>, {title:string, description:string, date:string}
```

#### Delete a task

```
  GET http://127.0.0.1:8000/task/<int:id>
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Optional**. This will set the title to each task |
| `description` | `string` | **Optional**. This will hold any description you would like to provide  |
| `date` | `string` | **Optional**. Ensure it is in date format  YYYY-MM-DD|




## Run Locally

Clone the project

```bash
  git clone https://github.com/fravila08/to_do_list_CRUD.git
```

Ensure you create a .env file and store your `django` key inside of it

```bash
  cd todo_list
  touch .env

  #in .env
  django=`django key`
```

Create and activate virtual environment to install requirements

```bash
  python3 -m venv <name>
  source <name>/bin/activate
  pip install -r requirements.txt
```

Enter PostgreSQL and create the database

```bash
  psql postgres
  create database to_do_list;
  \q
```

Now we can run the watcher on the front-end

```bash
  cd to_do_front
  npm install
  npm run watch
```

On a seperate terminal we can activate the virtual environment, makemigrations, migrate 
and run the server (back-end)

```bash
  cd to_do_back
  python3 manage.py makemigrations
  python3 manage.py migrate
  python3 manage.py runserver
```
Now you can open your favorite browser and go to `localhost:8000` to view the project



## Feedback

If you have any feedback, please reach out to me at fr4v1l4@gmail.com. I'm always striving to improve, so any input would be greatly appreciated. Thank you!

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://favilas-portfolio.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francisco-r-avila)
[![Youtube](https://img.shields.io/badge/youtube-C4302B?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@code_7887)

