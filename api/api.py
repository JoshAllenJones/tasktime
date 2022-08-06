import time
from flask import Flask, jsonify
from faker import Faker
from mdgen import MarkdownPostProvider

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/tasks/test')
def get_test_tasks():
    task_list = []
    fake_thing = Faker()
    Faker.seed(0)
    fake_thing.add_provider(MarkdownPostProvider)
    for item in range(0, 15):
        new_task = {
            "task_id": item,
            "task_title": fake_thing.first_name(),
            "task_description_md": fake_thing.post(size="small")
        }
        task_list.append(new_task)
    print(task_list)
    return jsonify(task_list=task_list)