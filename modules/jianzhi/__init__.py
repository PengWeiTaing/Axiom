"""减脂模块 — 体重管理、饮食记录、运动追踪。"""

from modules.base import AxiomModule
from modules.jianzhi.routes import bp
from modules.jianzhi.models import JIANZHI_TABLES

module = AxiomModule()
module.name = "jianzhi"
module.label = "减脂"
module.description = "体重管理、饮食记录、运动追踪"


def get_blueprint(self=None):
    return bp


def get_db_tables(self=None):
    return JIANZHI_TABLES


module.get_blueprint = get_blueprint
module.get_db_tables = get_db_tables
