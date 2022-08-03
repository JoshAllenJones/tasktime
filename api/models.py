from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db = SQLAlchemy()

class Task(db.Model):
    __tablename__ = "task"
    task_id = db.Column(db.Integer, primary_key=True)
    task_created = db.Column(db.Datetime, default=datetime.utcnow)
    task_description = db.Column(db.Text)
    task_completed = db.Column(db.Datetime)

    blocks = db.relationship("TaskBlock")
    
class TaskBlock(db.Model):
    __tablename__ = "task_block"
    task_block_id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.Datetime, default=datetime.utcnow)
    parent_task = db.Column(db.Integer, db.ForeignKey("task.task_id"))
    block_content = db.Column(db.Text)


class TaskLogBook(db.Model):
    __tablename__ = "task_logbook"
    entry_id = db.Column(db.Integer, primary_key=True)