from datetime import datetime, date
from operator import and_
import re
import time
from flask import Flask, jsonify, request, abort
from sqlalchemy.orm import load_only


from models import db, Block, Project, TaskLogBook, DailyNote, SubBlock
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
    print(init_obj)
    return jsonify(init_obj=init_obj)


@app.route('/blocks/today')
def get_tasks():
    blocks = Block.query.all()
    return jsonify(blocks=[block.serialize() for block in blocks])


@app.route('/blocks/<int:block_id>')
def get_task(block_id):
    result = Block.query.filter_by(block_id=block_id).first()
    if not result:
        return 400
    return_obj = result.serialize()
    print(return_obj)
    return return_obj

@app.route('/blocks/subblock/add', methods=['POST'])
def create_subblock():
    print('Creating subblock')
    if not request.form:
        return jsonify(success=False), 400
    block_id = request.form.get('block_id')
    
    new_block = SubBlock()
    new_block.parent_block = block_id
    err = new_block.add_object()
    if err:
        return jsonify(success=False, err=err)
    return jsonify(new_block=new_block.serialize())



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


@app.route('/block/clock-in', methods=['POST'])
def task_clock_in():
    if not request.form:
        return jsonify(success=False)
    print('received some stuff')
    print(request.form)
    new_log_item = TaskLogBook()
    new_log_item.block_id = request.form.get('block_id')
    new_log_item.log_in = datetime.utcnow()
    err = new_log_item.add_object()
    if err:
        return jsonify(success=False, err="There was an issue with the database")
    assc_task = Block.query.filter_by(block_id=request.form.get('block_id')).first()
    if not assc_task:
        return jsonify(success=False, err="Hmmmm")
    return jsonify(success=True, task=assc_task.serialize())

@app.route('/block/clock-out', methods=['POST'])
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
    task_item = Block.query.filter_by(block_id=log_item.block_id).first()
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
    blocks = Block.query.filter_by(project_id=project_id).all()
    block_list = [task.serialize() for task in blocks]
    return jsonify(success=True, block_list=block_list)


@app.route('/block/post', methods=['POST'])
def post_task():
    print(request.form)
    print('being hit')
    if request.form:
        print(request.form)
        new_block = Block()
        new_block.block_title = request.form.get('block_title')
        new_block.daily_id = request.form.get('daily_id')
        err = new_block.add_object()
        if err:
            return jsonify(success=False)
        all_blocks = Block.query.filter_by(daily_id=new_block.daily_id).all()
        block_list = [task.serialize() for task in all_blocks]
        return jsonify(success=True, new_block=new_block.serialize())
    else:
        abort(403)

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)