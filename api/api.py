from datetime import datetime
from operator import and_
import time
from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import and_
from models import db, Task, Project, TaskLogBook
from faker import Faker
from mdgen import MarkdownPostProvider

app = Flask(__name__)

DB_HOST = 'localhost'
DB_PORT = 3306
DB_USER = 'root'
DB_PASS = 'root'
DB_NAME = "tasktime"


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{0}:{1}@{2}:{3}/{4}'.format(DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME)

db.init_app(app)


@app.route('/db/create')
def create_database():
    print('creating database!')
    db.create_all()
    return 'wow grape'


@app.route('/tasks/test')
def get_test_tasks():
    task_list = []
    fake_thing = Faker()
    Faker.seed(0)
    fake_thing.add_provider(MarkdownPostProvider)
    for item in range(0, 15):
        new_task = {
            "key": item,
            "label": fake_thing.first_name(),
        }
        task_list.append(new_task)
    print(task_list)
    return jsonify(task_list=task_list)


@app.route('/task/clock-in', methods=['POST'])
def task_clock_in():
    if not request.form:
        return jsonify(success=False)
    print('received some stuff')
    print(request.form)
    new_log_item = TaskLogBook()
    new_log_item.task_id = request.form.get('task_id')
    new_log_item.log_in = datetime.utcnow()
    err = new_log_item.add_object()
    if err:
        return jsonify(success=False, err="There was an issue with the database")
    return jsonify(success=True, newLogId=new_log_item.entry_id)


@app.route('/projects')
def get_project():
    print('GETTING PROJECTS')
    projects = Project.query.all()
    project_list = []
    for project in projects:
        project_list.append({
            "key": project.project_id,
            "label": project.project_title
        })
    return jsonify(projects=project_list)


@app.route('/tasks/<int:project_id>', methods=['GET'])
def get_tass(project_id):
    print('HEYYYYYY!')
    project_id = 1
    tasks = Task.query.filter_by(project_id=project_id).all()
    task_list = [task.serialize() for task in tasks]
    return jsonify(success=True, task_list=task_list)


@app.route('/task/post', methods=['POST'])
def post_task():
    print(request.form)
    print('being hit')
    if request.form:
        new_task = Task()
        new_task.task_title = request.form.get('task_title')
        err = new_task.add_object()
        if err:
            return jsonify(success=False)
        all_tasks = Task.query.all()
        task_list = [task.task_title for task in all_tasks]
        return jsonify(success=True, task_list=task_list)
    else:
        abort(403)

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)