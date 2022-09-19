from datetime import date, datetime
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
    
    def update_object(self):
        try:
            db.session.commit()
            return False
        except Exception as e:
            return str(e)


class DailyNote(db.Model, DBHelper):
    __tablename__ = "daily"
    daily_id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    day = db.Column(db.Date, default=date.today)


    blocks = db.relationship('Block')


class Project(db.Model, DBHelper):
    __tablename__ = "project"
    project_id = db.Column(db.Integer, primary_key=True)
    project_title = db.Column(db.String(100))
    project_description = db.Column(db.Text)

    blocks = db.relationship('Block')


class Block(db.Model, DBHelper):
    __tablename__ = "block"
    block_id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'))
    daily_id = db.Column(db.Integer, db.ForeignKey('daily.daily_id'))
    block_title = db.Column(db.Text)
    block_created = db.Column(db.DateTime, default=datetime.utcnow)
    block_description = db.Column(db.Text)
    block_completed = db.Column(db.DateTime)

    sub_blocks = db.relationship("SubBlock")
    log_book = db.relationship("TaskLogBook")

    def serialize(self):
        logbook = [item.serialize() for item in self.log_book]
        latest_log = self.get_latest_log().serialize() if self.get_latest_log() else None

        return {
            "block_id": self.block_id,
            "project_id": self.project_id,
            "block_title": self.block_title,
            "block_created": self.block_created.strftime("%B %d, %Y"),
            "block_description": self.block_description,
            "block_completed": self.block_completed.strftime("%B %d, %Y") if self.block_completed else None,
            "log_entries": logbook,
            "latest_log": latest_log,
            "sub_blocks": [item.serialize() for item in self.sub_blocks]
        }


    def has_open_log(self):
        incomplete_entries = TaskLogBook.query.filter_by(block_id=self.block_id, log_out=None).first()
        if incomplete_entries:
            return incomplete_entries
        else:
            return False

    def get_latest_log(self):
        log_item = TaskLogBook.query.filter_by(block_id=self.block_id).order_by(TaskLogBook.log_in.desc()).first()
        if log_item:
            return log_item
        else:
            return None
    
class SubBlock(db.Model, DBHelper):
    __tablename__ = "sub_block"
    sub_block_id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    parent_block = db.Column(db.Integer, db.ForeignKey("block.block_id"))
    block_content = db.Column(db.Text)

    def serialize(self):
        return {
            "sub_block_id": self.sub_block_id,
            "created": self.created.strftime("%b %-d, %Y @ %-I:%M"),
            "parent_task": self.parent_block,
            "block_content": self.block_content

        }

class TaskLogBook(db.Model, DBHelper):
    __tablename__ = "task_logbook"
    entry_id = db.Column(db.Integer, primary_key=True)
    block_id = db.Column(db.Integer, db.ForeignKey("block.block_id"))
    log_in = db.Column(db.DateTime)
    log_out = db.Column(db.DateTime)

    def serialize(self):
        return {
            "entry_id": self.entry_id,
            "block_id": self.block_id,
            "log_in_fmt": self.log_in.strftime("%B %d, %Y"),
            "log_in": self.log_in,
            "log_out": self.log_out,
        }

    def table_serialize(self):
        return {
            "key": self.entry_id,
            
        }