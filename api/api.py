from datetime import datetime, date
from operator import and_
import time
from flask import Flask, jsonify, request, abort
from sqlalchemy.orm import load_only


from models import db, Task, Project, TaskLogBook, DailyNote
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

@app.route('/init')
def init_workspace():
    projects = Project.query.options(load_only(Project.project_id, Project.project_title )).all()
    print(projects)
    daily_note = DailyNote.query.filter(DailyNote.day == date.today()).first()
    if not daily_note:
        daily_note = DailyNote()
        daily_note.day = date.today()
        db.session.add(daily_note)
        db.session.commit()
    daily_note_info = {
        "daily_id": daily_note.daily_id,
        "date": daily_note.day.strftime("%a %d, %Y"),
    }
    init_obj = {
        "daily_note": daily_note_info,
        "projects": [],
    }
    for project in projects:
        init_obj['projects'].append({
            "project_name": project.project_title,
            "project_id": project.project_id
        })
    tasks = Task.query.filter_by(daily_id=daily_note.daily_id).all()
    print(init_obj)
    return jsonify(init_obj=init_obj)

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
    assc_task = Task.query.filter_by(task_id=request.form.get('task_id')).first()
    if not assc_task:
        return jsonify(success=False, err="Hmmmm")
    return jsonify(success=True, task=assc_task.serialize())

@app.route('/task/clock-out', methods=['POST'])
def task_clock_out():
    if not request.form:
        return jsonify(success=False, err="There was no data received by the server")
    log_item = TaskLogBook.query.filter_by(entry_id=request.form.get('entry_id')).first()
    if not log_item:
        return jsonify(success=False, err="This log file could not be found")
    log_item.log_out = datetime.utcnow()
    err = log_item.update_object()
    if err:
        return jsonify(success=False, err=err)
    task_item = Task.query.filter_by(task_id=log_item.task_id).first()
    if not task_item:
        return jsonify(success=False, err="Well this is a problem, the task is missing...")
    return jsonify(success=True, task=task_item.serialize())


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
        new_task.daily_id = request.form.get('daily_id')
        err = new_task.add_object()
        if err:
            return jsonify(success=False)
        all_tasks = Task.query.filter_by(daily_id=new_task.daily_id).all()
        task_list = [task.serialize() for task in all_tasks]
        return jsonify(success=True, task_list=task_list)
    else:
        abort(403)

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)