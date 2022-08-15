from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db = SQLAlchemy()

class DBHelper():
    def add_object(self):
        try:
            db.session.add(self)
            db.session.commit()
            return False
        except Exception as e:
            return str(e)


class Project(db.Model, DBHelper):
    __tablename__ = "project"
    project_id = db.Column(db.Integer, primary_key=True)
    project_title = db.Column(db.String(100))
    project_description = db.Column(db.Text)

    tasks = db.relationship('Task')


class Task(db.Model, DBHelper):
    __tablename__ = "task"
    task_id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'))
    task_title = db.Column(db.Text)
    task_created = db.Column(db.DateTime, default=datetime.utcnow)
    task_description = db.Column(db.Text)
    task_completed = db.Column(db.DateTime)

    def serialize(self):
        return {
            "task_id": self.task_id,
            "project_id": self.project_id,
            "task_title": self.task_title,
            "task_created": self.task_created.strftime("%B %d, %Y"),
            "task_description": self.task_description,
            "task_completed": self.task_completed.strftime("%B %d, %Y") if self.task_completed else None
        }

    blocks = db.relationship("TaskBlock")
    log_book = db.relationship("TaskLogBook")
    
class TaskBlock(db.Model, DBHelper):
    __tablename__ = "task_block"
    task_block_id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    parent_task = db.Column(db.Integer, db.ForeignKey("task.task_id"))
    block_content = db.Column(db.Text)


class TaskLogBook(db.Model, DBHelper):
    __tablename__ = "task_logbook"
    entry_id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey("task.task_id"))
    log_in = db.Column(db.DateTime)
    log_out = db.Column(db.DateTime)